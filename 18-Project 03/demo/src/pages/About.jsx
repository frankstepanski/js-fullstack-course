import { useEffect, useState } from "react";
import PageShell from "./PageShell.jsx";
import StatusMessage from "../components/ui/StatusMessage.jsx";
import { api } from "../api/client.js";
import styled from "styled-components";

const Quote = styled.blockquote`
  margin: 0;
  padding: 1rem;
  border-radius: 14px;
  background: white;
  border: 1px solid #eee;
`;

const Grid = styled.section`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default function About() {
  const [testimonials, setTestimonials] = useState([]);
  const [status, setStatus] = useState({ type: "loading", msg: "Loading testimonials…" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await api.getTestimonials();
        if (cancelled) return;
        setTestimonials(data);
        setStatus({ type: "ready", msg: "" });
      } catch {
        if (cancelled) return;
        setStatus({ type: "error", msg: "Could not load testimonials. Is json-server running?" });
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <PageShell title="About" intro="A tiny page to show fetching & rendering different API data.">
      {status.type !== "ready" ? (
        <StatusMessage tone={status.type === "error" ? "error" : "neutral"}>
          {status.msg}
        </StatusMessage>
      ) : (
        <Grid aria-label="Testimonials">
          {testimonials.map((t) => (
            <Quote key={t.id}>
              <p style={{ margin: 0, color: "#333", lineHeight: 1.5 }}>“{t.quote}”</p>
              <p style={{ marginTop: "0.75rem", marginBottom: 0, color: "#555" }}>— {t.name}</p>
            </Quote>
          ))}
        </Grid>
      )}
    </PageShell>
  );
}
