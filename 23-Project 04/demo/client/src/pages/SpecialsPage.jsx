import React, { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function SpecialsPage() {
  const [status, setStatus] = useState("Loading specials…");
  const [specials, setSpecials] = useState([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await api.getSpecials();
        if (cancelled) return;

        setSpecials(Array.isArray(data) ? data : []);
        setStatus("This week’s specials (pretend, but delicious):");
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setStatus("There was a problem loading specials. Check json-server and try again.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="specials" aria-labelledby="specials-heading">
      <h2 id="specials-heading">Daily Specials</h2>
      <p id="specials-intro">Check out our weekly deals — perfect for planning your next pizza night.</p>

      <p id="specials-status">{status}</p>

      <div className="specials-grid" id="specials-list">
        {!specials.length ? (
          status.startsWith("There was") ? null : <p>No specials found. Check your db.json.</p>
        ) : (
          specials.map((special) => (
            <article className="special-card" key={special.id ?? `${special.dayLabel}-${special.title}`}>
              <p className="special-day">{special.dayLabel}</p>
              <h3>{special.title}</h3>
              <p className="special-text" dangerouslySetInnerHTML={{ __html: special.descriptionHtml }} />
              <p className="special-tag">{special.tagline}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
