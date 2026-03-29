// src/components/CartSummary.jsx
//
// Displays a summary of the shopping cart:
//   - Total item count
//   - Subtotal
//   - Discounted total (if a discount is applied)
//   - A "Checkout" button (disabled when cart is empty)
//
// Props:
//   items          — array of cart items
//   discountPercent — number 0–100 (optional, defaults to 0)

import { calculateTotal, countItems, applyDiscount, formatCurrency, isCartEmpty } from "../utils/cart.js";

export function CartSummary({ items, discountPercent = 0 }) {
  const empty = isCartEmpty(items);
  const itemCount = countItems(items);
  const subtotal = calculateTotal(items);
  const total = applyDiscount(subtotal, discountPercent);
  const hasDiscount = discountPercent > 0;

  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>

      {/* Item count — e.g. "3 items in your cart" */}
      <p className="cart-summary-count">
        {empty ? "Your cart is empty" : `${itemCount} item${itemCount !== 1 ? "s" : ""} in your cart`}
      </p>

      {/* Subtotal */}
      <p className="cart-summary-subtotal">
        Subtotal: <span>{formatCurrency(subtotal)}</span>
      </p>

      {/* Only show discount row when a discount is applied */}
      {hasDiscount && (
        <p className="cart-summary-discount" role="status">
          Discount ({discountPercent}% off): <span>{formatCurrency(total)}</span>
        </p>
      )}

      {/* Total */}
      <p className="cart-summary-total">
        Total: <strong>{formatCurrency(total)}</strong>
      </p>

      {/* Checkout button — disabled when the cart is empty */}
      <button disabled={empty} className="checkout-btn">
        {empty ? "Add items to checkout" : "Proceed to Checkout"}
      </button>
    </div>
  );
}
