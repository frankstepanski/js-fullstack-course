export default function DashboardActivity() {
  return (
    <section className="card">
      <h2>🕒 Activity</h2>

      <p>
        Activity pages usually show a timeline of actions.
      </p>

      <div className="info">
        <p>
          Examples include:
        </p>
        <ul className="bullets">
          <li>Logins and logouts</li>
          <li>Edits or updates</li>
          <li>System events</li>
        </ul>
      </div>

      <p>
        From a learning perspective, this page reinforces that:
      </p>

      <ul className="bullets">
        <li>Layouts persist across route changes</li>
        <li>Only the outlet content updates</li>
        <li>Navigation state is preserved</li>
      </ul>
    </section>
  );
}
