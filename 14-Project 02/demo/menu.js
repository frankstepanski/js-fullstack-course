// menu.js
// Dynamic menu page
// - Fetches pizzas from json-server (/pizzas)
// - Renders cards using fields stored in db.json

const API_BASE_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const statusEl = document.getElementById("menu-status");
  const listEl = document.getElementById("menu-list");

  if (!statusEl || !listEl) return;

  init();

  async function init() {
    try {
      statusEl.textContent = "Loading menu…";

      const pizzas = await loadPizzas();
      renderPizzas(pizzas);

      statusEl.textContent = "Here are some of our “famous” (pretend) pizzas:";
    } catch (err) {
      console.error(err);
      statusEl.textContent =
        "There was a problem loading the menu. Check json-server and try again.";
    }
  }

  async function loadPizzas() {
    const res = await fetch(`${API_BASE_URL}/pizzas`);
    if (!res.ok) throw new Error("Failed to load pizzas");
    return res.json();
  }

  function renderPizzas(pizzas) {
    listEl.innerHTML = "";

    if (!pizzas.length) {
      listEl.innerHTML =
        "<p>No pizzas found. Check your db.json / json-server setup.</p>";
      return;
    }

    pizzas.forEach((pizza) => {
      const article = document.createElement("article");
      const headingId = `pizza-${pizza.id}-heading`;

      const imgSrc = pizza.imageSrc || "images/pizza-placeholder.png";
      const imgAlt = pizza.imageAlt || `${pizza.name} pizza`;
      const imgCaption = pizza.imageCaption || "";

      article.setAttribute("aria-labelledby", headingId);

      article.innerHTML = `
        <h3 id="${headingId}">${pizza.name}</h3>

        <div class="menu-card-content">
          <figure>
            <img
              src="${imgSrc}"
              width="150"
              alt="${imgAlt}"
            />
            ${imgCaption ? `<figcaption>${imgCaption}</figcaption>` : ""}
          </figure>

          <div class="menu-card-text">
            <p>${pizza.description}</p>
            <p>
              <strong>Price:</strong>
              $${pizza.prices.medium.toFixed(2)} (Medium) /
              $${pizza.prices.large.toFixed(2)} (Large)
            </p>
          </div>
        </div>
      `;

      listEl.appendChild(article);
    });
  }
});
