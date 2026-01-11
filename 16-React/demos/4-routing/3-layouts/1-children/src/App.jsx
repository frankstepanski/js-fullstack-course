import { Routes, Route } from "react-router-dom";

import SimpleLayout from "./layouts/SimpleLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

/*
  App.jsx
  -------
  This file controls **navigation and page rendering** for the app.

  This app intentionally uses a SIMPLE routing approach
  to help beginners understand the fundamentals first.

  -----------------------------------------------------
  🧭 1. Routing for Navigation
  -----------------------------------------------------
  React Router is used to:
  - Switch pages without full page reloads
  - Map URLs ("/", "/about", "/contact") to components
  - Create a real multi-page feeling in a single-page app

  Each <Route> says:
    "When the URL matches this path, show this component."

  -----------------------------------------------------
  🧱 2. Layouts Using the `children` Prop (No <Outlet />)
  -----------------------------------------------------
  Instead of using React Router layout routes,
  this app uses a **basic layout component** like:

    <SimpleLayout>
      <Home />
    </SimpleLayout>

  - You can SEE the layout wrapping the page
  - No routing magic or indirection
  - Uses standard React composition
  - Reinforces how `children` works

  The layout component:
  - Renders shared UI (header, nav, footer)
  - Renders the page content via {children}

  This teaches:
  - Component reuse
  - Composition over configuration
  - How layouts work at a React level

  -----------------------------------------------------
  📄 3. Basic Nested Routing (About Page)
  -----------------------------------------------------
  The About section demonstrates **simple nested routing**:

    /about
    /about/team
    /about/mission

  This shows beginners:
  - Routes can be grouped by URL structure
  - Pages can have their own sub-navigation
  - You don’t need advanced layouts to nest routes

  -----------------------------------------------------
  🧠 Big Picture Takeaway
  -----------------------------------------------------
  This app focuses on clarity over cleverness.

  You are learning:
  ✅ How routing works
  ✅ How layouts are just components
  ✅ How children enable reuse
  ✅ How pages relate to URLs

  Later, you can replace this approach with:
  - Layout routes
  - <Outlet />
  - Auth-based routing
  - Data routers

  But first — understand THIS.
*/

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SimpleLayout>
            <Home />
          </SimpleLayout>
        }
      />

      <Route
        path="/about"
        element={
          <SimpleLayout>
            <About />
          </SimpleLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <SimpleLayout>
            <Contact />
          </SimpleLayout>
        }
      />
    </Routes>
  );
}
