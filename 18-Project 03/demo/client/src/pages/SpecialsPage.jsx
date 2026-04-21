import React, { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import styles from "./SpecialsPage.module.css";

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
        setStatus("This week's specials (pretend, but delicious):");
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setStatus("There was a problem loading specials. Check json-server and try again.");
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <section id="specials" aria-labelledby="specials-heading">
      <h2 id="specials-heading">Daily Specials</h2>
      <p id="specials-intro">Check out our weekly deals — perfect for planning your next pizza night.</p>

      <p id="specials-status">{status}</p>

      <div className={styles.specialsGrid} id="specials-list">
        {!specials.length ? (
          status.startsWith("There was") ? null : <p>No specials found. Check your db.json.</p>
        ) : (
          specials.map((special) => (
            <article className={styles.specialCard} key={special.id ?? `${special.dayLabel}-${special.title}`}>
              <p className={styles.specialDay}>{special.dayLabel}</p>
              <h3>{special.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: special.descriptionHtml }} />
              <p className={styles.specialTag}>{special.tagline}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
