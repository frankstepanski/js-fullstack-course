/*
  Home.jsx
  --------
  This is the landing page for the app.

  Its purpose is EDUCATIONAL:
  - Explain how this app is structured
  - Explain what a "layout using children" means
  - Show how routing fits into the picture

*/

export default function Home() {
  return (
    <section className="card">
      <h2>🏠 Welcome</h2>

      <p>
        This demo app is designed to help understand how
        <strong> layouts and routing </strong>
        work together in React.
      </p>

      <h3>🧱 Layouts using <code>children</code></h3>
      <p>
        Instead of using advanced routing features like
        <code>&lt;Outlet /&gt;</code>, this app uses a simple layout
        component that wraps pages using the
        <strong> children prop</strong>.
      </p>

      <ul className="bullets">
        <li>The layout renders shared UI (navigation, footer)</li>
        <li>Each page is passed in as <code>children</code></li>
        <li>This keeps the mental model simple for beginners</li>
      </ul>

      <div className="info">
        💡 Think of a layout as a reusable wrapper around your pages.
        Routing decides <em>which page</em> goes inside the layout.
      </div>

      <h3>🧭 Routing</h3>
      <p>
        React Router decides which page component to render based on the URL.
        That page is then placed inside the layout.
      </p>

      <p>
        You can explore this by clicking the navigation links above.
        Each page changes, but the layout stays the same.
      </p>
    </section>
  );
}
