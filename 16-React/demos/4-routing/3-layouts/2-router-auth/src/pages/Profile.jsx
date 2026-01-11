export default function Profile() {
  return (
    <section className="card">
      <h2>👤 Profile</h2>

      <p>
        The Profile page lives in the <strong>authenticated area</strong>,
        but outside the dashboard sub-navigation.
      </p>

      <div className="info">
        <p>
          This page demonstrates that:
        </p>
        <ul className="bullets">
          <li>Not all authenticated pages must be nested under /dashboard</li>
          <li>AuthLayout can protect multiple route groups</li>
        </ul>
      </div>

      <p>
        Real-world profile pages typically include:
      </p>

      <ul className="bullets">
        <li>User information</li>
        <li>Avatar or profile image</li>
        <li>Password or security settings</li>
      </ul>
    </section>
  );
}
