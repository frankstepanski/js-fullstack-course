// src/__tests__/CartPage.test.jsx
//
// Integration tests for the CartPage component.
//
// CartPage combines ProductList + the cart sidebar and coordinates
// API calls for adding and removing items. These tests verify the
// FULL FLOW — from clicking "Add to Cart" through the API call to
// seeing the item appear in the cart.
//
// This is integration testing at its most useful — testing multiple
// components and API interactions working together as a unit.

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../test/server.js";
import { CartPage } from "../components/CartPage.jsx";

describe("CartPage", () => {

  // ─── Initial state ────────────────────────────────────────
  it("shows an empty cart message on first load", async () => {
    render(<CartPage />);

    // Wait for products to load so we know the page is ready
    await screen.findByText("Mechanical Keyboard");

    expect(screen.getByText("No items in your cart yet.")).toBeInTheDocument();
  });

  // ─── Add to cart flow ─────────────────────────────────────
  it("adds a product to the cart when Add to Cart is clicked", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    await screen.findByText("Mechanical Keyboard");

    // Click the first Add to Cart button
    const addButtons = screen.getAllByRole("button", { name: "Add to Cart" });
    await user.click(addButtons[0]);

    // The item should now appear in the cart sidebar
    // findBy* waits for the async POST to complete and state to update
    expect(await screen.findByText("1 item")).toBeInTheDocument();
  });

  it("shows the product name in the cart after adding it", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    await screen.findByText("Mechanical Keyboard");

    const addButtons = screen.getAllByRole("button", { name: "Add to Cart" });
    await user.click(addButtons[0]);

    // The cart sidebar should show the product name
    // There will be TWO elements with "Mechanical Keyboard" — one in the
    // product list and one in the cart. getAllByText handles multiple matches.
    const matches = await screen.findAllByText("Mechanical Keyboard");
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });

  it("shows the correct cart total after adding a product", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    await screen.findByText("Mechanical Keyboard");

    const addButtons = screen.getAllByRole("button", { name: "Add to Cart" });
    await user.click(addButtons[0]);

    const cartSidebar = await screen.findByRole("complementary");
    const totalRow = within(cartSidebar).getByText(/^Total:/).closest("p");
    expect(within(totalRow).getByText("$79.99")).toBeInTheDocument();
  });

  it("increases the quantity when the same product is added twice", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    await screen.findByText("Mechanical Keyboard");

    const addButtons = screen.getAllByRole("button", { name: "Add to Cart" });
    await user.click(addButtons[0]);
    await user.click(addButtons[0]);

    // Should show "2 items" after adding twice
    expect(await screen.findByText("2 items")).toBeInTheDocument();
  });

  // ─── Remove from cart flow ────────────────────────────────
  it("removes a product from the cart when Remove is clicked", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    await screen.findByText("Mechanical Keyboard");

    // Add a product first
    const addButtons = screen.getAllByRole("button", { name: "Add to Cart" });
    await user.click(addButtons[0]);

    // Wait for it to appear in the cart
    await screen.findByText("1 item");

    // Now remove it
    await user.click(screen.getByRole("button", { name: "Remove" }));

    // Cart should be empty again
    expect(await screen.findByText("No items in your cart yet.")).toBeInTheDocument();
  });

  // ─── API error on add ─────────────────────────────────────
  it("shows an error message when adding to cart fails", async () => {
    // Override the POST /api/cart handler to return an error
    server.use(
      http.post("/api/cart", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const user = userEvent.setup();
    render(<CartPage />);

    await screen.findByText("Mechanical Keyboard");

    const addButtons = screen.getAllByRole("button", { name: "Add to Cart" });
    await user.click(addButtons[0]);

    // The error alert should appear
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Could not add item to cart");
  });

  // ─── Product list error ───────────────────────────────────
  it("shows a product load error when the products API fails", async () => {
    server.use(
      http.get("/api/products", () => {
        return new HttpResponse(null, { status: 503 });
      })
    );

    render(<CartPage />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Something went wrong");
  });
});
