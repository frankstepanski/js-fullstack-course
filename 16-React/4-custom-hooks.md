# Custom React Hooks

As React applications grow, components often become overloaded — not just with UI markup, but also with **state logic**, **data fetching**, **event handling**, and **browser-side effects**.  
At first, this might seem manageable: a few `useState` hooks here, a `useEffect` for data fetching there. But as your app scales, you’ll start seeing problems like:  

- The same logic duplicated across multiple components.  
- Components that are long, tangled, and hard to read or test.  
- Bugs that appear in one place but need fixes everywhere the same pattern exists.  

That’s where **custom hooks** come in.  

Custom hooks let you **extract and reuse logic** — just like components let you reuse UI. They’re functions built on top of React’s hooks (`useState`, `useEffect`, etc.) that organize side effects, state updates, or shared behaviors into clear, testable, and composable units.  

By moving complex or repeated logic into a custom hook, your components stay simple — focusing only on *what the UI looks like*, while the hook handles *how it works*.  

Think of it like this:  
> Components describe **structure** and **appearance**,  
> while custom hooks manage **behavior** and **stateful logic** behind the scenes.  

---

- It’s just a function whose **name starts with `use`** (e.g., `useToggle`, `useFetch`).
- It **encapsulates logic** (state, effects, event wiring, etc.) so components stay clean.
- You can **share** it across components and projects like any other utility.

## Why Would You Need One?

- **DRY (Don’t Repeat Yourself):** Avoid copy/pasting the same `useEffect` + `useState` pattern everywhere.
- **Separation of Concerns:** Move low-level wiring (timers, subscriptions, fetches, caching) out of UI components.
- **Readability:** Components read like the feature they implement (e.g., `const { data } = useFetch(url)`).
- **Testability:** Hook logic can be tested in isolation (with React Testing Library hook utilities).
- **Consistency:** One place to fix bugs or change behavior—every consumer benefits.


## Rules, Patterns, and Tips

- ✅ **Prefix with `use`** (required so React can validate correct usage).  
- ✅ **Call hooks only at the top level** of your custom hook (not inside loops/conditions).  
- ✅ **Only call from React components or other hooks.**  
- 🧩 **Design the API**: Think *inputs* (params) ➜ *outputs* (return object/array).  
- 🧪 **Make it pure where possible** (pass inputs instead of reading globals).  
- 🧭 **Handle cleanup** inside the hook, not the component (e.g., abort fetch, clear timers).  
- 🧱 **Stable contracts**: Return stable handler references when needed (e.g., wrap with `useCallback`).

## Examples:

### 1 - `useCounter` — A Reusable Counter with Optional Side Effects

**What this hook does (in plain language):**

- Stores a **number** using React state.  
- Provides simple functions to **increment**, **decrement**, and **reset** the number.  
- Uses `useEffect` to optionally update the **browser tab title** with the current count.  

This shows how logic can be packaged once and reused anywhere in your app.

```jsx
import { useEffect, useState } from "react";

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initial);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return { count, increment, decrement, reset };
}

// Demo
export function CounterDemo() {
  const { count, increment, decrement, reset } = useCounter(0);
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

---

### 2 - `useFetchJson` — Fetching Data with Loading & Error Handling

**What this hook does:**

- Accepts a **URL** and performs a `fetch()` request.  
- Tracks `loading`, `data`, and `error` states.  
- Allows manual refreshing via `refetch()`.  
- Uses cleanup logic so the component doesn’t update state after unmounting.

This hook simplifies the very common pattern of:  
**"fetch data when the component loads → show loading → show error → show data"**

```jsx
import { useEffect, useState } from "react";

export function useFetchJson(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((json) => {
        if (!ignore) setData(json);
      })
      .catch((err) => {
        if (!ignore) setError(err.message || "Fetch failed");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => { ignore = true };
  }, [url, tick]);

  const refetch = () => setTick(t => t + 1);

  return { data, loading, error, refetch };
}

// Demo
export function UsersList() {
  const { data, loading, error, refetch } = useFetchJson(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <p>Loading…</p>;
  if (error) return (
    <div>
      <p style={{ color: "crimson" }}>Error: {error}</p>
      <button onClick={refetch}>Try Again</button>
    </div>
  );

  return (
    <div>
      <h2>Users</h2>
      <button onClick={refetch}>Refetch</button>
      <ul>
        {(data || []).map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}
```

---

### 3 - `useFilter` — Filtering Items Based on a Search Query

**What this hook does:**

- Accepts an array of `items` and a search `query`.  
- Returns a **filtered** version of the items.  
- Re-runs filtering whenever items or query change.  
- Allows custom selection logic (e.g., filtering by name, email, etc.).

Great for search bars, dropdowns, and product filters.

```jsx
import { useEffect, useState } from "react";

export function useFilter(items, query, selectFn = (x) => x) {
  const [filtered, setFiltered] = useState(items);

  useEffect(() => {
    const q = (query || "").toLowerCase();
    if (!q) {
      setFiltered(items);
      return;
    }
    const next = (items || []).filter((item) => {
      const val = String(selectFn(item) ?? "").toLowerCase();
      return val.includes(q);
    });
    setFiltered(next);
  }, [items, query, selectFn]);

  return filtered;
}

// Demo
export function FilterDemo() {
  const [query, setQuery] = useState("");
  const items = ["React", "Vue", "Svelte", "Angular", "Solid"];
  const results = useFilter(items, query);

  return (
    <div>
      <h2>Filter Frameworks</h2>
      <input
        placeholder="Type to filter…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((name) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  );
}
```

---

### 4 - `useDebouncedValue` — Wait for Typing to Pause Before Updating

**What this hook does:**

- Returns a delayed (“debounced”) version of a value.  
- Updates only after the user **stops typing** for a certain amount of time.  
- Useful for search boxes, autocomplete, and API calls that shouldn’t run on every keystroke.

```jsx
import { useEffect, useState } from "react";

export function useDebouncedValue(value, delayMs = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}

// Demo
export function DebouncedFilterDemo() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 400);
  const items = ["strawberry", "banana", "apple", "grape", "mango", "pear"];
  const results = useFilter(items, debouncedQuery);

  return (
    <div>
      <h2>Debounced Fruit Search</h2>
      <input
        placeholder="Type to search…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((name) => <li key={name}>{name}</li>)}
      </ul>
      <p style={{fontSize: 12, opacity: 0.7}}>
        (Search updates after you pause typing for ~400ms)
      </p>
    </div>
  );
}
```

## Key Takeaways

- Custom hooks allow you to extract and reuse component logic across multiple places in your application.
- They help keep components smaller, cleaner, and focused on rendering UI rather than managing complex logic.
- Hooks must start with the prefix `use` to work correctly with React’s rules of hooks.
- Custom hooks can use other hooks like `useState`, `useEffect`, or even other custom hooks.
- They make shared behaviors—such as fetching data, filtering lists, or handling counters—easy to reuse and test.

## Next Up: Routing  
Your next topic is **React Routing**, which introduces how to navigate between pages inside a Single‑Page Application without reloading the browser. Routing will show you how to build multi‑page experiences using components, layouts, nested routes, dynamic URLs, and the React Router library.
