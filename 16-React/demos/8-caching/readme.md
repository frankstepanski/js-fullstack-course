# TanStack Query — Caching Demo

A working React + Vite app showing four real caching concepts using TanStack Query (React Query).

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## What's in each tab

### Tab 1 — No caching
Plain `useEffect` + `fetch`. Every component mount fires a new network request.
Click a user, go back, click them again — watch the spinner flash every time.
Open the browser console to see every `[API]` call.

### Tab 2 — Cache hit
Same app with `useQuery`. First click fetches from the network.
Click back, click the same user again — instant, no spinner, no console log.
Cache key: `['user', id]` — each user gets their own slot.

### Tab 3 — Stale data & background refetch
`staleTime: 8000` — data is "fresh" for 8 seconds.
After 8s it goes stale. React Query shows the cached data immediately
but quietly refetches in the background. Tab away and back to trigger it.

### Tab 4 — Mutations & invalidation
Add or delete a post. After the API call succeeds:
`queryClient.invalidateQueries({ queryKey: ['posts'] })` marks the cache stale
and React Query automatically refetches the list.

## Key files

```
src/
  main.jsx              # QueryClient setup (the cache lives here)
  api/fakeApi.js        # Pretend API with 1s delay — swap for real fetch() calls
  components/
    Demo1NoCaching.jsx  # Plain useEffect, no caching
    Demo2CacheHit.jsx   # useQuery, cache hits
    Demo3StaleTime.jsx  # staleTime + background refetch
    Demo4Invalidation.jsx # useMutation + invalidateQueries
```

## DevTools

The React Query DevTools panel appears in the bottom-right corner in dev mode.
Click it to see the live cache — every query key, its status (fresh/stale/fetching),
and the cached data. This is extremely useful when debugging caching issues.

## Swapping in a real API

Replace the functions in `src/api/fakeApi.js` with real `fetch()` calls:

```js
// Before (fake)
export function fetchPosts() {
  return fakeDelay([...posts]);
}

// After (real)
export function fetchPosts() {
  return fetch('https://your-api.com/posts').then(res => res.json());
}
```

Everything else stays exactly the same.
