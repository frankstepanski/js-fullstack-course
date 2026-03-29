// src/utils/cart.js
//
// The same cart utility functions carried forward from Projects 01 and 02.
// Unit tests still cover these. In this project they are used by components
// that also fetch data from an API.

export function calculateTotal(items) {
  if (!Array.isArray(items) || items.length === 0) return 0;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return Math.round(total * 100) / 100;
}

export function formatCurrency(amount, currency = "$") {
  if (typeof amount !== "number" || isNaN(amount)) return `${currency}0.00`;
  return `${currency}${amount.toFixed(2)}`;
}

export function countItems(items) {
  if (!Array.isArray(items) || items.length === 0) return 0;
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
