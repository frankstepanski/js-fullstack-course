import { useMemo, useState } from "react";
import PageShell from "./PageShell.jsx";
import { useCart } from "../context/CartContext.jsx";
import Button from "../components/ui/Button.jsx";
import StatusMessage from "../components/ui/StatusMessage.jsx";
import styled from "styled-components";
import styles from "./order.module.css";
import { api } from "../api/client.js";

const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const QtyInput = styled.input`
  width: 64px;
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

export default function Order() {
  const { items, total, dispatch, isCartReady } = useCart();

  const [form, setForm] = useState({ name: "", phone: "", notes: "" });
  const [submitState, setSubmitState] = useState({ type: "idle", msg: "" });

  const isEmpty = items.length === 0;

  /* --------------------------------------------------
     FIX #1: Guard total before calling toFixed()
  -------------------------------------------------- */
  const totalFormatted = useMemo(() => {
    return typeof total === "number" ? total.toFixed(2) : "0.00";
  }, [total]);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCheckout(e) {
    e.preventDefault();

    if (isEmpty) return setSubmitState({ type: "error", msg: "Your cart is empty." });
    if (!form.name.trim() || !form.phone.trim()) {
      return setSubmitState({ type: "error", msg: "Please add your name and phone number." });
    }

    setSubmitState({ type: "loading", msg: "Placing your order…" });

    try {
      const payload = {
        createdAt: new Date().toISOString(),
        customer: { ...form },
        items,
        total,
      };

      await api.createOrder(payload);
      dispatch({ type: "CART/CLEAR" });
      setForm({ name: "", phone: "", notes: "" });
      setSubmitState({ type: "success", msg: "Order placed! 🎉 (Saved to /orders)" });
    } catch {
      setSubmitState({ type: "error", msg: "Could not place order. Is the API running?" });
    }
  }

  return (
    <PageShell
      title="Order"
      intro="Update quantities, clear your cart, and place a mock order (POST to the API)."
    >
      {!isCartReady ? (
        <StatusMessage>Loading your saved cart…</StatusMessage>
      ) : (
        <div className={styles.layout}>
          <section className={styles.card} aria-label="Cart">
            <h2 style={{ marginTop: 0 }}>Your Cart</h2>

            {isEmpty ? (
              <StatusMessage>Your cart is empty. Add items from the Menu.</StatusMessage>
            ) : (
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {items.map((item) => (
                  <div key={item.key} className={styles.cartRow}>
                    <div>
                      <strong>{item.name}</strong>
                      <div style={{ color: "#555", fontSize: "0.9rem" }}>
                        Size: {item.size} • $
                        {/* FIX #2: Guard item.price before toFixed() */}
                        {typeof item.price === "number"
                          ? item.price.toFixed(2)
                          : "0.00"}
                      </div>
                    </div>

                    <Line>
                      <label style={{ display: "grid", gap: "0.25rem", fontSize: "0.85rem" }}>
                        Qty
                        <QtyInput
                          type="number"
                          min={0}
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch({
                              type: "CART/SET_QTY",
                              payload: { key: item.key, quantity: Number(e.target.value) },
                            })
                          }
                        />
                      </label>

                      <Button
                        variant="ghost"
                        onClick={() =>
                          dispatch({ type: "CART/REMOVE", payload: { key: item.key } })
                        }
                      >
                        Remove
                      </Button>
                    </Line>
                  </div>
                ))}
              </div>
            )}

            <hr className={styles.hr} />

            <div className={styles.totalRow}>
              <strong>Total</strong>
              <strong>${totalFormatted}</strong>
            </div>

            <Button
              variant="ghost"
              onClick={() => dispatch({ type: "CART/CLEAR" })}
              disabled={isEmpty}
            >
              Clear Cart
            </Button>
          </section>

          <section className={styles.card} aria-label="Checkout form">
            <h2 style={{ marginTop: 0 }}>Checkout</h2>

            <form onSubmit={handleCheckout} className={styles.form}>
              <label className={styles.label}>
                Name
                <input
                  className={styles.input}
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Your name"
                />
              </label>

              <label className={styles.label}>
                Phone
                <input
                  className={styles.input}
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="(555) 555-5555"
                />
              </label>

              <label className={styles.label}>
                Notes (optional)
                <textarea
                  className={styles.textarea}
                  value={form.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  placeholder="Allergies, delivery notes, etc."
                />
              </label>

              <Button type="submit" disabled={submitState.type === "loading"}>
                {submitState.type === "loading" ? "Placing Order…" : "Place Order"}
              </Button>
            </form>

            {submitState.type !== "idle" ? (
              <div style={{ marginTop: "0.75rem" }}>
                <StatusMessage tone={submitState.type === "error" ? "error" : "neutral"}>
                  {submitState.msg}
                </StatusMessage>
              </div>
            ) : null}
          </section>
        </div>
      )}
    </PageShell>
  );
}