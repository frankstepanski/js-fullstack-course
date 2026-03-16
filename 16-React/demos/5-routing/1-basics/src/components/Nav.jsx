import { NavLink } from "react-router-dom";
import "./Nav.css";

/*
  Nav.jsx
  -------
  This component renders the main site navigation.

  NavLink is used instead of <a> because:
  - It prevents full page reloads
  - It works with React Router
  - It allows active link styling
*/

export default function Nav() {
  return (
    <nav className="nav">
      <h1 className="nav__logo">React Router Demo</h1>

      <ul className="nav__links">
        <li>
          <NavLink to="/" className="nav__link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav__link">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="nav__link">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
