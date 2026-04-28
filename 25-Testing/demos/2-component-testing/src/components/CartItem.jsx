// src/components/CartItem.jsx
//
// Displays a single item in the shopping cart.
// Shows the item name, price per unit, quantity, and line total.
// Has a Remove button that calls the onRemove prop when clicked.
//
// Props:
//   item     — { id, name, price, quantity }
//   onRemove — function called with item.id when Remove is clicked

import { formatCurrency } from "../utils/cart.js";

export function CartItem({ item, onRemove }) {
  const lineTotal = formatCurrency(item.price * item.quantity);

  return (
    <li className="cart-item">
      {/* Item name — used in tests via getByRole("heading") or getByText */}
      <h3>{item.name}</h3>

      <div className="cart-item-details">
        {/* Unit price */}
        <span className="cart-item-price">{formatCurrency(item.price)} each</span>

        {/* Quantity badge */}
        <span className="cart-item-quantity">Qty: {item.quantity}</span>

        {/* Line total */}
        <span className="cart-item-total">{lineTotal}</span>
      </div>

      {/* Remove button — role="button" name="Remove" is how we find it in tests */}
      <button
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        Remove
      </button>
    </li>
  );
}
