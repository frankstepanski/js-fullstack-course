import { useNavigate, NavLink, Outlet } from "react-router-dom";

export default function AuthLayout({ onLogout }) {
/*
  AuthLayout
  ----------
  This layout wraps ALL authenticated pages.

  Responsibilities:
  - Show authenticated navigation
  - Provide Logout button
  - Redirect user AFTER logout
*/

const navigate = useNavigate();

const handleLogout = () => {
    onLogout();          // 1️⃣ clear auth state
    navigate("/");       // 2️⃣ redirect to public route
  };

  return (
    <div className="site">
      <header className="site-header">
        <div className="brand">
          <div className="brand-badge">🔐</div>
          <div>
            <p className="brand-title">Authenticated Area</p>
            <p className="brand-subtitle">
              You only see this after logging in
            </p>
          </div>
        </div>

        {/* TOP MENU for authenticated area */}
        <nav className="top-nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/settings">Settings</NavLink>

          <button className="ghost-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      {/* ✅ AUTH PAGES (Dashboard/Profile/Settings) render here */}
      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">AuthLayout footer</footer>
    </div>
  );
}
