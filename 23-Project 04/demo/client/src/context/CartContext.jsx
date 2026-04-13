import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { api } from "../lib/api.js";

const CartContext = createContext(null);

function mapFromItems(items = []) {
  const m = new Map();
  for (const item of items) m.set(item.key, item);
  return m;
}

function itemsFromMap(map) {
  return Array.from(map.values());
}

function calcTotals(map) {
  let total = 0;
  for (const item of map.values()) total += item.subtotal || 0;
  return total;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      const cartMap = mapFromItems(action.payload?.items || []);
      return { ...state, cart: cartMap, status: "ready", error: "" };
    }
    case "ERROR":
      return { ...state, status: "error", error: action.payload || "Something went wrong." };

    case "ADD": {
      const { pizza, size } = action.payload;
      const key = `${pizza.id}-${size}`;
      const price = pizza.prices?.[size] ?? 0;

      const next = new Map(state.cart);
      const existing = next.get(key);
      const quantity = (existing?.quantity || 0) + 1;

      const item = {
        key,
        pizzaId: pizza.id,
        name: pizza.name,
        size,
        price,
        quantity,
        subtotal: price * quantity,
      };

      next.set(key, item);
      return { ...state, cart: next };
    }

    case "UPDATE_QTY": {
      const { key, quantity } = action.payload;
      const next = new Map(state.cart);
      const item = next.get(key);
      if (!item) return state;

      const q = Math.max(1, Number(quantity) || 1);
      next.set(key, { ...item, quantity: q, subtotal: item.price * q });
      return { ...state, cart: next };
    }

    case "REMOVE": {
      const next = new Map(state.cart);
      next.delete(action.payload);
      return { ...state, cart: next };
    }

    case "CLEAR":
      return { ...state, cart: new Map() };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: new Map(),
    status: "loading",
    error: "",
  });

  // Avoid PUT spam on first hydrate.
  const hydratedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const cart = await api.getCart();
        if (cancelled) return;
        dispatch({ type: "HYDRATE", payload: cart || { id: 1, items: [] } });
        hydratedRef.current = true;
      } catch (err) {
        if (cancelled) return;
        dispatch({ type: "ERROR", payload: err?.message || String(err) });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Persist to API on changes (after hydration).
  useEffect(() => {
    if (!hydratedRef.current) return;

    const payload = { id: 1, items: itemsFromMap(state.cart) };

    // Fire-and-forget; errors are logged to avoid breaking UI.
    api.putCart(payload).catch((err) => {
      console.error("Failed to persist cart:", err);
    });
  }, [state.cart]);

  const value = useMemo(() => {
    const total = calcTotals(state.cart);

    return {
      cartStatus: state.status,
      cartError: state.error,
      cartMap: state.cart,
      cartItems: itemsFromMap(state.cart),
      cartTotal: total,

      addToCart: (pizza, size) => dispatch({ type: "ADD", payload: { pizza, size } }),
      updateQuantity: (key, quantity) => dispatch({ type: "UPDATE_QTY", payload: { key, quantity } }),
      removeFromCart: (key) => dispatch({ type: "REMOVE", payload: key }),
      clearCart: () => dispatch({ type: "CLEAR" }),

      // Place order (demo): POST /orders, then clear cart.
      placeOrder: async () => {
        const order = {
          createdAt: new Date().toISOString(),
          items: itemsFromMap(state.cart),
          total,
        };
        const saved = await api.postOrder(order);
        dispatch({ type: "CLEAR" });
        return saved;
      },
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
