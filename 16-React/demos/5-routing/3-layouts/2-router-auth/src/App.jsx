import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

/* Layouts */
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

/* Public Pages */
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

/* Auth Pages */
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

/* Dashboard Pages */
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import DashboardAnalytics from "./pages/dashboard/DashboardAnalytics";
import DashboardActivity from "./pages/dashboard/DashboardActivity";
import DashboardTeam from "./pages/dashboard/DashboardTeam";

/* Auth Guard */
import RequireAuth from "./components/RequireAuth";

/* Fallback */
import NotFound from "./pages/NotFound";

import "./App.css";

/*
  🧭 App.jsx 
  =====================================================

  This file is the **brain of the application**.
  It decides:
  - What pages exist
  - Who can see them
  - Which layouts wrap which pages
  - How users move through the app

  Think of App.jsx as:
  👉 "The map + security desk of the app"

  ------------------------------------------------------------------
  🧱 HIGH-LEVEL ARCHITECTURE 
  ------------------------------------------------------------------

  This app is organized into clear responsibility areas:

  src/
  ├─ auth/          → authentication logic (fake login for learning)
  ├─ layouts/       → page STRUCTURE (navs, headers, sidebars)
  ├─ pages/         → actual screen content users read & interact with
  ├─ components/    → reusable UI building blocks
  ├─ App.jsx        → routing + layout wiring (this file)

  Each folder has ONE job.
  This separation is how real-world React apps stay maintainable.

  ------------------------------------------------------------------
  🧩 WHAT IS A "LAYOUT"?
  ------------------------------------------------------------------

  A layout is a **wrapper component** that:
  - Renders shared UI (navigation, headers, sidebars)
  - Uses <Outlet /> to render child pages inside it

  Layouts do NOT represent pages themselves.
  They represent STRUCTURE.

  Think:
  - Layout = the building
  - Pages = rooms inside the building

  ------------------------------------------------------------------
  🧱 THIS APP USES THREE LAYOUT LEVELS
  ------------------------------------------------------------------

  1️⃣ PublicLayout (Everyone can see this)
  ----------------------------------------
  Purpose:
  - Public-facing pages
  - No login required

  Contains:
  - Home
  - About
  - Contact
  - Login
  - 404 (Not Found)

  UI:
  - Public navigation
  - No user-specific data

  This is what FIRST-TIME visitors see.

  ------------------------------------------------------------------

  2️⃣ AuthLayout (Logged-in users ONLY)
  ------------------------------------
  Purpose:
  - Protect authenticated areas
  - Provide "logged in" context

  Contains:
  - Dashboard
  - Profile
  - Settings

  UI:
  - Logout button
  - User-aware navigation

  IMPORTANT:
  - AuthLayout does NOT decide *what* page to show
  - It only wraps authenticated pages

  Think:
  👉 "You passed security — now you're inside the building"

  ------------------------------------------------------------------

  3️⃣ DashboardLayout (Nested inside AuthLayout)
  ----------------------------------------------
  Purpose:
  - Dashboard-specific structure

  Contains:
  - Overview
  - Analytics
  - Activity
  - Team

  UI:
  - Sidebar navigation
  - Dashboard layout grid

  IMPORTANT:
  - DashboardLayout ONLY appears for /dashboard routes
  - It does NOT exist for /profile or /settings

  Think:
  👉 "A special wing inside the authenticated area"

  ------------------------------------------------------------------
  🔐 HOW AUTHENTICATION WORKS 
  ------------------------------------------------------------------

  This app uses FAKE authentication for learning purposes.

  Step-by-step flow:

  1️⃣ User visits /login (PublicLayout)
  2️⃣ User enters credentials
  3️⃣ Login component calls onLogin()
  4️⃣ App.jsx updates isAuthenticated state
  5️⃣ React re-renders the app
  6️⃣ Auth routes become available
  7️⃣ User is redirected to /dashboard

  The key idea:
  👉 Authentication state lives in App.jsx
  👉 Routes change BASED ON STATE

  There is NO magic redirect.
  React simply re-renders when state changes.

  ------------------------------------------------------------------
  🔁 HOW REDIRECTION WORKS
  ------------------------------------------------------------------

  - If a user logs in successfully:
      → navigate("/dashboard")

  - If a logged-in user visits /login:
      → redirected to /dashboard

  - If a logged-out user tries to visit:
      /dashboard
      /profile
      /settings
      → redirected to /login

  This is how real apps protect routes.

  ------------------------------------------------------------------
  🧠 WRAPPING ROUTES WITH LAYOUTS 
  ------------------------------------------------------------------

  Layout routes work by nesting <Route> components:

    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      ...
    </Route>

  The layout renders first.
  The matched page renders INSIDE <Outlet />.

  You can nest layouts inside layouts:

    PublicLayout
      └─ AuthLayout
           └─ DashboardLayout

  This creates layered structure without duplicated code.

  ------------------------------------------------------------------
  💡 FINAL TAKEAWAY 
  ------------------------------------------------------------------

  - Layouts define STRUCTURE
  - Pages define CONTENT
  - Auth is STATE, not navigation
  - Routing reacts to STATE changes
  - Nested layouts mirror real app design

  This is the same architecture used by:
  - SaaS dashboards
  - Admin panels
  - Internal tools
  - Production React apps
*/


export default function App() {
  /* ===================== */
  /* 🔐 AUTH STATE */
  /* ===================== */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

   console.log("isAuthenticated:", isAuthenticated);

  /* ===================== */
  /* 🔑 LOGIN / LOGOUT */
  /* ===================== */
  const login = (username, password) => {
    // Fake credentials (for learning)
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Routes>

      {/* ===================== */}
      {/* 🌍 PUBLIC LAYOUT */}
      {/* ===================== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Login page lives in PUBLIC layout */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={login} />
            )
          }
        />

        {/* ✅ 404 lives INSIDE PublicLayout */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ===================== */}
      {/* 🔐 AUTHENTICATED LAYOUT */}
      {/* ===================== */}
      {isAuthenticated && (
        <Route element={<AuthLayout onLogout={logout} />}>

          {/* -------- DASHBOARD LAYOUT -------- */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="analytics" element={<DashboardAnalytics />} />
            <Route path="activity" element={<DashboardActivity />} />
            <Route path="team" element={<DashboardTeam />} />
          </Route>

          {/* -------- AUTH-ONLY PAGES -------- */}
          <Route
            path="/profile"
            element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Profile />
            </RequireAuth>
            }
          />

          <Route
            path="/settings"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <Settings />
              </RequireAuth>
            }
          />

        </Route>
      )}

      {/* ===================== */}
      {/* 🚫 PROTECTED REDIRECTS */}
      {/* ===================== */}

      {/* Block unauthenticated access */}
      {!isAuthenticated && (
        <Route path="/dashboard/*" element={<Navigate to="/login" replace />} />
      )}

      {!isAuthenticated && (
        <Route path="/profile" element={<Navigate to="/login" replace />} />
      )}

      {!isAuthenticated && (
        <Route path="/settings" element={<Navigate to="/login" replace />} />
      )}

    </Routes>
  );
}