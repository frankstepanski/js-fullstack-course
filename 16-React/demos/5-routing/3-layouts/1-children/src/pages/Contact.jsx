/*
  Contact.jsx
  -----------
  This page demonstrates:
  - A basic page rendered via routing
  - A FAKE form for learning purposes
  - Controlled inputs (React state)
  - No backend or submission logic

  This mirrors how real apps START
  before wiring up APIs.
*/

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // This form does NOTHING on purpose.
    // In a real app, this is where you'd call an API.
    alert("Form submitted (demo only)");

    setName("");
    setMessage("");
  };

  return (
    <section className="card">
      <h2>📬 Contact</h2>

      <p>
        This page includes a simple form to demonstrate how
        forms fit into routed pages.
      </p>

      <div className="info">
        ⚠️ This form does not send data anywhere.
        It exists only to show structure and state handling.
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            value={name}
            placeholder="Jane Doe"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            rows="4"
            value={message}
            placeholder="This is a demo message..."
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button className="button" type="submit">
          Send Message
        </button>
      </form>
    </section>
  );
}
