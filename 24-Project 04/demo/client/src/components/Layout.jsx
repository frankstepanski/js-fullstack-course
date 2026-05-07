import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <h1>Moonlight Pizza Co.</h1>
            <p>Fresh, handmade pizza baked under a midnight sky.</p>
          </div>

          <nav className={styles.nav} aria-label="Main site navigation">
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

      <footer className={styles.footer}>
        <p>&copy; 2026 Moonlight Pizza Co. | This is a fictional site for learning HTML and CSS</p>
      </footer>
    </>
  );
}
