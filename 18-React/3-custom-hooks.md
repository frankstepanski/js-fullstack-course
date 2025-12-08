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

### 1) `useCounter` — a Clean Counter

Tracks a number and demonstrates reacting to state changes (e.g., updating the tab title).

```jsx
import { useEffect, useState } from "react";

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initial);

  // Optional side effect: reflect the count in the document title
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

### 2) useFetchJson — Simple API Calls with useEffect

Handles **loading**, **error**, and **data** for a basic JSON `GET` request.

```jsx
import { useEffect, useState } from "react";

/**
 * useFetchJson(url)
 * - Pass a URL (or null to skip)
 * - Returns { data, loading, error, refetch }
 */
export function useFetchJson(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0); // force refetch when incremented

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

    return () => {
      // Prevent state updates if unmounted
      ignore = true;
    };
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

### 3) useFilter — Filter Items by a Query

Filters a list whenever `items` or `query` changes (derived state via `useEffect`).

```jsx
import { useEffect, useState } from "react";

/**
 * useFilter(items, query, selectFn)
 * - items: array of anything (e.g., users, products)
 * - query: string to search for
 * - selectFn: function to pick which field to search in each item
 */
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

### 4) useDebouncedValue — Wait for Typing to Pause

Useful with search/filter inputs so you don’t update on **every** keystroke.

```jsx
import { useEffect, useState } from "react";

/**
 * useDebouncedValue(value, delayMs)
 * - Returns a debounced copy of `value` that updates after the delay
 */
export function useDebouncedValue(value, delayMs = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}

// Demo (Debounced search + filter)
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