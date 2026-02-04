// contact.js
// Moonlight Pizza Co. – Contact page (dynamic)
// - Fetches contactCards from json-server (/contactCards)
// - Renders "Visit Us" + "Get in Touch" cards into .contact-layout

const API_BASE_URL = "http://localhost:3001";

document.addEventListener("DOMContentLoaded", () => {
  const statusEl = document.querySelector("#contact-status");
  const cardsContainer = document.querySelector("#contact-cards");

  if (!statusEl || !cardsContainer) return;

  init();

  async function init() {
    try {
      statusEl.textContent = "Loading contact details…";

      const cards = await loadContactCards();
      renderContactCards(cards);

      statusEl.textContent = ""; // clear on success
    } catch (err) {
      console.error(err);
      statusEl.textContent =
        "There was a problem loading contact details. Check json-server and try again.";
    }
  }

  async function loadContactCards() {
    const res = await fetch(`${API_BASE_URL}/contactCards`);
    if (!res.ok) {
      throw new Error("Failed to load contactCards");
    }
    return res.json();
  }

  function renderContactCards(cards) {
    cardsContainer.innerHTML = "";

    if (!cards.length) {
      cardsContainer.innerHTML =
        "<p>No contact information found. Check your db.json.</p>";
      return;
    }

    cards.forEach((card) => {
      if (card.type === "visit") {
        cardsContainer.appendChild(renderVisitCard(card));
      } else if (card.type === "info") {
        cardsContainer.appendChild(renderInfoCard(card));
      } else {
        // fallback: just dump title + paragraphs if type is unknown
        cardsContainer.appendChild(renderGenericCard(card));
      }
    });
  }

  function renderVisitCard(card) {
    const div = document.createElement("div");
    div.className = "contact-card";

    const addressHtml = `
      <p>
        <strong>Address:</strong><br />
        ${card.addressLines.map((line) => escapeHtml(line)).join("<br />")}
      </p>
      <p>
        <strong>Phone:</strong><br />
        <a href="${card.phoneHref}">${escapeHtml(card.phoneDisplay)}</a>
      </p>
      <p>
        <strong>Email:</strong><br />
        <a href="${card.emailHref}">${escapeHtml(card.emailDisplay)}</a>
      </p>
    `;

    div.innerHTML = `
      <h3>${escapeHtml(card.title)}</h3>
      <address>
        ${addressHtml}
      </address>
    `;

    return div;
  }

  function renderInfoCard(card) {
    const div = document.createElement("div");
    div.className = "contact-card";

    const paragraphsHtml = (card.paragraphs || [])
      .map((text) => `<p>${escapeHtml(text)}</p>`)
      .join("");

    const actionsHtml = (card.actions || [])
      .map((action) => {
        const extraClass =
          action.kind === "secondary" ? " contact-button-secondary" : "";
        return `
          <a
            class="contact-button${extraClass}"
            href="${action.href}"
          >
            ${escapeHtml(action.label)}
          </a>
        `;
      })
      .join("");

    div.innerHTML = `
      <h3>${escapeHtml(card.title)}</h3>
      ${paragraphsHtml}
      <div class="contact-actions">
        ${actionsHtml}
      </div>
    `;

    return div;
  }

  function renderGenericCard(card) {
    const div = document.createElement("div");
    div.className = "contact-card";

    const paragraphsHtml = (card.paragraphs || [])
      .map((text) => `<p>${escapeHtml(text)}</p>`)
      .join("");

    div.innerHTML = `
      <h3>${escapeHtml(card.title || "Contact")}</h3>
      ${paragraphsHtml}
    `;

    return div;
  }

  // Very simple HTML escaping helper for safety
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
});
