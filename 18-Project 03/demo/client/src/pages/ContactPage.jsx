import React, { useEffect, useState } from "react";
import { api } from "../lib/api.js";

function ContactCard({ card }) {
  if (card.type === "visit") {
    return (
      <div className="contact-card">
        <h3>{card.title}</h3>

        <p>
          <strong>Address:</strong>
          <br />
          {(card.addressLines || []).map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>

        <p>
          <strong>Phone:</strong>
          <br />
          <a href={card.phoneHref}>{card.phoneDisplay}</a>
        </p>

        <p>
          <strong>Email:</strong>
          <br />
          <a href={card.emailHref}>{card.emailDisplay}</a>
        </p>

        <p className="contact-note">{card.note}</p>
      </div>
    );
  }

  if (card.type === "info") {
    return (
      <div className="contact-card">
        <h3>{card.title}</h3>

        {(card.paragraphs || []).map((t, idx) => (
          <p key={idx}>{t}</p>
        ))}

        <div className="contact-actions">
          {(card.actions || []).map((a, idx) => (
            <a
              key={idx}
              className={a.kind === "secondary" ? "contact-button contact-button-secondary" : "contact-button"}
              href={a.href}
              target={a.target || undefined}
              rel={a.target === "_blank" ? "noreferrer" : undefined}
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Fallback: simple title + paragraphs
  return (
    <div className="contact-card">
      <h3>{card.title || "Info"}</h3>
      {(card.paragraphs || []).map((t, idx) => (
        <p key={idx}>{t}</p>
      ))}
    </div>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState("Loading contact details…");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await api.getContactCards();
        if (cancelled) return;

        setCards(Array.isArray(data) ? data : []);
        setStatus("Need to reach us? Here’s the info:");
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setStatus("There was a problem loading contact info. Check json-server and try again.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact &amp; Location</h2>

      <p id="contact-intro">
        Here’s how to find us and get in touch with the (fictional) Moonlight Pizza Co. team.
      </p>

      <p id="contact-status">{status}</p>

      <div className="contact-layout" id="contact-cards">
        {!cards.length ? (
          status.startsWith("There was") ? null : <p>No contact information found. Check your db.json.</p>
        ) : (
          cards.map((card) => <ContactCard key={card.id ?? card.title} card={card} />)
        )}
      </div>
    </section>
  );
}
