import React, { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function MenuPage() {
  const [status, setStatus] = useState("Loading menu…");
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await api.getPizzas();
        if (cancelled) return;

        setPizzas(Array.isArray(data) ? data : []);
        setStatus("Here are some of our “famous” (pretend) pizzas:");
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setStatus("There was a problem loading the menu. Check json-server and try again.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <h2 id="menu-heading">Our Pizzas</h2>

      <p id="menu-status">{status}</p>

      <div className="menu-columns" id="menu-list">
        {!pizzas.length ? (
          status.startsWith("There was") ? null : <p>No pizzas found. Check your db.json / json-server setup.</p>
        ) : (
          pizzas.map((pizza) => {
            const headingId = `pizza-${pizza.id}-heading`;
            const imgSrc = (pizza.imageSrc || "").replace(/^\.\.\/images\//, "/images/").replace(/^\.\/images\//, "/images/");
            const imgAlt = pizza.imageAlt || `${pizza.name} pizza`;
            const imgCaption = pizza.imageCaption || "";

            return (
              <article aria-labelledby={headingId} key={pizza.id}>
                <h3 id={headingId}>{pizza.name}</h3>

                <div className="menu-card-content">
                  <figure>
                    <img src={imgSrc} width="150" alt={imgAlt} />
                    {imgCaption ? <figcaption>{imgCaption}</figcaption> : null}
                  </figure>

                  <div className="menu-card-text">
                    <p>{pizza.description}</p>
                    <p>
                      <strong>Price:</strong> ${pizza.prices.medium.toFixed(2)} (Medium) / $
                      {pizza.prices.large.toFixed(2)} (Large)
                    </p>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
