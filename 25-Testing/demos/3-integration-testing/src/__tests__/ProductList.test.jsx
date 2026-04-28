// src/__tests__/ProductList.test.jsx
//
// Integration tests for the ProductList component.
//
// These tests are different from component tests — the component
// makes a real fetch() call, and MSW intercepts it and returns
// our fake data. We test all four states the component can be in:
//
//   1. Loading  — shown while the fetch is in progress
//   2. Loaded   — products appear after the fetch succeeds
//   3. Error    — error message shown when the fetch fails
//   4. Empty    — message shown when the API returns no products
//
// KEY DIFFERENCE FROM COMPONENT TESTS:
// We use findBy* instead of getBy* for elements that appear AFTER
// the fetch completes. findBy* waits for the element to appear.
// getBy* would fail immediately before the fetch finishes.

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../test/server.js";
import { ProductList } from "../components/ProductList.jsx";

describe("ProductList", () => {

  // ─── Loading state ────────────────────────────────────────
  it("shows a loading message initially", () => {
    render(<ProductList onAddToCart={() => {}} />);

    // This renders BEFORE the fetch completes — getBy* is fine here
    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  // ─── Loaded state ─────────────────────────────────────────
  it("displays products after the fetch succeeds", async () => {
    render(<ProductList onAddToCart={() => {}} />);

    // findBy* waits for the element to appear (up to 1 second by default)
    // Use this whenever you are waiting for async data to load
    expect(await screen.findByText("Mechanical Keyboard")).toBeInTheDocument();
    expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
    expect(screen.getByText("USB-C Hub")).toBeInTheDocument();
  });

  it("displays the correct price for each product", async () => {
    render(<ProductList onAddToCart={() => {}} />);

    await screen.findByText("Mechanical Keyboard"); // wait for load

    expect(screen.getByText("$79.99")).toBeInTheDocument();
    expect(screen.getByText("$39.99")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it("shows an out of stock badge for unavailable products", async () => {
    render(<ProductList onAddToCart={() => {}} />);

    await screen.findByText("Mechanical Keyboard");

    // USB-C Hub has inStock: false in our default handler
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });

  it("disables the Add to Cart button for out-of-stock items", async () => {
    render(<ProductList onAddToCart={() => {}} />);

    await screen.findByText("Mechanical Keyboard");

    // The "Out of Stock" button should be disabled
    expect(screen.getByRole("button", { name: "Out of Stock" })).toBeDisabled();
  });

  it("calls onAddToCart with the product when Add to Cart is clicked", async () => {
    const onAddToCart = vi.fn();
    const user = userEvent.setup();

    render(<ProductList onAddToCart={onAddToCart} />);

    await screen.findByText("Mechanical Keyboard");

    // Click the Add to Cart button for the first product
    const buttons = screen.getAllByRole("button", { name: "Add to Cart" });
    await user.click(buttons[0]);

    // onAddToCart should have been called with the first product object
    expect(onAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Mechanical Keyboard" })
    );
  });

  // ─── Error state ──────────────────────────────────────────
  it("shows an error message when the API returns a 500 error", async () => {
    // Override the default handler FOR THIS TEST ONLY
    // server.resetHandlers() in setup.js cleans this up after the test
    server.use(
      http.get("/api/products", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<ProductList onAddToCart={() => {}} />);

    // Wait for the error message to appear
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Something went wrong");
  });

  it("shows an error message when the network fails completely", async () => {
    server.use(
      http.get("/api/products", () => {
        // Returning no response simulates a network failure
        return HttpResponse.error();
      })
    );

    render(<ProductList onAddToCart={() => {}} />);

    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  // ─── Empty state ──────────────────────────────────────────
  it("shows an empty message when the API returns no products", async () => {
    server.use(
      http.get("/api/products", () => {
        return HttpResponse.json([]); // empty array
      })
    );

    render(<ProductList onAddToCart={() => {}} />);

    expect(await screen.findByText("No products available.")).toBeInTheDocument();
  });
});
