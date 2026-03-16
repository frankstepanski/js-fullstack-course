import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h3 className="dashboard-title">Dashboard Menu</h3>

        {/* SECONDARY MENU (dashboard-only) */}
        <nav className="dashboard-nav">
          <NavLink to="" end>
            Overview
          </NavLink>
          <NavLink to="analytics">Analytics</NavLink>
          <NavLink to="activity">Activity</NavLink>
          <NavLink to="team">Team</NavLink>
        </nav>
      </aside>

      <section className="card dashboard-content">
        {/* ✅ nested dashboard pages render here */}
        <Outlet />
      </section>
    </div>
  );
}
