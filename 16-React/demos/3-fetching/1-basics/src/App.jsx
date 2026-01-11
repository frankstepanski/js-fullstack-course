import FetchSingleTodo from "./components/FetchSingleTodo";
import FetchTodoList from "./components/FetchTodoList";
import FetchUsersBySearch from "./components/FetchUsersBySearch";
import FetchDogImage from "./components/FetchDogImage";

import "./App.css";

export default function App() {
  return (
    <div className="app">
      <h1>React Fetch Examples (Beginner Friendly)</h1>

      {/*
        1️⃣ FetchSingleTodo
        ------------------
        📌 PATTERN: useEffect with a dependency

        - Fetches ONE resource from an API
        - Runs on initial page load
        - Re-runs when a specific piece of state changes

        WHEN YOU USE THIS PATTERN:
        - You need data immediately when the component loads
        - The data depends on a changing value (like an ID)
        - Example use cases:
          • User profile page
          • Product details page
          • Dashboard widgets
      */}
      <FetchSingleTodo />

      {/*
        2️⃣ FetchTodoList
        ----------------
        📌 PATTERN: useEffect with an EMPTY dependency array []

        - Fetches data ONE time only
        - Runs when the component first mounts
        - Does NOT re-fetch unless the component unmounts/remounts

        WHEN YOU USE THIS PATTERN:
        - You need initial data for the page
        - The data does not depend on user input
        - Example use cases:
          • List pages
          • Tables
          • Static reference data
      */}
      <FetchTodoList />

      {/*
        3️⃣ FetchUsersBySearch
        ---------------------
        📌 PATTERN: useEffect triggered by USER INPUT (search)

        - Fetch runs whenever the search value changes
        - Dependency array controls WHEN fetching happens
        - Demonstrates filtering + API calls together

        WHEN YOU USE THIS PATTERN:
        - Search inputs
        - Filters
        - Typeahead/autocomplete
        - Live querying based on user input

        IMPORTANT:
        - This can cause MANY network requests
        - Debouncing or submit buttons are often added later
      */}
      <FetchUsersBySearch />

      {/*
        4️⃣ FetchDogImage
        ----------------
        📌 PATTERN: NO useEffect (event-driven fetch)

        - Fetch happens ONLY when a user clicks a button
        - This is NOT a side effect of rendering
        - Fetch is tied directly to a user action

        WHEN YOU USE THIS PATTERN:
        - Buttons
        - Form submissions
        - "Load more" actions
        - Refresh / retry actions
        - Anything user-triggered

        KEY LESSON:
        ❌ Do NOT use useEffect for button clicks
        ✅ Use a regular function instead
      */}
      <FetchDogImage />
    </div>
  );
}
