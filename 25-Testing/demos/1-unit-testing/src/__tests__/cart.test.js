// src/__tests__/cart.test.js
//
// Unit tests for the shopping cart utilities.
//
// PATTERN USED THROUGHOUT — Arrange / Act / Assert:
//
//   Arrange  →  set up the input data
//   Act      →  call the function
//   Assert   →  check the result with expect()
//
// Each test covers ONE specific behaviour.
// The test name tells you exactly what broke when it fails.

import { describe, it, expect } from "vitest";
import {
  calculateTotal,
  applyDiscount,
  formatCurrency,
  countItems,
  isCartEmpty,
  removeItem,
} from "../utils/cart.js";

// ─────────────────────────────────────────────
// calculateTotal
// ─────────────────────────────────────────────
describe("calculateTotal()", () => {
  it("returns the correct total for a single item", () => {
    // Arrange
    const items = [{ price: 10, quantity: 2 }];
    // Act
    const result = calculateTotal(items);
    // Assert
    expect(result).toBe(20);
  });

  it("returns the correct total for multiple items", () => {
    const items = [
      { price: 10, quantity: 2 }, // 20
      { price: 5,  quantity: 3 }, // 15
      { price: 1,  quantity: 1 }, //  1
    ];
    expect(calculateTotal(items)).toBe(36);
  });

  it("rounds to 2 decimal places to avoid floating point errors", () => {
    // 0.1 * 3 in JavaScript = 0.30000000000000004 without rounding
    const items = [{ price: 0.1, quantity: 3 }];
    expect(calculateTotal(items)).toBe(0.3);
  });

  it("returns 0 for an empty array", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("returns 0 for null", () => {
    expect(calculateTotal(null)).toBe(0);
  });

  it("returns 0 for undefined", () => {
    expect(calculateTotal(undefined)).toBe(0);
  });
});

// ─────────────────────────────────────────────
// applyDiscount
// ─────────────────────────────────────────────
describe("applyDiscount()", () => {
  it("applies a 20% discount correctly", () => {
    expect(applyDiscount(100, 20)).toBe(80);
  });

  it("applies a 10% discount correctly", () => {
    expect(applyDiscount(50, 10)).toBe(45);
  });

  it("returns 0 for a 100% discount", () => {
    expect(applyDiscount(100, 100)).toBe(0);
  });

  it("returns the original price for a 0% discount", () => {
    expect(applyDiscount(100, 0)).toBe(100);
  });

  it("clamps a discount above 100% to 100%", () => {
    // Prevents negative prices
    expect(applyDiscount(100, 150)).toBe(0);
  });

  it("returns 0 for a negative price", () => {
    expect(applyDiscount(-50, 10)).toBe(0);
  });

  it("handles decimal results correctly", () => {
    expect(applyDiscount(9.99, 10)).toBe(8.99);
  });
});

// ─────────────────────────────────────────────
// formatCurrency
// ─────────────────────────────────────────────
describe("formatCurrency()", () => {
  it("formats a whole number with two decimal places", () => {
    expect(formatCurrency(10)).toBe("$10.00");
  });

  it("formats a decimal number correctly", () => {
    expect(formatCurrency(9.5)).toBe("$9.50");
  });

  it("uses $ as the default symbol", () => {
    expect(formatCurrency(5)).toBe("$5.00");
  });

  it("uses a custom currency symbol when provided", () => {
    expect(formatCurrency(5, "£")).toBe("£5.00");
    expect(formatCurrency(5, "€")).toBe("€5.00");
  });

  it("returns $0.00 for non-numeric input", () => {
    expect(formatCurrency("hello")).toBe("$0.00");
  });

  it("returns $0.00 for NaN", () => {
    expect(formatCurrency(NaN)).toBe("$0.00");
  });
});

// ─────────────────────────────────────────────
// countItems
// ─────────────────────────────────────────────
describe("countItems()", () => {
  it("sums quantities across all items", () => {
    const items = [{ quantity: 2 }, { quantity: 3 }];
    expect(countItems(items)).toBe(5);
  });

  it("returns 0 for an empty cart", () => {
    expect(countItems([])).toBe(0);
  });

  it("returns 0 for an item with quantity 0", () => {
    expect(countItems([{ quantity: 0 }])).toBe(0);
  });
});

// ─────────────────────────────────────────────
// isCartEmpty
// ─────────────────────────────────────────────
describe("isCartEmpty()", () => {
  it("returns true for an empty array", () => {
    expect(isCartEmpty([])).toBe(true);
  });

  it("returns false when the cart has items", () => {
    expect(isCartEmpty([{ id: 1 }])).toBe(false);
  });

  it("returns true for null", () => {
    expect(isCartEmpty(null)).toBe(true);
  });

  it("returns true for undefined", () => {
    expect(isCartEmpty(undefined)).toBe(true);
  });
});

// ─────────────────────────────────────────────
// removeItem
// ─────────────────────────────────────────────
describe("removeItem()", () => {
  const items = [
    { id: 1, name: "Keyboard" },
    { id: 2, name: "Mouse" },
    { id: 3, name: "Monitor" },
  ];

  it("removes the item with the matching id", () => {
    const result = removeItem(items, 2);
    expect(result).toHaveLength(2);
    expect(result.find((i) => i.id === 2)).toBeUndefined();
  });

  it("returns the full array when the id does not exist", () => {
    const result = removeItem(items, 99);
    expect(result).toHaveLength(3);
  });

  it("returns an empty array for non-array input", () => {
    expect(removeItem(null, 1)).toEqual([]);
  });

  it("does not mutate the original array", () => {
    // Pure functions must never modify their inputs
    const original = [{ id: 1, name: "Keyboard" }];
    removeItem(original, 1);
    expect(original).toHaveLength(1); // still 1 — not mutated
  });
});
