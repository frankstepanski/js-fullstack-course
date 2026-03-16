import { Link } from "react-router-dom";

/*
  SimpleLayout.jsx
  ----------------
  A BASIC reusable layout component.

  Key ideas:
  - Uses `children` instead of <Outlet />
  - Layout is applied manually in each route
  - Good for beginners learning composition first

  This layout provides:
  - A header
  - A navigation bar
  - A main content area
*/
export default function SimpleLayout({ children }) {
  return (
    <div className="site">
      <header className="site-header">
        <h1 className="brand">Simple React Site</h1>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <p>© 2026 React Layout Demo</p>
      </footer>
    </div>
  );
}
