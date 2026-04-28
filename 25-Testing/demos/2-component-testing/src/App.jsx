// src/App.jsx
//
// The main application component.
// Wires together CartItem, CartSummary, and DiscountForm
// so you can see them all working in the browser.
//
// Run "npm run dev" to open the app in your browser.
// The components here are the same ones tested in src/__tests__/

import { useState } from "react";
import { CartItem } from "./components/CartItem.jsx";
import { CartSummary } from "./components/CartSummary.jsx";
import { DiscountForm } from "./components/DiscountForm.jsx";

// Starting items in the cart so the app has something to show
const initialItems = [
  { id: 1, name: "Mechanical Keyboard", price: 79.99, quantity: 1 },
  { id: 2, name: "Wireless Mouse",      price: 39.99, quantity: 2 },
  { id: 3, name: "USB-C Hub",           price: 29.99, quantity: 1 },
];

export default function App() {
  const [items, setItems]                   = useState(initialItems);
  const [discountPercent, setDiscountPercent] = useState(0);

  // Remove an item from the cart by its id
  function handleRemove(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  // Apply a discount percentage from the DiscountForm
  function handleApplyDiscount(percent) {
    setDiscountPercent(percent);
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Shopping Cart Demo</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        This app demonstrates the components tested in <code>src/__tests__/</code>.
        Try removing items and applying discount codes (SAVE10 or SAVE20).
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "2rem" }}>

        {/* Left — cart items */}
        <div>
          <h2>Cart Items</h2>
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {items.map((item) => (
                <CartItem key={item.id} item={item} onRemove={handleRemove} />
              ))}
            </ul>
          )}

          {/* Discount code form */}
          <div style={{ marginTop: "1.5rem" }}>
            <DiscountForm onApply={handleApplyDiscount} />
          </div>
        </div>

        {/* Right — cart summary */}
        <div>
          <CartSummary items={items} discountPercent={discountPercent} />
        </div>

      </div>
    </div>
  );
}
