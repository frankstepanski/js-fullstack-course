// src/utils/cart.js
//
// The same cart utility functions from Project 01.
// In this project they power the React components below.
// The unit tests from Project 01 still apply to these functions —
// here we add component tests on top.

export function calculateTotal(items) {
  if (!Array.isArray(items) || items.length === 0) return 0;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return Math.round(total * 100) / 100;
}

export function applyDiscount(price, discountPercent) {
  if (price < 0) return 0;
  if (discountPercent < 0) discountPercent = 0;
  if (discountPercent > 100) discountPercent = 100;
  const discounted = price - (price * discountPercent) / 100;
  return Math.round(discounted * 100) / 100;
}

export function formatCurrency(amount, currency = "$") {
  if (typeof amount !== "number" || isNaN(amount)) return `${currency}0.00`;
  return `${currency}${amount.toFixed(2)}`;
}

export function countItems(items) {
  if (!Array.isArray(items) || items.length === 0) return 0;
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function isCartEmpty(items) {
  return !Array.isArray(items) || items.length === 0;
}

export function removeItem(items, id) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => item.id !== id);
}
