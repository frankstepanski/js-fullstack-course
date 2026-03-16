import { NavLink } from "react-router-dom";

/*
  Nav.jsx
  -------
  Top-level navigation for the app.

  This nav changes based on authentication state:
  - Public users see public links
  - Logged-in users see authenticated links
*/

export default function Nav({ isAuthenticated, onLogout }) {
  return (
    <nav className="top-nav">
      {/* Public links — always visible */}
      <NavLink to="/" end>
        Home
      </NavLink>

      <NavLink to="/about">
        About
      </NavLink>

      <NavLink to="/contact">
        Contact
      </NavLink>

      {/* Authenticated links — ONLY when logged in */}
      {isAuthenticated && (
        <>
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/profile">
            Profile
          </NavLink>

          <NavLink to="/settings">
            Settings
          </NavLink>
        </>
      )}

      {/* Auth action */}
      {isAuthenticated ? (
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      ) : (
        <NavLink to="/login">
          Login
        </NavLink>
      )}
    </nav>
  );
}
