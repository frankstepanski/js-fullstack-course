import React, { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api.js";
import { useCart } from "../context/CartContext.jsx";

function formatMoney(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

function PizzaMenuItem({ pizza, onAdd }) {
  const [size, setSize] = useState("medium");

  return (
    <li className="pizza-card">
      <div className="pizza-card__body">
        <h3 className="pizza-card__title">{pizza.name}</h3>
        <p className="pizza-card__description">{pizza.description}</p>
        <p className="pizza-card__prices">
          <strong>Price:</strong> {formatMoney(pizza.prices.medium)} (Medium) / {formatMoney(pizza.prices.large)} (Large)
        </p>
      </div>

      <div className="pizza-card__actions">
        <label>
          Size:
          <select data-size-select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

        <button type="button" className="btn btn-primary" data-add-to-cart onClick={() => onAdd(pizza, size)}>
          Add to cart
        </button>
      </div>
    </li>
  );
}

function CartItem({ item, onQty, onRemove }) {
  return (
    <li className="cart-item">
      <div className="cart-item__info">
        <strong>{item.name}</strong>
        <span className="cart-item__size">({item.size})</span>
      </div>

      <div className="cart-item__controls">
        <label>
          Qty:
          <input
            type="number"
            min="1"
            value={item.quantity}
            data-qty-input
            onChange={(e) => onQty(item.key, e.target.value)}
          />
        </label>

        <span className="cart-item__subtotal">{formatMoney(item.subtotal)}</span>

        <button type="button" className="cart-item__remove" data-remove onClick={() => onRemove(item.key)}>
          Remove
        </button>
      </div>
    </li>
  );
}

export default function OrderPage() {
  const [menuStatus, setMenuStatus] = useState("Loading menu…");
  const [pizzas, setPizzas] = useState([]);

  const [orderStatus, setOrderStatus] = useState("");

  const { cartItems, cartTotal, addToCart, updateQuantity, removeFromCart, clearCart, placeOrder, cartStatus } = useCart();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setMenuStatus("Loading menu…");
        const data = await api.getPizzas();
        if (cancelled) return;

        setPizzas(Array.isArray(data) ? data : []);
        setMenuStatus("Pick a pizza, choose a size, and add it to your cart.");
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setMenuStatus("There was a problem loading the menu. Check json-server and try again.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const isCartEmpty = cartItems.length === 0;
  const canCheckout = useMemo(() => cartStatus !== "loading" && !isCartEmpty, [cartStatus, isCartEmpty]);

  async function handleCheckout() {
    try {
      setOrderStatus("Placing order…");
      const saved = await placeOrder();
      setOrderStatus(`Order placed! (Demo) Order #${saved?.id ?? "?"} saved to /orders.`);
    } catch (err) {
      console.error(err);
      setOrderStatus("Failed to place order. Check json-server and try again.");
    }
  }

  return (
    <section id="order" aria-labelledby="order-heading">
      <h2 id="order-heading">Order Online</h2>
      <p id="order-description">
        Build a pretend order from our menu. When you place your order, it will be saved to a local JSON API (json-server) for demo purposes.
      </p>

      <div className="order-layout">
        <section aria-label="Menu" className="order-menu">
          <h3>Menu</h3>
          <p id="menu-status">{menuStatus}</p>
          <ul id="menu-list" className="menu-list">
            {!pizzas.length ? (
              menuStatus.startsWith("There was") ? null : <li>No pizzas found. Check your db.json.</li>
            ) : (
              pizzas.map((pizza) => (
                <PizzaMenuItem key={pizza.id} pizza={pizza} onAdd={addToCart} />
              ))
            )}
          </ul>
        </section>

        <aside aria-label="Cart" className="order-cart">
          <h3>Your Cart</h3>

          <ul id="cart-list" className="cart-list">
            {isCartEmpty ? <li className="cart-empty">Your cart is empty.</li> : null}
            {!isCartEmpty ? cartItems.map((item) => (
              <CartItem key={item.key} item={item} onQty={updateQuantity} onRemove={removeFromCart} />
            )) : null}
          </ul>

          <p id="cart-total" className="cart-total">Total: {formatMoney(cartTotal)}</p>

          <div className="cart-actions">
            <button type="button" id="cart-clear" onClick={() => { clearCart(); setOrderStatus(""); }}>
              Clear Cart
            </button>
            <button type="button" id="cart-checkout" disabled={!canCheckout} onClick={handleCheckout}>
              Place Order (Demo)
            </button>
          </div>

          <p id="order-status" className="order-status" aria-live="polite">{orderStatus}</p>
        </aside>
      </div>
    </section>
  );
}
