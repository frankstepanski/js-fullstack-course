// src/__tests__/strings.test.js
//
// Unit tests for the string utility functions.
//
// Notice how each describe block focuses on ONE function,
// and each it() block tests ONE specific behaviour of that function.
// This keeps failures easy to locate and understand.

import { describe, it, expect } from "vitest";
import { formatName, truncate, isValidEmail, slugToTitle } from "../utils/strings.js";

// ─────────────────────────────────────────────
// formatName
// ─────────────────────────────────────────────
describe("formatName()", () => {
  it("capitalises both first and last name", () => {
    expect(formatName("alice", "smith")).toBe("Alice Smith");
  });

  it("normalises all-caps input", () => {
    expect(formatName("ALICE", "SMITH")).toBe("Alice Smith");
  });

  it("trims extra whitespace from both names", () => {
    expect(formatName("  alice  ", "  smith  ")).toBe("Alice Smith");
  });

  it("works with only a first name provided", () => {
    expect(formatName("alice", "")).toBe("Alice");
  });

  it("returns an empty string when both names are empty", () => {
    expect(formatName("", "")).toBe("");
  });
});

// ─────────────────────────────────────────────
// truncate
// ─────────────────────────────────────────────
describe("truncate()", () => {
  it("truncates text longer than the max length", () => {
    expect(truncate("Hello world", 5)).toBe("Hello...");
  });

  it("returns the original text when it fits within the max length", () => {
    expect(truncate("Hi", 10)).toBe("Hi");
  });

  it("returns the original text when it is exactly the max length", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });

  it("returns an empty string for non-string input", () => {
    expect(truncate(12345, 3)).toBe("");
    expect(truncate(null, 3)).toBe("");
  });
});

// ─────────────────────────────────────────────
// isValidEmail
// ─────────────────────────────────────────────
describe("isValidEmail()", () => {
  it("returns true for a standard valid email", () => {
    expect(isValidEmail("alice@example.com")).toBe(true);
  });

  it("returns true for an email with subdomains and plus addressing", () => {
    expect(isValidEmail("user.name+tag@mail.domain.co.uk")).toBe(true);
  });

  it("returns false when there is no @ symbol", () => {
    expect(isValidEmail("notanemail")).toBe(false);
  });

  it("returns false when there is no domain after @", () => {
    expect(isValidEmail("alice@")).toBe(false);
  });

  it("returns false when the email contains spaces", () => {
    expect(isValidEmail("alice @example.com")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("returns false for non-string input", () => {
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(123)).toBe(false);
  });
});

// ─────────────────────────────────────────────
// slugToTitle
// ─────────────────────────────────────────────
describe("slugToTitle()", () => {
  it("converts a two-word slug to a title", () => {
    expect(slugToTitle("hello-world")).toBe("Hello World");
  });

  it("handles a single word slug", () => {
    expect(slugToTitle("keyboard")).toBe("Keyboard");
  });

  it("handles a long multi-word slug", () => {
    expect(slugToTitle("my-amazing-product-name")).toBe("My Amazing Product Name");
  });

  it("returns an empty string for an empty slug", () => {
    expect(slugToTitle("")).toBe("");
  });

  it("returns an empty string for non-string input", () => {
    expect(slugToTitle(null)).toBe("");
    expect(slugToTitle(42)).toBe("");
  });
});
