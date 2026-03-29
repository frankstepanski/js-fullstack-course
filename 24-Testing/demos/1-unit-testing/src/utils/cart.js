// src/utils/cart.js
//
// Shopping cart utility functions.
//
// These are PURE FUNCTIONS — they take inputs and return outputs
// without changing anything outside themselves.
//
// Pure functions are the easiest things to unit test because:
//   ✓ Same input always gives the same output
//   ✓ No side effects to worry about
//   ✓ No setup or teardown needed in tests

/**
 * Calculates the total price of all items in the cart.
 *
 * @param {Array} items - Each item must have { price: number, quantity: number }
 * @returns {number} Total price rounded to 2 decimal places
 *
 * @example
 * calculateTotal([{ price: 10, quantity: 2 }, { price: 5, quantity: 1 }])
 * // returns 25
 */
export function calculateTotal(items) {
  // Guard: return 0 for empty or invalid input
  if (!Array.isArray(items) || items.length === 0) return 0;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Round to 2 decimal places to avoid floating point issues
  // e.g. 0.1 + 0.2 = 0.30000000000000004 in JavaScript without this
  return Math.round(total * 100) / 100;
}

/**
 * Applies a percentage discount to a price.
 *
 * @param {number} price - The original price
 * @param {number} discountPercent - The discount percentage (0–100)
 * @returns {number} The discounted price rounded to 2 decimal places
 *
 * @example
 * applyDiscount(100, 20) // returns 80
 * applyDiscount(50, 10)  // returns 45
 */
export function applyDiscount(price, discountPercent) {
  if (price < 0) return 0;
  if (discountPercent < 0) discountPercent = 0;
  if (discountPercent > 100) discountPercent = 100;

  const discounted = price - (price * discountPercent) / 100;
  return Math.round(discounted * 100) / 100;
}

/**
 * Formats a number as a currency string.
 *
 * @param {number} amount - The amount to format
 * @param {string} [currency="$"] - The currency symbol
 * @returns {string} e.g. "$9.99"
 *
 * @example
 * formatCurrency(9.5)       // "$9.50"
 * formatCurrency(9.5, "£")  // "£9.50"
 */
export function formatCurrency(amount, currency = "$") {
  if (typeof amount !== "number" || isNaN(amount)) return `${currency}0.00`;
  return `${currency}${amount.toFixed(2)}`;
}

/**
 * Counts the total number of individual items in the cart
 * (accounts for quantity — 2× keyboard = 2 items).
 *
 * @param {Array} items - Each item must have { quantity: number }
 * @returns {number} Total item count
 *
 * @example
 * countItems([{ quantity: 2 }, { quantity: 3 }]) // returns 5
 */
export function countItems(items) {
  if (!Array.isArray(items) || items.length === 0) return 0;
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Returns true if the cart has no items.
 *
 * @param {Array} items
 * @returns {boolean}
 */
export function isCartEmpty(items) {
  return !Array.isArray(items) || items.length === 0;
}

/**
 * Removes an item from the cart by its id.
 * Returns a NEW array — does not mutate the original.
 *
 * @param {Array} items - Current cart items
 * @param {string|number} id - The id of the item to remove
 * @returns {Array} New array without the removed item
 *
 * @example
 * removeItem([{ id: 1, name: "Keyboard" }, { id: 2, name: "Mouse" }], 1)
 * // returns [{ id: 2, name: "Mouse" }]
 */
export function removeItem(items, id) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => item.id !== id);
}
