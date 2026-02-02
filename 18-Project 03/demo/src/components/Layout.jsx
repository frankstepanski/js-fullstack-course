import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <div className="header-inner">
          <div className="brand">
            <h1>Moonlight Pizza Co.</h1>
            <p>Fresh, handmade pizza baked under a midnight sky.</p>
          </div>

          <nav aria-label="Main site navigation">
            <ul>
              <li><NavLink to="/">About</NavLink></li>
              <li><NavLink to="/menu">Menu</NavLink></li>
              <li><NavLink to="/specials">Specials</NavLink></li>
              <li><NavLink to="/order">Order Online</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer>
        <p>&copy; 2025 Moonlight Pizza Co. | This is a fictional site for learning HTML and CSS</p>
      </footer>
    </>
  );
}
