import { useEffect, useState } from "react";

/*
  📦 API FUNCTIONS
  ----------------
  All HTTP requests live in `src/api/todos.js`.

  This keeps:
  - fetch logic OUT of components
  - components focused on UI and state
*/
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from "./api/todos";

import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";
import "./App.css";

/*
  🧩 App.jsx
  ==========
  This is the ROOT component of the application.

  -----------------------------------------------
  🗂️ PROJECT STRUCTURE 
  -----------------------------------------------

  src/
  ├─ api/               → All API / fetch logic
  │   └─ todos.js
  ├─ components/        → Reusable UI components
  │   ├─ TodoAdd.jsx
  │   ├─ TodoList.jsx
  │   └─ TodoItem.jsx
  ├─ server/            → Local "database"
  │   └─ db.json
  ├─ App.jsx            → Root component 
  └─ main.jsx           → React entry point

  -----------------------------------------------
  🌐 json-server (IMPORTANT CONCEPT)
  -----------------------------------------------

  We are using `json-server` as:
  - a FAKE database
  - a FAKE backend API

  This means:
  - No real backend code
  - No authentication

  json-server reads from:
    src/server/db.json

  And exposes REST endpoints like:
    GET    http://localhost:3001/todos
    POST   http://localhost:3001/todos
    PATCH  http://localhost:3001/todos/:id
    DELETE http://localhost:3001/todos/:id

  -----------------------------------------------
  ▶️ RUNNING THE APP (VERY IMPORTANT)
  -----------------------------------------------

  You MUST run TWO servers at the same time:

  1️⃣ React dev server
      npm run dev
      → http://localhost:5173

  2️⃣ json-server (API server)
      npm run server
      → http://localhost:3001

  If json-server is NOT running:
  ❌ fetch() calls will fail
  ❌ Todos will not load
*/

export default function App() {
  /*
    🧠 STATE: todos
    --------------
    This is the SINGLE SOURCE OF TRUTH
    for all todo data in the app.

    Why state lives here:
    - Multiple components need access
    - App controls data flow
    - Children receive data via props
  */
  const [todos, setTodos] = useState([]);

  /*
    🧠 STATE: loading
    ----------------
    Used to show loading UI while data
    is being fetched from the API
  */
  const [loading, setLoading] = useState(true);

  /*
    🔄 INITIAL DATA FETCH
    --------------------
    Runs ONCE when App mounts.

    Why useEffect?
    - We want data when the app loads
    - Not on every render
    - Not based on user interaction
  */
  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await getTodos(); // GET /todos
        setTodos(data);
      } catch (err) {
        console.error("Failed to load todos", err);
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
  }, []);

  /*
    ➕ CREATE TODO
    -------------
    1. Send POST request to API
    2. Receive newly created todo
    3. Update React state
  */
  async function handleAddTodo(text) {
    const newTodo = await createTodo(text);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  /*
    ✅ TOGGLE COMPLETE
    -----------------
    1. Send PATCH request
    2. Update ONLY the changed todo
    3. Replace it in state
  */
  async function handleToggle(id, completed) {
    const updatedTodo = await updateTodo(id, { completed });

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      )
    );
  }

  /*
    ✏️ EDIT TODO TEXT
    ----------------
    Similar to toggle, but updates text instead
  */
  async function handleEdit(id, text) {
    const updatedTodo = await updateTodo(id, { text });

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      )
    );
  }

  /*
    🗑️ DELETE TODO
    --------------
    1. Send DELETE request to API
    2. Remove todo from state
  */
  async function handleDelete(id) {
    await deleteTodo(id);
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  }

  /*
    ⏳ LOADING STATE
    ---------------
    Prevents UI from rendering before data exists
  */
  if (loading) {
    return <p>Loading todos...</p>;
  }

  /*
    🎨 RENDER UI
    -----------
    App passes:
    - DATA (todos)
    - ACTIONS (functions)
    to child components
  */
  return (
    <div className="app">
      <h1>Todo App (json-server CRUD)</h1>

      {/* Add new todos */}
      <TodoAdd onAdd={handleAddTodo} />

      {/* List + manage todos */}
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
