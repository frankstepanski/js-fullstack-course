export default function About() {
  return (
    <section className="card">
      <h2>ℹ️ About This App</h2>

      <p>
        This application is intentionally <strong>not complex</strong>.
        Its goal is to teach <em>structure</em>, not features.
      </p>

      <h3>🧱 Architecture Overview</h3>
      <ul className="bullets">
        <li>
          <strong>PublicLayout</strong>  
          <br />Used for public-facing pages like Home, About, Contact, and Login
        </li>
        <li>
          <strong>AuthLayout</strong>  
          <br />Wraps all authenticated routes and handles logout
        </li>
        <li>
          <strong>DashboardLayout</strong>  
          <br />Provides dashboard-specific navigation and layout
        </li>
      </ul>

      <h3>🧭 Routing Strategy</h3>
      <p>
        Routes are defined declaratively using <code>&lt;Routes&gt;</code> and
        <code>&lt;Route&gt;</code>.
      </p>

      <div className="info">
        <p>
          Instead of defining routes as data objects, this app uses
          <strong> Declarative Routing</strong> so beginners can see the route
          hierarchy directly in JSX.
        </p>
      </div>

      <p>
        This mirrors how many real-world React apps are built before introducing
        advanced patterns like loaders, actions, or route-based data fetching.
      </p>
    </section>
  );
}

