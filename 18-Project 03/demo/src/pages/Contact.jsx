import { useEffect, useState } from "react";
import PageShell from "./PageShell.jsx";
import StatusMessage from "../components/ui/StatusMessage.jsx";
import { api } from "../api/client.js";
import styles from "./contact.module.css";
import styled from "styled-components";

const Card = styled.article`
  background: white;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
`;

export default function Contact() {
  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState({ type: "loading", msg: "Loading contact info…" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await api.getContactCards();
        if (cancelled) return;
        setCards(data);
        setStatus({ type: "ready", msg: "" });
      } catch {
        if (cancelled) return;
        setStatus({ type: "error", msg: "Could not load contact info. Is json-server running?" });
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <PageShell title="Contact" intro="Find a location or send us a message.">
      {status.type !== "ready" ? (
        <StatusMessage tone={status.type === "error" ? "error" : "neutral"}>
          {status.msg}
        </StatusMessage>
      ) : (
        <section className={styles.grid} aria-label="Contact cards">
          {cards.map((c) => (
            <Card key={c.id}>
              <h3 style={{ margin: 0 }}>{c.title}</h3>
              <p style={{ margin: 0, color: "#555" }}>{c.description}</p>
              {c.phone ? <p style={{ margin: 0 }}><strong>Phone:</strong> {c.phone}</p> : null}
              {c.email ? <p style={{ margin: 0 }}><strong>Email:</strong> {c.email}</p> : null}
              {c.address ? <p style={{ margin: 0 }}><strong>Address:</strong> {c.address}</p> : null}
            </Card>
          ))}
        </section>
      )}
    </PageShell>
  );
}
