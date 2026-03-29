// src/__tests__/CartSummary.test.jsx
//
// Component tests for the CartSummary component.
//
// This component has several states to test:
//   - Empty cart
//   - Cart with items
//   - Cart with items and a discount applied
//
// Testing all three states ensures no scenario is left uncovered.

import { CartSummary } from "../components/CartSummary.jsx";
import { render, screen, within } from "@testing-library/react";

// Sample items for tests that need a non-empty cart
const sampleItems = [
  { id: 1, name: "Keyboard", price: 79.99, quantity: 1 },
  { id: 2, name: "Mouse",    price: 39.99, quantity: 2 }, // 2 × 39.99 = 79.98
];
// subtotal = 79.99 + 79.98 = 159.97

describe("CartSummary", () => {
  // ─── Empty cart state ─────────────────────────

  describe("when the cart is empty", () => {
    it("shows an empty cart message", () => {
      render(<CartSummary items={[]} />);
      expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });

    it("shows a $0.00 subtotal", () => {
      render(<CartSummary items={[]} />);
      const subtotalRow = screen.getByText(/Subtotal/).closest("p");
      expect(within(subtotalRow).getByText("$0.00")).toBeInTheDocument();
});

    it("renders the checkout button as disabled", () => {
      render(<CartSummary items={[]} />);
      // toBeDisabled() checks the disabled attribute
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  // ─── Non-empty cart state ─────────────────────

  describe("when the cart has items", () => {
    it("shows the correct item count", () => {
      render(<CartSummary items={sampleItems} />);
      // 1 keyboard + 2 mice = 3 items
      expect(screen.getByText("3 items in your cart")).toBeInTheDocument();
    });

   it("shows the correct subtotal", () => {
     render(<CartSummary items={sampleItems} />);
     const subtotalRow = screen.getByText(/Subtotal/).closest("p");
     expect(within(subtotalRow).getByText("$159.97")).toBeInTheDocument();
   });

    it("renders the checkout button as enabled", () => {
      render(<CartSummary items={sampleItems} />);
      expect(screen.getByRole("button", { name: /checkout/i })).toBeEnabled();
    });

    it("shows singular 'item' when there is exactly 1 item", () => {
      const oneItem = [{ id: 1, name: "Keyboard", price: 79.99, quantity: 1 }];
      render(<CartSummary items={oneItem} />);
      expect(screen.getByText("1 item in your cart")).toBeInTheDocument();
    });
  });

  // ─── Discount applied state ───────────────────

  describe("when a discount is applied", () => {
    it("shows the discount row", () => {
      render(<CartSummary items={sampleItems} discountPercent={10} />);
      // role="status" is on the discount row
      expect(screen.getByRole("status")).toBeInTheDocument();
      expect(screen.getByText(/10% off/)).toBeInTheDocument();
    });

   it("shows the discounted total", () => {
     render(<CartSummary items={sampleItems} discountPercent={10} />);
     const totalRow = screen.getByText(/^Total:/).closest("p");
     expect(within(totalRow).getByText("$143.97")).toBeInTheDocument();
   });

    it("does not show the discount row when discount is 0", () => {
      render(<CartSummary items={sampleItems} discountPercent={0} />);
      // queryByRole returns null if not found — use this when asserting absence
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });
});
