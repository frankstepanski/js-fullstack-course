export default function Settings() {
  return (
    <section className="card">
      <h2>⚙️ Settings</h2>

      <p>
        Settings pages control application behavior and preferences.
      </p>

      <div className="info">
        <p>
          This page exists to show:
        </p>
        <ul className="bullets">
          <li>Authenticated-only routes</li>
          <li>Protected navigation</li>
          <li>Separation of concerns</li>
        </ul>
      </div>

      <p>
        In production apps, this might include:
      </p>

      <ul className="bullets">
        <li>Theme preferences</li>
        <li>Notification settings</li>
        <li>Account deletion</li>
      </ul>

      <p>
        Even though the content is simple, the routing structure mirrors
        real enterprise applications.
      </p>
    </section>
  );
}

