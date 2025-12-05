// specials.js
// Moonlight Pizza Co. – Daily Specials (dynamic)
// - Fetches specials from json-server (/specials)
// - Renders cards into .specials-grid

const API_BASE_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const statusEl = document.querySelector("#specials-status");
  const listEl = document.querySelector("#specials-list");

  if (!statusEl || !listEl) return;

  init();

  async function init() {
    try {
      statusEl.textContent = "Loading specials…";

      const specials = await loadSpecials();
      renderSpecials(specials);

      statusEl.textContent = ""; // clear status once loaded
    } catch (err) {
      console.error(err);
      statusEl.textContent =
        "There was a problem loading specials. Check json-server and try again.";
    }
  }

  async function loadSpecials() {
    const res = await fetch(`${API_BASE_URL}/specials`);
    if (!res.ok) {
      throw new Error("Failed to load specials");
    }
    return res.json();
  }

  function renderSpecials(specials) {
    listEl.innerHTML = "";

    if (!specials.length) {
      listEl.innerHTML =
        "<p>No specials found. Check your db.json.</p>";
      return;
    }

    specials.forEach((special) => {
      const article = document.createElement("article");
      article.className = "special-card";

      article.innerHTML = `
        <p class="special-day">${special.dayLabel}</p>
        <h3>${special.title}</h3>
        <p class="special-text">
          ${special.descriptionHtml}
        </p>
        <p class="special-tag">${special.tagline}</p>
      `;

      listEl.appendChild(article);
    });
  }
});
