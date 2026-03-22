import React, { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api.js";

function getRandomSubset(arr, count) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function Stars({ rating = 0 }) {
  const full = "★".repeat(rating || 0);
  const empty = "☆".repeat(Math.max(0, 5 - (rating || 0)));
  return (
    <span className="review-rating" aria-label={`Rating: ${rating} out of 5`}>
      {full}
      {empty}
    </span>
  );
}

export default function AboutPage() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState({ type: "loading", msg: "" });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const all = await api.getTestimonials();
        if (cancelled) return;

        if (!Array.isArray(all) || all.length === 0) {
          setStatus({ type: "empty", msg: "No reviews found. Check your db.json." });
          setReviews([]);
          return;
        }

        const count = Math.min(all.length, 2 + Math.floor(Math.random() * 2)); // 2 or 3
        setReviews(getRandomSubset(all, count));
        setStatus({ type: "ready", msg: "" });
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setStatus({
          type: "error",
          msg: "There was a problem loading reviews. Check json-server and try again.",
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const statusText = useMemo(() => {
    if (status.type === "loading") return "";
    if (status.type === "empty") return status.msg;
    if (status.type === "error") return status.msg;
    return "";
  }, [status]);

  return (
    <>
      <section id="about" aria-labelledby="about-heading">
        <h2 id="about-heading">About Moonlight Pizza Co.</h2>

        <div className="about-layout">
          <div className="about-text">
            <p className="about-tagline">Neighborhood favorite • Wood-fired crust • Late-night slices</p>

            <p>
              Welcome to <strong>Moonlight Pizza Co.</strong>, a fictional neighborhood pizza spot
              created to help you learn HTML and CSS. We may not exist in real life, but your code does!
            </p>

            <p>
              Our “story” is simple: crispy crust, fresh toppings, and a menu that’s easy to read for
              both humans and browsers. This page is a mini demo of how you can combine semantic
              structure with clean design to introduce a business.
            </p>
          </div>

          <aside className="about-hours" aria-label="Restaurant hours">
            <h3>Hours</h3>
            <dl className="hours-list">
              <div className="hours-row">
                <dt>Mon – Thu</dt>
                <dd>11:00 AM – 9:00 PM</dd>
              </div>
              <div className="hours-row">
                <dt>Fri – Sat</dt>
                <dd>11:00 AM – 11:00 PM</dd>
              </div>
              <div className="hours-row">
                <dt>Sun</dt>
                <dd>12:00 PM – 8:00 PM</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="about-reviews" aria-labelledby="reviews-heading">
        <h3 id="reviews-heading">What Our Guests Say</h3>

        {statusText ? <p>{statusText}</p> : null}

        <div id="reviews-list" className="reviews-list" aria-live="polite">
          {reviews.map((t) => (
            <article className="review-card" key={t.id ?? `${t.name}-${t.quote}`}>
              <p className="review-quote">“{t.quote}”</p>
              <p className="review-meta">
                <span className="review-name">— {t.name}</span>
                <Stars rating={t.rating || 0} />
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
