
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="main-nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </nav>
  );
}
