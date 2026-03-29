// src/components/CartPage.jsx
//
// The main cart page — combines ProductList with a cart sidebar.
// This component ties everything together and is the main subject
// of the integration tests.
//
// Flow:
//   1. ProductList fetches and displays products
//   2. User clicks "Add to Cart" on a product
//   3. The product is POST'd to /api/cart
//   4. On success, it appears in the cart sidebar
//   5. User can remove items from the cart
//
// Integration tests verify this entire flow end-to-end within the component.

import { useState } from "react";
import { ProductList } from "./ProductList.jsx";
import { calculateTotal, countItems, formatCurrency } from "../utils/cart.js";

export function CartPage() {
  const [cartItems, setCartItems]   = useState([]);
  const [cartError, setCartError]   = useState(null);
  const [addingId, setAddingId]     = useState(null); // tracks which item is being added

  // Called when the user clicks "Add to Cart" on a product
  async function handleAddToCart(product) {
    setAddingId(product.id);
    setCartError(null);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, name: product.name, price: product.price, quantity: 1 }),
      });

      if (!res.ok) throw new Error("Failed to add item");

      // Add to local cart state on success
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          // Increase quantity if already in cart
          return prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
      });
    } catch {
      setCartError("Could not add item to cart. Please try again.");
    } finally {
      setAddingId(null);
    }
  }

  // Called when the user clicks "Remove" on a cart item
  async function handleRemove(itemId) {
    try {
      await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
      setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    } catch {
      setCartError("Could not remove item. Please try again.");
    }
  }

  const isEmpty     = cartItems.length === 0;
  const itemCount   = countItems(cartItems);
  const total       = calculateTotal(cartItems);

  return (
    <div className="cart-page">

      {/* ── Product list (left side) ─────────────────────────── */}
      <section className="products-section">
        <h2>Products</h2>
        <ProductList onAddToCart={handleAddToCart} />
      </section>

      {/* ── Cart sidebar (right side) ────────────────────────── */}
      <aside className="cart-sidebar">
        <h2>Your Cart</h2>

        {/* Cart error message */}
        {cartError && (
          <p role="alert" className="cart-error">
            {cartError}
          </p>
        )}

        {isEmpty ? (
          <p className="cart-empty">No items in your cart yet.</p>
        ) : (
          <>
            <p className="cart-count">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </p>

            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <span>{item.name}</span>
                  <span>× {item.quantity}</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                  <button onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <p className="cart-total">
              Total: <strong>{formatCurrency(total)}</strong>
            </p>
          </>
        )}
      </aside>

    </div>
  );
}
