// src/utils/strings.js
//
// String formatting utility functions.
//
// Each function does one thing. That is the key to testable code.

/**
 * Formats a full name from first and last parts,
 * capitalising each word and trimming whitespace.
 *
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string}
 *
 * @example
 * formatName("alice", "smith") // "Alice Smith"
 * formatName("ALICE", "")      // "Alice"
 */
export function formatName(firstName, lastName) {
  if (!firstName && !lastName) return "";

  const capitalize = (str) =>
    str ? str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase() : "";

  return [capitalize(firstName), capitalize(lastName)].filter(Boolean).join(" ");
}

/**
 * Truncates a string to a maximum length and adds "..." if cut.
 *
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 *
 * @example
 * truncate("Hello world", 5) // "Hello..."
 * truncate("Hi", 10)         // "Hi"
 */
export function truncate(text, maxLength) {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Returns true if the string looks like a valid email address.
 *
 * @param {string} email
 * @returns {boolean}
 *
 * @example
 * isValidEmail("alice@example.com") // true
 * isValidEmail("notanemail")        // false
 */
export function isValidEmail(email) {
  if (typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Converts a URL-style slug into a readable title.
 *
 * @param {string} slug
 * @returns {string}
 *
 * @example
 * slugToTitle("hello-world")     // "Hello World"
 * slugToTitle("my-product-name") // "My Product Name"
 */
export function slugToTitle(slug) {
  if (typeof slug !== "string" || slug.trim() === "") return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
