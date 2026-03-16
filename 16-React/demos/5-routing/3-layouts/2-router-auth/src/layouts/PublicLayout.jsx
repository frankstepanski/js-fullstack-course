import { NavLink, Outlet } from "react-router-dom";

export default function PublicLayout({ isAuthenticated }) {
  return (
    <div className="site">
      <header className="site-header">
        <div className="brand">
          <div className="brand-badge">🌐</div>
          <div>
            <p className="brand-title">Public Area</p>
            <p className="brand-subtitle">
              Anyone can see these pages (Home, About, Contact, Login)
            </p>
          </div>
        </div>

        <nav className="top-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {/* If logged in, show a shortcut */}
          {isAuthenticated ? (
            <NavLink to="/dashboard">Dashboard</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </header>

      {/* ✅ CHILD ROUTES RENDER HERE */}
      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">PublicLayout footer</footer>
    </div>
  );
}
