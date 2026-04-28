// src/test/handlers.js
//
// MSW (Mock Service Worker) request handlers.
//
// Handlers tell MSW which API requests to intercept and what to return.
// Think of them as a fake backend for your tests.
//
// Each handler defines:
//   1. The HTTP method and URL to intercept (e.g. GET /api/products)
//   2. The fake response to return
//
// These are the DEFAULT handlers — they return the happy path (success).
// Individual tests can override these to return errors or empty data.

import { http, HttpResponse } from "msw";

// Sample products our fake API returns by default
export const defaultProducts = [
  { id: 1, name: "Mechanical Keyboard", price: 79.99, inStock: true },
  { id: 2, name: "Wireless Mouse",      price: 39.99, inStock: true },
  { id: 3, name: "USB-C Hub",           price: 29.99, inStock: false },
];

export const handlers = [
  // GET /api/products — returns the list of products
  http.get("/api/products", () => {
    return HttpResponse.json(defaultProducts);
  }),

  // POST /api/cart — simulates adding an item to the cart
  // Returns the added item so the UI can confirm it was saved
  http.post("/api/cart", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ success: true, item: body }, { status: 201 });
  }),

  // DELETE /api/cart/:id — simulates removing an item from the cart
  http.delete("/api/cart/:id", ({ params }) => {
    return HttpResponse.json({ success: true, removedId: Number(params.id) });
  }),
];
