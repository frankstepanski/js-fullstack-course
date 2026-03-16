import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="card">
      <h2>🚧 404 — Page Not Found</h2>
      <p>That route doesn't exist.</p>
      <Link className="button" to="/">
        Go back home
      </Link>
    </section>
  );
}
