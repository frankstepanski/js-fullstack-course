# Client-Side Caching

## What Is Caching?

Caching means storing a copy of something so you don't have to fetch it again.

When a browser loads a webpage, it makes many requests — HTML, CSS, JavaScript files, images, API data. Each request takes time and bandwidth. Caching lets the browser (or your app) reuse data it already has instead of asking for it again.

There are several places caching happens in a web app. This document focuses on **client-side caching** — caching that happens in the browser or in your frontend code.

## Part 1: HTTP Caching (Static Assets)

This is the oldest and most fundamental form of web caching. It's handled by the browser automatically, but controlled by HTTP response headers your server sends.

### How It Works

1. Browser requests `app.js` from the server
2. Server responds with the file *plus* cache headers
3. Browser stores the file locally
4. Next time `app.js` is requested, the browser may skip the network entirely and serve from its local cache

### The Key Headers

#### `Cache-Control`

The most important caching header. It tells the browser exactly how to cache a response.

```
Cache-Control: max-age=31536000, immutable
```

Common directives:

| Directive | Meaning |
|---|---|
| `max-age=<seconds>` | How long to cache before considering it stale |
| `no-cache` | Always revalidate with the server before using the cache |
| `no-store` | Don't cache at all |
| `immutable` | The file will never change — skip revalidation |
| `public` | Can be cached by browsers and shared proxies (CDNs) |
| `private` | Only the end user's browser should cache this |

**Example — a hashed asset (ideal for JS/CSS bundles from Vite):**
```
Cache-Control: public, max-age=31536000, immutable
```
Vite adds a hash to filenames like `main.a3f92c.js`. Since the filename changes whenever the content changes, you can safely cache forever.

**Example — an HTML file (never cache for long):**
```
Cache-Control: no-cache
```
You want the user to always get the latest HTML, which points to the latest hashed assets.

---

#### `ETag` and Conditional Requests

An `ETag` is a fingerprint for a resource. The server includes it in its response:

```
ETag: "abc123"
```

Next time the browser requests that resource, it sends:

```
If-None-Match: "abc123"
```

If the file hasn't changed, the server responds with `304 Not Modified` — no body, just a tiny confirmation. The browser uses its cached version. This saves bandwidth even when `max-age` has expired.

#### `Last-Modified` / `If-Modified-Since`

Same idea as ETag but uses a timestamp instead of a fingerprint. Less precise, but widely supported.

---

#### Putting It Together: The Cache Flow

```
Browser requests /api/data
        │
        ▼
Is it in cache?
   │          │
  NO         YES — is it still fresh (within max-age)?
   │               │                │
   │              YES              NO — send If-None-Match to server
   │               │                        │              │
   ▼               ▼               304 Not Modified    200 OK (new data)
Fetch from      Use cached              │                   │
  server          data             Use cached          Update cache,
                                     data              use new data
```

### In Practice with Vite

Vite handles most of this for you in production:

- JS/CSS bundles get **content hashes** in filenames → long cache lifetimes are safe
- The `index.html` should be served with `no-cache` → always fresh
- Images and fonts can be cached aggressively if you control their filenames

Most hosting platforms (Vercel, Netlify) configure these headers correctly by default.

## Part 2: Other Browser Storage Options

Sometimes you want to persist data across page loads — not just in memory.

### `localStorage`

- Stores strings as key/value pairs
- Persists until explicitly cleared
- Synchronous (can block the main thread if overused)
- Limit: ~5MB
- **No automatic expiry** — you have to manage that yourself
- Not accessible across different origins

```javascript
// Save
localStorage.setItem('theme', 'dark');

// Read
const theme = localStorage.getItem('theme');

// Delete
localStorage.removeItem('theme');
```

**Good for:** User preferences (theme, language), form draft data, non-sensitive settings.  
**Not for:** Auth tokens (use `httpOnly` cookies instead), large datasets, anything sensitive.

---

### `sessionStorage`

Same API as `localStorage`, but data is cleared when the browser tab is closed.

**Good for:** Wizard/multi-step form state, temporary UI state that shouldn't survive a session.

---

### Cookies

Cookies are sent automatically with every HTTP request to the matching domain, which makes them the right tool for authentication.

```javascript
// Set a cookie (rarely done manually in JS — usually set by the server)
document.cookie = "name=Alice; max-age=3600; path=/";
```

**Key attributes:**
- `max-age` / `expires` — when the cookie expires
- `httpOnly` — the cookie is invisible to JavaScript (protects against XSS)
- `secure` — only sent over HTTPS
- `SameSite` — controls cross-site sending (use `Strict` or `Lax` to prevent CSRF)

**Good for:** Auth sessions and tokens (set by the server with `httpOnly`).  
**Not for:** Large data (every cookie is sent with every request — keep them small).

---

### IndexedDB

A low-level browser database for storing large amounts of structured data, including files and blobs. Much more powerful than `localStorage` but complex to use directly.

In practice, most developers use a wrapper library:
- **Dexie.js** — a clean, promise-based API over IndexedDB
- **idb** — a thin promise wrapper

**Good for:** Offline-capable apps, large local datasets, caching entire API responses for offline use.

## Part 3: Caching API Data in React

This is where most of your day-to-day caching decisions happen. When your React app fetches data from an API — a list of posts, a user profile, search results — you need to decide: how long should you trust that data before asking for it again?

The story here has two chapters: doing it yourself (so you understand what's actually happening), and then using tools that handle it for you.

### The Problem First

Here's a basic data fetch in React with no caching at all:

```jsx
function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return posts.map(post => <div key={post.id}>{post.title}</div>);
}
```

This works, but it has real problems:

- Every time this component mounts, it fetches from the network — even if you just had the data 2 seconds ago
- Navigate away and come back → loading spinner again
- If two components on the same page both need `/api/posts`, you get two identical network requests
- There's no way for one component to tell another "hey, this data just changed"

Caching solves all of these. Let's build up to it from scratch.

---

### Manual Caching: A Simple In-Memory Store

The core idea of caching is just a key/value store with a timestamp. Here's the simplest possible version — a plain object that lives at module scope (outside any component), so it persists across re-renders and re-mounts:

```javascript
// cache.js
const cache = {};

export function getCached(key) {
  const entry = cache[key];
  if (!entry) return null;

  const ageInMs = Date.now() - entry.timestamp;
  const fiveMinutes = 5 * 60 * 1000;

  if (ageInMs > fiveMinutes) {
    delete cache[key]; // expired — treat as if it doesn't exist
    return null;
  }

  return entry.data;
}

export function setCached(key, data) {
  cache[key] = { data, timestamp: Date.now() };
}
```

Now use it in a component:

```jsx
import { getCached, setCached } from './cache';

function PostList() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const cached = getCached('posts');

    if (cached) {
      setPosts(cached); // use what we already have — no network request
      return;
    }

    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setCached('posts', data); // save it for next time
        setPosts(data);
      });
  }, []);

  if (!posts) return <p>Loading...</p>;
  return posts.map(post => <div key={post.id}>{post.title}</div>);
}
```

This works! If `PostList` unmounts and remounts within 5 minutes, the second mount skips the network entirely. The cache object persists because it lives at the module level — outside React's lifecycle.

**But this approach has limits.** Two components that each call `getCached('posts')` independently will still both fetch on their very first render (neither has populated the cache yet). There's no deduplication. Nothing re-renders other components when cached data updates. And the cache disappears on page refresh.

These are the exact problems that purpose-built tools solve.

---

### Manual Caching: `useRef` for Component-Level Cache

Sometimes you just need to avoid re-fetching while a single component is alive — for example, a search box where you don't want to re-fetch a query the user already typed. `useRef` is perfect for this:

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const cache = useRef({}); // persists across re-renders, resets when component unmounts

  useEffect(() => {
    if (!query) return;

    // Already fetched this query? Serve it immediately.
    if (cache.current[query]) {
      setResults(cache.current[query]);
      return;
    }

    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => {
        cache.current[query] = data; // remember it
        setResults(data);
      });
  }, [query]);

  return results.map(r => <div key={r.id}>{r.title}</div>);
}
```

As the user types and `query` changes, already-seen searches come back instantly. The cache disappears when the component unmounts — which is fine for this use case.

---

### Manual Caching: `localStorage` for Persistence Across Refreshes

If you want the cache to survive a page refresh, `localStorage` is an option. The key thing to add is manual expiry, since `localStorage` has none:

```javascript
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify({
    data,
    savedAt: Date.now()
  }));
}

function loadFromStorage(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  const { data, savedAt } = JSON.parse(raw);
  if (Date.now() - savedAt > CACHE_TTL) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
}
```

```jsx
function PostList() {
  // Pre-fill state from localStorage on first render
  const [posts, setPosts] = useState(() => loadFromStorage('posts'));

  useEffect(() => {
    if (posts) return; // already have data — skip the fetch

    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        saveToStorage('posts', data);
        setPosts(data);
      });
  }, []);

  if (!posts) return <p>Loading...</p>;
  return posts.map(post => <div key={post.id}>{post.title}</div>);
}
```

Notice the `useState` initializer function `() => loadFromStorage('posts')` — it runs once on mount and pre-fills state from storage before the first render. On a return visit, the user sees data immediately with no loading flash.

---

### The Wall You Hit With Manual Caching

By now you've seen the pattern, and you've probably also noticed the ceiling. Manual caching always runs into the same four problems:

1. **Deduplication** — if two components fetch the same endpoint at the same time, how do you make sure only one request fires?
2. **Invalidation** — when you add, update, or delete something, how does every component that has a cached copy know to refresh?
3. **Background refetching** — how do you show stale data immediately but quietly update it in the background?
4. **Boilerplate** — loading states, error states, and cache logic get rebuilt from scratch for every single fetch

This is why dedicated tools exist.

---

### TanStack Query: The Standard Tool

TanStack Query (also called React Query) solves all four problems. Under the hood it's the same idea as your manual cache — a key/value store with timestamps — but it adds deduplication, background refetching, automatic invalidation patterns, and a clean hook API.

**Install:**

```bash
npm install @tanstack/react-query
```

**Wrap your app** (in `main.jsx`):

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

That `queryClient` object *is* the cache. It lives for the lifetime of the app and is shared by every component inside the provider.

---

#### Basic Fetch with `useQuery`

```jsx
import { useQuery } from '@tanstack/react-query';

function PostList() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],           // the cache key — an array
    queryFn: () =>                 // how to fetch the data
      fetch('/api/posts').then(res => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return posts.map(post => <div key={post.id}>{post.title}</div>);
}
```

This looks similar to the manual version, but here's what React Query is doing behind the scenes:

- First mount → fetches, stores under `['posts']`
- Second mount, or another component using `queryKey: ['posts']` → **serves from cache immediately, no flicker, no duplicate request**
- Two components mount at the exact same time, both wanting `['posts']` → **only one request fires**
- User tabs away and comes back → **automatically refetches in the background**, updates the UI if anything changed

---

#### `staleTime`: Controlling How Fresh Data Needs to Be

By default, React Query considers all cached data immediately stale — meaning it'll show the cache right away but always refetch when it can. `staleTime` lets you say "this data is fresh enough, don't refetch yet":

```jsx
useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 60 * 1000, // treat as fresh for 60 seconds
});
```

Within that 60 seconds, navigating away and back doesn't trigger a network request at all. After 60 seconds, the data is considered stale — React Query shows it immediately but fetches a fresh copy in the background.

A simple mental model for picking `staleTime`:

| Data type | staleTime |
|---|---|
| List of countries, static config | `Infinity` |
| User profile, settings | `5 * 60 * 1000` (5 min) |
| A feed or list of posts | `60 * 1000` (1 min) |
| Live notifications, prices | `0` (always refetch) |

---

#### Dynamic Keys: One Cache Slot Per Item

The `queryKey` is an array. Make it dynamic to get separate cache entries per entity:

```jsx
function UserProfile({ userId }) {
  const { data: user } = useQuery({
    queryKey: ['user', userId],   // ['user', 42] and ['user', 99] are different cache slots
    queryFn: () =>
      fetch(`/api/users/${userId}`).then(res => res.json()),
  });

  return <div>{user?.name}</div>;
}
```

Browsing from user 42 to user 99 and back to 42 — the profile for 42 is still in cache. No reload. No spinner.

---

#### Cache Invalidation with `useMutation`

When you change data on the server (create, update, delete), you need to tell the cache that its copy is now out of date. This is called **invalidation**:

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function NewPostForm() {
  const queryClient = useQueryClient();

  const createPost = useMutation({
    mutationFn: (newPost) =>
      fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'Content-Type': 'application/json' },
      }),

    onSuccess: () => {
      // Mark the posts list as stale → React Query refetches it automatically
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return (
    <button onClick={() => createPost.mutate({ title: 'Hello World' })}>
      Create Post
    </button>
  );
}
```

After `invalidateQueries`, every component currently subscribed to `['posts']` will receive the updated data — automatically, with no prop threading or manual state sync.

---

#### Optimistic Updates: Making the UI Feel Instant

An optimistic update means you update the UI *immediately* when the user acts, before the server confirms. If the server fails, you roll back. This is the pattern behind every "like" button, checkbox, and toggle on the web:

```jsx
const toggleLike = useMutation({
  mutationFn: (postId) =>
    fetch(`/api/posts/${postId}/like`, { method: 'POST' }),

  onMutate: async (postId) => {
    // 1. Cancel any in-flight refetch (avoid overwriting our optimistic change)
    await queryClient.cancelQueries({ queryKey: ['posts'] });

    // 2. Snapshot the current cache so we can roll back if needed
    const previous = queryClient.getQueryData(['posts']);

    // 3. Immediately update the cache — no waiting for the server
    queryClient.setQueryData(['posts'], (old) =>
      old.map(post =>
        post.id === postId ? { ...post, liked: !post.liked } : post
      )
    );

    return { previous }; // pass snapshot to onError
  },

  onError: (err, postId, context) => {
    // The request failed — restore the old data
    queryClient.setQueryData(['posts'], context.previous);
  },

  onSettled: () => {
    // Always sync with the server after a mutation, success or failure
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});
```

The heart button responds instantly. If the network request fails, the UI snaps back. The user experience is seamless either way.

---

#### Persisting the React Query Cache Across Refreshes

React Query's cache is in-memory by default — it resets on page refresh. To restore it instantly on return visits (combining the benefits of `localStorage` persistence with React Query's full API), use the official persistence plugin:

```bash
npm install @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

```jsx
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // keep cache entries for 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({ queryClient, persister });
```

Now on page load, React Query restores the cache from `localStorage` before any requests go out. Users see their data instantly. A background refetch quietly updates anything stale. This is the same pattern you built manually earlier — React Query just handles the serialization, expiry, and rehydration for you.

---

### SWR: A Lighter Alternative

**SWR** is a smaller fetching library from the Next.js team, built around one idea: show stale data immediately, then revalidate in the background (that's where the name comes from — stale-while-revalidate).

```bash
npm install swr
```

```jsx
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

function PostList() {
  const { data: posts, error, isLoading } = useSWR('/api/posts', fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  return posts.map(post => <div key={post.id}>{post.title}</div>);
}
```

SWR and React Query solve the same core problem. SWR is simpler and smaller. React Query has a richer API — better mutation handling, optimistic updates, and more control over invalidation. For most new projects, React Query is the better default. SWR is a good choice if you want something lighter or are already in the Next.js ecosystem.


## Summary: Which Cache to Use When

| Situation | Tool |
|---|---|
| Static assets (JS, CSS, images) | HTTP `Cache-Control` headers |
| API data in a React app | TanStack Query (React Query) |
| Lightweight read-heavy fetching | SWR |
| User preferences that survive refresh | `localStorage` |
| Temporary state for the current tab | `sessionStorage` |
| Auth tokens | `httpOnly` cookies (set by server) |
| Large data / offline support | IndexedDB (via Dexie or idb) |

## The One Thing to Remember

> **Caching is a tradeoff between performance and freshness.** The faster you want something, the more likely it might be stale. The fresher you need something, the more network requests you'll make.
