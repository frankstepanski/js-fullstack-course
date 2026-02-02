const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function fetchJson(path, options) {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }
  // json-server sometimes returns empty string for some endpoints; be defensive
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;
  return res.json();
}

export const api = {
  getPizzas: () => fetchJson("/pizzas"),
  getSpecials: () => fetchJson("/specials"),
  getContactCards: () => fetchJson("/contactCards"),
  getTestimonials: () => fetchJson("/testimonials"),
  getCart: () => fetchJson("/cart/1"),
  putCart: (cart) =>
    fetchJson("/cart/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    }),
  postOrder: (order) =>
    fetchJson("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }),
};

export { API_BASE_URL };
