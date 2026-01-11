import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="card">
      <h2>🏠 Welcome to the React Routing Demo</h2>

      <p>
        This project is designed to demonstrate how modern apps are structured using:
      </p>

      <ul className="bullets">
        <li>React Router (Declarative Mode)</li>
        <li>Layout routes with <code>&lt;Outlet /&gt;</code></li>
        <li>Public vs authenticated areas</li>
        <li>Fake authentication using React state</li>
      </ul>

      <div className="info">
        <p>
          <strong>Big idea:</strong>  
          The app is split into <em>public pages</em> and
          <em> authenticated pages</em>.
        </p>

        <p>
          Users can browse public content freely, but must log in to access
          protected routes like the Dashboard.
        </p>
      </div>

      <Link className="button" to="/login">
        Try Logging In →
      </Link>
    </section>
  );
}
