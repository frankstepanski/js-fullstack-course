// about.js
// Moonlight Pizza Co. – About page dynamic testimonials
// - Fetches testimonials from json-server: GET /testimonials
// - Randomly picks 2 or 3 reviews
// - Renders them into #reviews-list

const API_BASE_URL = "http://localhost:3001";

document.addEventListener("DOMContentLoaded", () => {
  const reviewsListEl = document.querySelector("#reviews-list");
  if (!reviewsListEl) return;

  loadAndRenderTestimonials();

  async function loadAndRenderTestimonials() {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials`);

      if (!res.ok) {
        throw new Error("Failed to load testimonials");
      }

      const allTestimonials = await res.json();

      if (!Array.isArray(allTestimonials) || allTestimonials.length === 0) {
        reviewsListEl.textContent = "No reviews yet. Check back soon!";
        return;
      }

      // Pick 2 or 3 random reviews
      const count = Math.min(
        allTestimonials.length,
        2 + Math.floor(Math.random() * 2) // 2 or 3
      );

      const selected = getRandomSubset(allTestimonials, count);

      renderTestimonials(selected);
    } catch (err) {
      console.error(err);
      reviewsListEl.textContent =
        "We couldn't load reviews right now. Please try again later.";
    }
  }

  // Returns a random subset of size `count` (no duplicates)
  function getRandomSubset(array, count) {
    const copy = [...array];
    // Fisher–Yates shuffle (partial is fine)
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
  }

  function renderTestimonials(testimonials) {
    reviewsListEl.innerHTML = "";

    testimonials.forEach((t) => {
      const article = document.createElement("article");
      article.className = "review-card";

      const stars = "★".repeat(t.rating || 0) + "☆".repeat(Math.max(0, 5 - (t.rating || 0)));

      article.innerHTML = `
        <p class="review-quote">“${t.quote}”</p>
        <p class="review-meta">
          <span class="review-name">— ${t.name}</span>
          <span class="review-rating" aria-label="Rating: ${t.rating} out of 5">
            ${stars}
          </span>
        </p>
      `;

      reviewsListEl.appendChild(article);
    });
  }
});
