import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { api } from "../api/client.js";
import { cartReducer, initialCartState } from "./cartReducer.js";

/* --------------------------------------------------
   CartContext.jsx
   --------------------------------------------------
   This file manages the GLOBAL cart state for the app.

   Why Context?
   - The cart is needed in multiple places:
     - Menu (add items)
     - Cart UI (view/remove items)
     - Order page (submit order)
     - Header (show cart count)
   - Passing props everywhere would be messy ("prop drilling")

   Why useReducer?
   - Cart state has multiple actions (add, remove, update)
   - Reducers keep state updates predictable and centralized

   Why is this file "advanced"?
   - It combines Context + Reducer + side effects (API)
   - This mirrors how real production React apps manage global state
-------------------------------------------------- */

const CartContext = createContext(null);

/* --------------------------------------------------
   CartProvider
   --------------------------------------------------
   The Provider owns the cart state and side effects.
   Any component wrapped by CartProvider can access the cart.
-------------------------------------------------- */
export function CartProvider({ children }) {
  /* -------------------------------
     STATE (Reducer-driven)
     -------------------------------
     state.itemsByKey holds cart items in an object
     for fast lookup and updates
  ------------------------------- */
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  /* Indicates whether the initial cart has finished loading.
     This prevents saving before the cart is hydrated from the API. */
  const [isCartReady, setIsCartReady] = useState(false);

  /* Ref used to debounce saves.
     useRef persists values across renders without causing re-renders. */
  const saveTimerRef = useRef(null);

  /* --------------------------------------------------
     1️⃣ Load cart ONCE when the app starts
     --------------------------------------------------
     This effect runs a single time on mount.
     It fetches the cart from the API and initializes state.
  -------------------------------------------------- */
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const cartDoc = await api.getCart();

        /* Defensive programming:
           Always normalize data from the API */
        const items = Array.isArray(cartDoc?.items) ? cartDoc.items : [];

        /* Convert array → object for efficient updates */
        const itemsByKey = {};

        items.forEach((item) => {
          if (!item.key) return;
          itemsByKey[item.key] = item;
        });

        /* Only update state if the component is still mounted */
        if (!cancelled) {
          dispatch({ type: "CART/LOAD", payload: itemsByKey });
        }
      } catch {
        /* json-server may return 404 if the cart does not exist yet.
           This is expected behavior — we start with an empty cart. */
      } finally {
        if (!cancelled) setIsCartReady(true);
      }
    }

    load();

    /* Cleanup to avoid setting state after unmount */
    return () => {
      cancelled = true;
    };
  }, []);

  /* --------------------------------------------------
     2️⃣ Persist cart AFTER state changes
     --------------------------------------------------
     This effect runs whenever cart items change.
     It saves the cart back to the API, but:
     - Only after initial load is complete
     - With debouncing to reduce API calls
  -------------------------------------------------- */
  useEffect(() => {
    if (!isCartReady) return;

    /* Clear any pending save */
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    /* Debounce save by 400ms */
    saveTimerRef.current = setTimeout(async () => {
      const items = Object.values(state.itemsByKey);

      try {
        await api.saveCart({ id: 1, items });
      } catch {
        /* 
           In real applications, you would show an error,
           retry the request, or notify the user.
           We intentionally keep this simple here. */
      }
    }, 400);

    /* Cleanup timeout if state changes again */
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state.itemsByKey, isCartReady]);

  /* --------------------------------------------------
     3️⃣ Derived values (memoized)
     --------------------------------------------------
     useMemo prevents recalculating values on every render
     unless the dependencies actually change.
  -------------------------------------------------- */
  const value = useMemo(() => {
    const items = Object.values(state.itemsByKey);

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      /* Raw reducer state */
      state,

      /* Dispatch function for reducer actions */
      dispatch,

      /* Derived data */
      items,
      total,

      /* Readiness flag for UI control */
      isCartReady,
    };
  }, [state, isCartReady]);

  return (
    /* The Provider makes cart data available
       to all descendant components */
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/* --------------------------------------------------
   Custom Hook: useCart
   --------------------------------------------------
   This is the ONLY supported way to access cart state.
   It improves readability and prevents incorrect usage.
-------------------------------------------------- */
export function useCart() {
  const ctx = useContext(CartContext);

  /* Guardrail: ensure provider is mounted */
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return ctx;
}