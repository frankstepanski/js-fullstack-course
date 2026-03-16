import { useState } from "react";

/*
  About.jsx
  ---------
  This page demonstrates **page-level sub-navigation**.

  Key ideas:
  - Navigation INSIDE a page
  - Uses React state (not routing)
  - Keeps logic simple for beginners

  This pattern is common for:
  - Tabs
  - Settings panels
  - Profile sections
*/
export default function About() {
  const [section, setSection] = useState("overview");

  return (
    <section className="card">
      <h2>ℹ️ About This App</h2>

      {/* Sub-navigation */}
      <nav className="sub-nav">
        <button
          className={section === "overview" ? "active" : ""}
          onClick={() => setSection("overview")}
        >
          Overview
        </button>

        <button
          className={section === "mission" ? "active" : ""}
          onClick={() => setSection("mission")}
        >
          Mission
        </button>

        <button
          className={section === "team" ? "active" : ""}
          onClick={() => setSection("team")}
        >
          Team
        </button>
      </nav>

      {/* Sub-section content */}
      <div className="sub-content">
        {section === "overview" && (
          <p>
            This demo shows how layouts and navigation work in React using
            simple composition.
          </p>
        )}

        {section === "mission" && (
          <p>
            The goal is to teach routing and layouts step-by-step without
            overwhelming beginners.
          </p>
        )}

        {section === "team" && (
          <p>
            Built by instructors who care about clarity, structure, and
            real-world React patterns.
          </p>
        )}
      </div>
    </section>
  );
}
