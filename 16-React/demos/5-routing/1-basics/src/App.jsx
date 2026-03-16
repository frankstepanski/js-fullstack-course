import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import "./App.css";

/*
  App.jsx
  -------
  This app uses React Router in **Declarative Mode**.

  🧭 DECLARATIVE MODE vs DATA MODE
  --------------------------------

  React Router supports TWO main routing styles:

  1️⃣ Declarative Mode (what we're using here)
  2️⃣ Data Mode (newer, more advanced)

  ------------------------------------------------
  1️⃣ Declarative Mode 
  ------------------------------------------------
  - Routes are declared directly in JSX
  - Routing looks and feels like normal React components
  - You control navigation using <Routes> and <Route>
  - Data fetching happens INSIDE components (useEffect, fetch, etc.)

  Example:
    <Route path="/about" element={<About />} />

  Best for:
  - Learning React Router
  - Small to medium apps
  - Apps where data fetching logic lives in components
  - Understanding how routing works step-by-step

  This mode matches how most beginners already think about React:
  "When the URL is X, show component Y"

  ------------------------------------------------
  2️⃣ Data Mode (ADVANCED / REAL-WORLD SCALE)
  ------------------------------------------------
  - Routes are defined using JavaScript objects
  - Supports:
      • loaders (data fetching BEFORE rendering)
      • actions (form submissions)
      • route-level error handling
  - Routing and data are tightly coupled

  Example (Data Mode):
    createBrowserRouter([
      {
        path: "/",
        element: <Home />,
        loader: async () => fetchData()
      }
    ])

  Best for:
  - Large applications
  - Apps with heavy data needs
  - When you want loading states, errors, and data handled at the route level

  ------------------------------------------------
  WHY WE USE DECLARATIVE MODE HERE
  ------------------------------------------------
  ✔ Easier to understand
  ✔ Less abstraction
  ✔ Matches core React concepts
  ✔ Perfect for learning routing fundamentals

  Once you understand Declarative Mode well,
  Data Mode becomes much easier to learn later.
*/

export default function App() {
  return (
    <div className="app">
      {/* Global navigation (always visible) */}
      <Nav />

      {/* Main content area where routes render */}
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 404 fallback route (must be last) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
