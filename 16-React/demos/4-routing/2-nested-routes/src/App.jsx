
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

import Home from "./pages/Home";
import About from "./pages/About";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import DashboardProfile from "./pages/DashboardProfile";
import DashboardSettings from "./pages/DashboardSettings";

import "./App.css";

/*
  🧭 App.jsx
  ==========
  This file defines the **ENTIRE routing structure** of the app.

  React Router uses a **tree-based routing model**.
  Routes can be nested to share layouts and UI.

  This app demonstrates:
  - Top-level pages
  - Nested routes
  - Layout routes
  - Index routes
  - 404 fallback routes
*/

export default function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/search" element={<Search />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
