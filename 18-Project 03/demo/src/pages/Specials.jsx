import { useEffect, useState } from "react";
import PageShell from "./PageShell.jsx";
import StatusMessage from "../components/ui/StatusMessage.jsx";
import { api } from "../api/client.js";
import styles from "./specials.module.css";
import styled from "styled-components";

const Card = styled.article`
  background: white;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
`;

export default function Specials() {
  const [specials, setSpecials] = useState([]);
  const [status, setStatus] = useState({ type: "loading", msg: "Loading specials…" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await api.getSpecials();
        if (cancelled) return;

        /* Defensive: ensure we always set an array */
        setSpecials(Array.isArray(data) ? data : []);
        setStatus({ type: "ready", msg: "" });
      } catch {
        if (cancelled) return;
        setStatus({ type: "error", msg: "Could not load specials. Is json-server running?" });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  /* --------------------------------------------------
     FIX: Safe price formatting (never show $NaN)
     --------------------------------------------------
     - json-server data may have price missing, null,
       or a string.
     - We normalize to a number and guard.
  -------------------------------------------------- */
  function formatPrice(price) {
    const n = typeof price === "number" ? price : Number(price);
    return Number.isFinite(n) ? n.toFixed(2) : null;
  }

  return (
    <PageShell title="Specials" intro="Limited-time deals — updated via the API.">
      {status.type !== "ready" ? (
        <StatusMessage $tone={status.type === "error" ? "error" : "neutral"}>
          {status.msg}
        </StatusMessage>
      ) : (
        <section className={styles.grid} aria-label="Daily specials">
          {specials.map((s) => {
            const formatted = formatPrice(s.price);

            return (
              <Card key={s.id}>
                <h3 style={{ margin: 0 }}>{s.title}</h3>

                {/* Defensive: description might be missing */}
                {s.description ? (
                  <p style={{ margin: 0, color: "#555" }}>{s.description}</p>
                ) : null}

                <p style={{ margin: 0 }}>
                  <strong>Price:</strong>{" "}
                  {formatted ? `$${formatted}` : "See store for details"}
                </p>
              </Card>
            );
          })}
        </section>
      )}
    </PageShell>
  );
}