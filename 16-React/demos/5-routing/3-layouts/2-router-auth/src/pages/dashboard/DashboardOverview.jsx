export default function DashboardOverview() {
  return (
    <section className="card">
      <h2>📊 Dashboard Overview</h2>

      <p>
        Welcome to the <strong>authenticated area</strong> of the app.
        You are seeing this page because:
      </p>

      <ul className="bullets">
        <li>You successfully logged in</li>
        <li>The app switched from the PublicLayout to the AuthLayout</li>
        <li>The DashboardLayout rendered its navigation</li>
        <li>This page rendered inside the layout’s <code>&lt;Outlet /&gt;</code></li>
      </ul>

      <div className="info">
        <p>
          <strong>How routing works here:</strong>
        </p>
        <p>
          This page is an <em>index route</em> for <code>/dashboard</code>.
          That means it loads automatically when no sub-route is specified.
        </p>
      </div>

      <p>
        In real applications, this page often shows:
      </p>

      <ul className="bullets">
        <li>Account summaries</li>
        <li>Recent activity</li>
        <li>Metrics or charts</li>
        <li>Quick links to common actions</li>
      </ul>
    </section>
  );
}
