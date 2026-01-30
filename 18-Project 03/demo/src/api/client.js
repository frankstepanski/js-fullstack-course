/**
 * Small API wrapper to keep code DRY.
 * Instead of repeating fetch() logic everywhere, pages call these functions.
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, options) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status} on ${path}: ${text}`);
  }

  return res.status === 204 ? null : res.json();
}

export const api = {
  getPizzas: () => request("/pizzas"),
  getSpecials: () => request("/specials"),
  getContactCards: () => request("/contactCards"),
  getTestimonials: () => request("/testimonials"),

  getCart: () => request("/cart/1"),
  saveCart: (payload) =>
    request("/cart/1", { method: "PUT", body: JSON.stringify(payload) }),

  createOrder: (payload) =>
    request("/orders", { method: "POST", body: JSON.stringify(payload) }),
};
