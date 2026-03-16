export default function Contact() {
  return (
    <section className="card">
      <h2>📬 Contact</h2>

      <p>
        This page includes a <strong>static form</strong> to demonstrate how
        forms fit into routed pages.
      </p>

      <p>
        The form does <em>not</em> submit data anywhere — this is intentional.
        In a real app, this would connect to a backend API.
      </p>

      <form className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Jane Doe" disabled />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="jane@example.com" disabled />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            rows="4"
            placeholder="This form is just for demonstration…"
            disabled
          />
        </div>

        <div className="info">
          <p>
            🚧 This form is disabled on purpose.
            <br />
            It exists to show layout, structure, and routing — not data handling.
          </p>
        </div>
      </form>
    </section>
  );
}
