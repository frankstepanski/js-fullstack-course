import React, { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api.js";
import { useCart } from "../context/CartContext.jsx";
import styles from "./OrderPage.module.css";

function formatMoney(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

function PizzaMenuItem({ pizza, onAdd }) {
  const [size, setSize] = useState("medium");

  return (
    <li className={styles.pizzaCard}>
      <div className={styles.pizzaCardBody}>
        <h3 className={styles.pizzaCardTitle}>{pizza.name}</h3>
        <p className={styles.pizzaCardDescription}>{pizza.description}</p>
        <p className={styles.pizzaCardPrices}>
          <strong>Price:</strong> {formatMoney(pizza.prices.medium)} (Medium) / {formatMoney(pizza.prices.large)} (Large)
        </p>
      </div>

      <div className={styles.pizzaCardActions}>
        <label>
          Size:
          <select data-size-select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

        <button
          type="button"
          className={`${styles.btn} ${styles.btnPrimary}`}
          data-add-to-cart
          onClick={() => onAdd(pizza, size)}
        >
          Add to cart
        </button>
      </div>
    </li>
  );
}

function CartItem({ item, onQty, onRemove }) {
  return (
    <li className={styles.cartItem}>
      <div className={styles.cartItemInfo}>
        <strong>{item.name}</strong>
        <span className={styles.cartItemSize}>({item.size})</span>
      </div>

      <div className={styles.cartItemControls}>
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

        <span className={styles.cartItemSubtotal}>{formatMoney(item.subtotal)}</span>

        <button
          type="button"
          className={styles.cartItemRemove}
          data-remove
          onClick={() => onRemove(item.key)}
        >
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

    return () => { cancelled = true; };
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
      <p className={styles.orderDescription}>
        Build a pretend order from our menu. When you place your order, it will be saved to a local JSON API (json-server) for demo purposes.
      </p>

      <div className={styles.orderLayout}>
        <section aria-label="Menu" className={styles.orderMenu}>
          <h3>Menu</h3>
          <p className={styles.menuStatus}>{menuStatus}</p>
          <ul id="menu-list" className={styles.menuList}>
            {!pizzas.length ? (
              menuStatus.startsWith("There was") ? null : <li>No pizzas found. Check your db.json.</li>
            ) : (
              pizzas.map((pizza) => (
                <PizzaMenuItem key={pizza.id} pizza={pizza} onAdd={addToCart} />
              ))
            )}
          </ul>
        </section>

        <aside aria-label="Cart" className={styles.orderCart}>
          <h3>Your Cart</h3>

          <ul id="cart-list" className={styles.cartList}>
            {isCartEmpty ? <li className={styles.cartEmpty}>Your cart is empty.</li> : null}
            {!isCartEmpty ? cartItems.map((item) => (
              <CartItem key={item.key} item={item} onQty={updateQuantity} onRemove={removeFromCart} />
            )) : null}
          </ul>

          <p className={styles.cartTotal}>Total: {formatMoney(cartTotal)}</p>

          <div className={styles.cartActions}>
            <button
              type="button"
              className={styles.cartClear}
              onClick={() => { clearCart(); setOrderStatus(""); }}
            >
              Clear Cart
            </button>
            <button
              type="button"
              className={styles.cartCheckout}
              disabled={!canCheckout}
              onClick={handleCheckout}
            >
              Place Order (Demo)
            </button>
          </div>

          <p className={styles.orderStatus} aria-live="polite">{orderStatus}</p>
        </aside>
      </div>
    </section>
  );
}
