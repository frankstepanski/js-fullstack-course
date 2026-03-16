import { useState, useEffect } from "react";

/*
  FetchSingleTodo
  ----------------
  This component demonstrates:
  - Fetching ONE resource from an API
  - useEffect with dependencies
  - Handling loading, success, and error states
  - Understanding how fetch() really works
*/

export default function FetchSingleTodo() {
  /*
    🧠 STATE
    --------
    todo     → stores the fetched todo object
    todoId   → controls WHICH todo we fetch
    error    → stores any error message (network or server)
  */
  const [todo, setTodo] = useState(null);
  const [todoId, setTodoId] = useState(1);
  const [error, setError] = useState(null);

  /*
    🧠 useEffect
    ------------
    Runs:
    - Once when the component mounts
    - AGAIN whenever `todoId` changes
  */
  useEffect(() => {
    /*
      🌐 FETCH DATA FROM API
      ---------------------
      We fetch ONE todo using the current todoId
    */
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .then((response) => {
        /*
          ⚠️ IMPORTANT FETCH BEHAVIOR
          ---------------------------
          fetch() ONLY rejects on network failures.
          It does NOT reject on 404 or 500 errors.

          That means we MUST check response.ok manually.
        */
        if (!response.ok) {
          /*
            🚨 MANUAL ERROR THROWING
            -----------------------
            Throwing here forces execution into `.catch()`
          */
          throw new Error(`HTTP Error: ${response.status}`);
        }

        /*
          📦 Convert JSON → JavaScript object
        */
        return response.json();
      })
      .then((data) => {
        /*
          ✅ SUCCESS
          ----------
          We received valid data from the server
        */
        setTodo(data);
        setError(null); // clear any previous errors
      })
      .catch((err) => {
        /*
          ❗ WHAT .catch() ACTUALLY CATCHES
          --------------------------------
          - Network failures (offline, DNS issues)
          - JavaScript errors
          - Errors we manually throw (like above)

          ❌ It does NOT automatically catch HTTP errors
        */
        console.error("Fetch error:", err);
        setError("Failed to load todo. Please try again.");
        setTodo(null);
      });
  }, [todoId]);

 /*
    IMPORTANT 
    ---------------------------
    If you see this confole.log MORE times than expected
    (for example, 4 instead of 2), this is NORMAL in development.

    React Strict Mode intentionally:
    - Renders components twice
    - Re-runs useEffect
    - Helps catch side effects and bugs early

    This ONLY happens in development.
    Production builds do NOT double render.
  */

  console.log("FetchSingleTodo:", todo);

  return (
    <section>
      <h2>1. Fetch a Single Todo</h2>

      {/* ERROR STATE */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* LOADING STATE */}
      {!error && !todo && <p>Loading...</p>}

      {/* SUCCESS STATE */}
      {todo && (
        <>
          <p>
            <strong>ID:</strong> {todo.id}
          </p>

          <p>
            <strong>Title:</strong> {todo.title}
          </p>

          <p>
            <strong>Completed:</strong>{" "}
            {todo.completed ? "✅ Yes" : "❌ No"}
          </p>
        </>
      )}

      {/* ACTION */}
      <button
        onClick={() =>
          setTodoId(Math.floor(Math.random() * 10) + 1)
        }
      >
        Fetch Random Todo
      </button>
    </section>
  );
}
