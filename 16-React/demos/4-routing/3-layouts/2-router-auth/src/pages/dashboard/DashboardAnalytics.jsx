export default function DashboardAnalytics() {
  return (
    <section className="card">
      <h2>📈 Analytics</h2>

      <p>
        This page demonstrates a <strong>nested route</strong> inside the dashboard.
      </p>

      <div className="info">
        <p>
          URL: <code>/dashboard/analytics</code>
        </p>
        <p>
          Layout stack:
        </p>
        <ul className="bullets">
          <li>AuthLayout (authenticated shell)</li>
          <li>DashboardLayout (sidebar + structure)</li>
          <li>Analytics page (this content)</li>
        </ul>
      </div>

      <p>
        Analytics pages usually contain:
      </p>

      <ul className="bullets">
        <li>Charts and graphs</li>
        <li>Usage statistics</li>
        <li>Reports</li>
        <li>Business insights</li>
      </ul>

      <p>
        Notice how the navigation stays visible while only this content changes.
        That’s the power of layout routes.
      </p>
    </section>
  );
}
