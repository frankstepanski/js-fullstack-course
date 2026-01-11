import { NavLink, Outlet } from "react-router-dom";

/*
  📊 Dashboard.jsx
  ----------------
  This component is a **LAYOUT ROUTE**.

  What that means:
  - Dashboard renders UI that should ALWAYS be visible
    (title + navigation)
  - It also provides a place (<Outlet />) for child routes
    to render inside of it

  URL structure this supports:

    /dashboard            → Overview page
    /dashboard/profile    → Profile page
    /dashboard/settings   → Settings page
*/

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Page title that stays visible for all dashboard pages */}
      <h2>Dashboard</h2>

      {/*
        🧭 DASHBOARD NAVIGATION
        ----------------------
        NavLink works like Link, but with extra powers:
        - It automatically adds an "active" class
        - This lets us style the currently active page

        IMPORTANT:
        These paths are **RELATIVE** paths.

        Because this component is rendered at /dashboard,
        these links resolve to:

        ""         → /dashboard
        "profile"  → /dashboard/profile
        "settings" → /dashboard/settings
      */}
      <nav className="dashboard-nav">
        {/*
          `to=""` + `end`
          ----------------
          This represents the *index route* for /dashboard

          Without `end`, this link would stay active
          even when visiting /dashboard/profile or /settings
        */}
        <NavLink to="" end>
          Overview
        </NavLink>

        <NavLink to="profile">
          Profile
        </NavLink>

        <NavLink to="settings">
          Settings
        </NavLink>
      </nav>

      {/*
        🧩 <Outlet />
        -------------
        This is the MOST IMPORTANT part of a layout route.

        <Outlet /> is a placeholder.

        React Router will render the **matched child route**
        right here.

        Examples:
        - /dashboard            → <Overview /> renders here
        - /dashboard/profile    → <Profile /> renders here
        - /dashboard/settings   → <Settings /> renders here
      */}
      <Outlet />
    </div>
  );
}
