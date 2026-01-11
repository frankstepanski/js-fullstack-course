import { useState, useEffect } from "react";

/*
  FetchUsersBySearch
  ------------------
  This example demonstrates a VERY COMMON useEffect pattern:

  - Fetch data from an API
  - Re-fetch when a search value changes
  - Show loading and error states
  - Render results safely

  This pattern is used in real apps for:
  - Search bars
  - Filters
  - Admin dashboards
*/

export default function FetchUsersBySearch() {
  /*
    🧠 STATE
    --------
    searchTerm:
      What the user types

    users:
      Data returned from the API

    loading:
      Controls loading UI

    error:
      Handles network or server errors
  */
  const [searchTerm, setSearchTerm] = useState("Leanne");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
    🌐 EFFECT: Fetch data when searchTerm changes
    ---------------------------------------------
    This runs:
    - once on mount
    - again every time searchTerm changes
  */
  useEffect(() => {
  /*
    🌐 FETCH USERS FROM AN API
    -------------------------
    We are requesting data from a remote server.

    Important beginner rule:
    - fetch() does NOT return data immediately
    - It returns a PROMISE (something that resolves later)
  */
  fetch("https://jsonplaceholder.typicode.com/users")

    .then((response) => {

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
    })

    .then((data) => {
      /*
        ✅ DATA SUCCESSFULLY LOADED
        ---------------------------
        `data` is now a JavaScript array of users.

        Example:
        [
          { id: 1, name: "Leanne Graham", ... },
          { id: 2, name: "Ervin Howell", ... }
        ]
      */

      /*
        🔍 FILTERING LOGIC
        ------------------
        If the search input has text:
          → Filter users by name
        If the input is empty:
          → Show ALL users
      */

      const filteredUsers = searchTerm.trim()
        ? data.filter((user) =>
            user.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
        : data; // 👈 Empty search shows all users

      setUsers(filteredUsers);
    })

    .catch((error) => {
      
      console.error("Fetch error:", error);

      setError("Failed to load users");
      setUsers([]);
    })

    .finally(() => {
      /*
        ⏳ CLEANUP STEP
        ---------------
        This always runs:
        - After success
        - After failure

        Useful for stopping loading spinners
        or resetting UI state.
      */
      setLoading(false);
    });

    }, [searchTerm]);



  return (
    <section>
      <h2>3. Fetch Users by Search</h2>

      <input
        type="text"
        placeholder="Search users by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>

      {!loading && users.length === 0 && (
        <p>No users found.</p>
      )}
    </section>
  );
}
