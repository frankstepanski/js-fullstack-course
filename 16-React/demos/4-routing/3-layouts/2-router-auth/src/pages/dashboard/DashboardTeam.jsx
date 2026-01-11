export default function DashboardTeam() {
  return (
    <section className="card">
      <h2>👥 Team</h2>

      <p>
        This page represents a common real-world dashboard feature:
        managing people or permissions.
      </p>

      <div className="info">
        <p>
          In a real app, this page might:
        </p>
        <ul className="bullets">
          <li>List users or teammates</li>
          <li>Assign roles or permissions</li>
          <li>Invite new users</li>
        </ul>
      </div>

      <p>
        Routing-wise, this page exists because:
      </p>

      <ul className="bullets">
        <li>The user is authenticated</li>
        <li>The AuthLayout allowed access</li>
        <li>The DashboardLayout rendered the sidebar</li>
        <li>This route matched <code>/dashboard/team</code></li>
      </ul>
    </section>
  );
}
