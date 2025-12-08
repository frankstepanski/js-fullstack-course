# React Component Rendering Model

React is built around a very simple idea:

> Your UI is a function of your data.  
> In other words, **UI = f(state)**.

Every time your data changes, React calls your component functions again — to find out what the new UI should look like.

## Rendering Is Just a Function Call

Each React component is just a **function** that returns UI (written in JSX).  
When React needs to draw something on the screen, it *calls* that function.

```jsx
function Greeting() {
  return <h1>Hello World</h1>;
}
```

If you change some data (like state or props), React calls the function again — and compares the new result with what’s already on the screen.  
It updates only what changed.  
That’s called **reconciliation** and it’s powered by React’s **Virtual DOM**.

## The React Render Flow

### 1️⃣ Initial Render (First Time on the Page)

```
App Starts
     ↓
React Calls Root Component (e.g., <App />)
     ↓
Virtual DOM Is Created (from component tree)
     ↓
React Commits to the Real DOM (browser paints UI)
     ↓
Effects Run (useEffect with []), Subscriptions/Timers Start, etc.
```

### 2️⃣ Re-render on State or Props Change

```
State or Props Change
          ↓
React Calls Your Component Function Again
          ↓
A New Virtual DOM Is Created
          ↓
React Diffs New vs Old Virtual DOM (reconciliation)
          ↓
Only the Changed Parts Are Updated in the Real DOM (commit)
          ↓
Relevant Effects Re-run (based on dependency arrays), Cleanups Run First
```

This means React doesn’t re-render your *whole page* every time something changes — only the parts that actually need updating.  
That’s what makes it efficient.

## Component Lifecycle

Every React component goes through three main phases — this is its **lifecycle**:

- **Mounting** — when the component appears on the screen for the first time.  
- **Updating** — when state or props change, and the component re-renders.  
- **Unmounting** — when the component is removed from the UI.  

React runs specific logic at each of these points — for example, setting up subscriptions when mounting and cleaning them up when unmounting.

```
Mount → Update → Unmount
 ↑         ↓
 useEffect  cleanup
```

These lifecycle stages describe **when** React decides to render or remove components — but not **how** React actually performs that rendering.  
To understand what’s happening under the hood when a component mounts or updates, we need to look at React’s **rendering model**.

---

### React’s Rendering Model

React’s rendering model explains **how React transforms your components into actual UI on the screen** during each phase of the lifecycle.

A React component is basically a function that describes what should appear on the screen.

Every time data (state or props) changes:

- React calls your component function again — as if it’s brand new.  
- The previous UI is compared to the new one.  
- Only the changed parts are updated in the DOM.  

But here’s the catch:  
👉 Each render is **pure** — it shouldn’t directly touch the outside world.  
That means no direct network calls, timers, or manual DOM edits during the render itself.

If React calls your function multiple times for debugging or performance (like in Strict Mode), you don’t want your code fetching data multiple times accidentally!

### What Does “Rendering” Mean?

Rendering is React recalculating the UI based on the latest state or props.

When React renders:

1. It calls your component function.  
2. It produces a description of what the UI should look like (the **Virtual DOM**).  
3. It compares that to the previous version and updates the browser efficiently.

 **Important:** Rendering doesn’t always mean a visible change.  
If nothing has changed, React skips updating the DOM.

When your component function runs:
- It’s not yet on the screen.  
- React is just calculating what the UI *should* look like.  

Only after React finishes rendering the tree does it **commit** those changes to the actual DOM — that’s when the UI becomes visible.

This two-step process is crucial:

```
Render Phase → React figures out what needs to change
Commit Phase → React applies those changes to the real DOM
```

✅ **Summary of the transition:**
- The **lifecycle** explains **when** components mount, update, and unmount.  
- The **rendering model** explains **how** React updates the DOM efficiently during those phases.


## The Need for Side Effects → Intro to useEffect
In React, your component functions should stay pure — they take data (state or props) and return what the UI should look like.
But real-world applications often need to interact with things outside React’s world — like fetching data, setting up timers, or listening to browser events.

Those interactions are called side effects.

### 💬 What is a Side Effect?
In general programming:

A side effect is any action a function performs that affects something outside its scope (like changing a global variable or writing to a file).

**In web development:** A side effect might be making an API call, updating localStorage, or starting an interval timer.

**In React:** A side effect is anything that happens after the render — data fetching, DOM manipulation, or subscriptions.

>Since React components can re-render many times,  running these side effects safely and predictably is crucial.

## Why `useEffect` Exists
Before React Hooks, class components used lifecycle methods (like componentDidMount or componentDidUpdate) to manage side effects.

When React introduced function components, they needed a similar way to handle effects tied to the component lifecycle — that’s where useEffect() came in.

**useEffect()** lets you run side effects after React commits updates to the DOM.
It ensures your code runs at the right time — not during rendering — so React can keep its render process pure and predictable.

### The Problem in a Nutshell

Without knowing a component’s lifecycle, React can’t coordinate **when to start or stop** async work.  
That’s why React needed a system that could “tap into” the component’s mount → update → unmount stages.

### Visual: React’s Challenge with Async Work

```
Component Mounts
   ↓
   (You start a fetch)
   ↓
React re-renders (state or props change)
   ↓
   (Old fetch still running?)
   ↓
Component Unmounts
   ↓
   (Fetch tries to update... but component is gone ❌)
```

If an error occurs like:

> “Can’t perform a React state update on an unmounted component”

— this is exactly why.

### `useEffect`

`useEffect` was created specifically to handle **side effects** in function components — the modern replacement for class lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

### 🧱 Visual: How useEffect Connects to the Lifecycle

```
Component Mounts
   ↓
useEffect() runs → (fetch, start timer, etc.)
   ↓
Component Updates
   ↓
useEffect() runs again (if dependencies changed)
   ↓
Component Unmounts
   ↓
Cleanup function runs (stop timer, cancel fetch)
```

This is what allows React to safely manage asynchronous logic inside function components — without breaking its rendering model.

### 💬 In Plain English

React components live inside a constantly changing world — data updates, users click, network calls resolve, and the UI must keep up.  
React itself only knows how to **render** and **re-render**, not how to **communicate with the outside world**.

useEffect bridges that gap.

It says to React:
> “After you’ve finished drawing this component, run this code.  
> If I change or disappear, clean it up.”

That’s how React keeps your UI, data, and side effects perfectly in sync.

- `fetch` is asynchronous and does not block other code.
- You handle results with `.then()` and errors with `.catch()`.

---

### useEffect Basics

`useEffect()` lets you perform **side effects** after React renders your component — for example, fetching data or updating the document title.

| Syntax | When It Runs |
|---------|--------------|
| `useEffect(fn)` | After **every** render |
| `useEffect(fn, [])` | After the **first mount** only |
| `useEffect(fn, [dep])` | When specific **dependencies** change |


---

###  Fetching with fetch inside useEffect

```jsx
import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // cleanup flag

    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true; // cleanup if unmounted before completion
    };
  }, []); // runs once on mount

  if (loading) return <p>Loading users…</p>;
  if (error) return <p>Failed to load: {error}</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

### What Happens Here

1. The component renders (showing "Loading...").  
2. The `useEffect` runs and starts the fetch request.  
3. When the Promise resolves, `setUsers` updates state.  
4. React re-renders the component with new data.  
5. The DOM updates with the new user list.

---

### Example: Refetch When a Dependency Changes

```jsx
import { useEffect, useState } from "react";

function ResourceViewer() {
  const [resource, setResource] = useState("users");
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://jsonplaceholder.typicode.com/${resource}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setItems(data);
      });

    return () => { cancelled = true; };
  }, [resource]);

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setResource("users")}>Users</button>
        <button onClick={() => setResource("posts")}>Posts</button>
        <button onClick={() => setResource("albums")}>Albums</button>
      </div>

      <h2>Resource: {resource}</h2>
      <ul>{items.slice(0, 5).map((it) => <li key={it.id}>{it.title || it.name}</li>)}</ul>
    </div>
  );
}
```

### Flow Recap
- Clicking a button updates `resource` → triggers a **state change**.  
- React re-renders → `useEffect` runs again because `[resource]` changed.  
- New data is fetched → `setItems` updates → React re-renders → DOM updates.

### ✅ Key Takeaways

- `fetch()` is asynchronous and returns a Promise.  
- React’s **state** drives rendering — changes in state trigger new renders.  
- `useEffect()` runs **after rendering** to handle side effects like fetching data.  
- The **dependency array** controls when the effect runs.  

## React Fetch Patterns

Once you understand the basics of useEffect, the next step is learning when and where to perform data fetching in React. While useEffect is the most common place to run asynchronous code, it’s not the only option — and using it incorrectly can cause extra re-renders, duplicate requests, or stale data issues.

In React, every render is a pure calculation of what the UI should look like — side effects like network calls belong outside that render phase. The key is deciding whether your data should load automatically (based on state or props) or on demand (when a user interacts with something).

This guide walks through several practical patterns:

- Fetching inside useEffect when data depends on component state or props.

- Defining fetch functions outside useEffect to keep them stable and reusable.

- Triggering fetch calls manually inside event handlers for better control.

- Extracting logic into custom hooks for clean, reusable design.

### 1️⃣ Define an Async Function Outside useEffect

**When to use:** You want a reusable function that doesn’t depend on component state.

```jsx
// utils/api.js
export function fetchUsersByCompany(company) {
  return fetch(`https://jsonplaceholder.typicode.com/users?company=${company}`)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    });
}
```

```jsx
// UsersList.jsx
import { useEffect, useState } from "react";
import { fetchUsersByCompany } from "./utils/api";

export default function UsersList({ company }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchUsersByCompany(company)
      .then((data) => { if (!cancelled) setUsers(data); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, [company]);

  if (error) return <p>Failed: {error}</p>;
  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

**Why this works:**
- Function defined outside React, so it doesn’t change identity each render.
- You pass arguments instead of capturing state, keeping it pure and predictable.

---

### 2️⃣ Define Function Inside Component, but Outside useEffect

**When to use:** The function should also be callable by buttons or events.

```jsx
import { useCallback, useEffect, useState } from "react";

export default function UsersList({ company }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback((companyName) => {
    return fetch(`https://jsonplaceholder.typicode.com/users?company=${companyName}`)
      .then((res) => res.json());
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchUsers(company).then((data) => {
      if (!cancelled) setUsers(data);
    });
    return () => { cancelled = true; };
  }, [company, fetchUsers]);

  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

✅ **Tip:** Using `useCallback([])` keeps `fetchUsers` stable, so adding it to dependencies won’t re-run the effect unnecessarily.

---

### 3️⃣ Fetch Outside useEffect — Inside Event Handlers

**When to use:** Fetch **only** after user action (e.g., button click, form submit).

```jsx
import { useState } from "react";

export default function SearchUsers() {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name…" />
        <button>Search</button>
      </form>
      <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  );
}
```

💡 **Why it’s valid:** Event handlers aren’t re-run on every render, so you avoid repeated network calls.

---

### 4️⃣ Use a Custom Hook for Fetching

**When to use:** You want a reusable data-fetching pattern across multiple components.

```jsx
// useUsers.js
import { useEffect, useState } from "react";

export function useUsers(query) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(Boolean(query));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) { setUsers([]); setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${encodeURIComponent(query)}`)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => { if (!cancelled) setUsers(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [query]);

  return { users, loading, error };
}
```

```jsx
// SearchUsers.jsx
import { useState } from "react";
import { useUsers } from "./useUsers";

export default function SearchUsers() {
  const [q, setQ] = useState("");
  const { users, loading, error } = useUsers(q);

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type to search…" />
      {loading && <p>Loading…</p>}
      {error && <p>Error: {error}</p>}
      <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  );
}
```

🧩 **Why this works:** Keeps logic modular and avoids clutter in UI components.

---

## 🚫 Common Anti-Patterns

- ❌ Fetching **inside the render body** — causes infinite loops or double-fetches.  
- ❌ Including unstable functions in dependency arrays — triggers re-runs every render.  
- ❌ Using closures that read stale state — pass values as arguments instead.

---

## ✅ Decision Guide

| Goal | Best Approach |
|------|----------------|
| Fetch on mount or data change | `useEffect` with dependencies |
| Fetch on user action | Inside event handler |
| Reuse fetch logic | Custom hook or utility function |
| Avoid redundant re-renders | Use `useCallback` or pure functions |
| Prevent leaks | Use cleanup flags or `AbortController` |

