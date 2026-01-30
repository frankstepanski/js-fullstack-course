/**
 * Cart Reducer
 * ==================================================
 * A reducer is a PURE function that:
 * - Takes the current state and an action
 * - Returns the next state
 * - Does NOT mutate the existing state
 * - Does NOT perform side effects (no fetch, no timers)
 *
 * Reducers make state updates:
 * - Predictable
 * - Centralized
 * - Easy to debug and test
 *
 * This reducer is responsible ONLY for:
 * - How cart state changes in response to actions
 *
 * All API calls, effects, and persistence logic
 * live outside the reducer (in the CartProvider).
 *
 * --------------------------------------------------
 * Cart Data Shape
 * --------------------------------------------------
 * We store cart items in an OBJECT keyed by:
 *
 *   "pizzaId-size"
 *
 * Example:
 * {
 *   "3-medium": {
 *     key: "3-medium",
 *     pizzaId: 3,
 *     name: "Margherita",
 *     size: "medium",
 *     price: 14,
 *     quantity: 2
 *   }
 * }
 *
 * Why an object instead of an array?
 * - O(1) lookups and updates
 * - No repeated loops
 * - Easier add/remove/update logic
 * - Scales better as the cart grows
 */

/**
 * Initial cart state.
 *
 * This is used:
 * - When the app first loads
 * - Before data is fetched from the API
 */
export const initialCartState = {
  /**
   * itemsByKey
   * -----------
   * An object where:
   * - key = "pizzaId-size"
   * - value = cart item data
   */
  itemsByKey: {},
};

/**
 * cartReducer
 * ==================================================
 * @param {Object} state  - current cart state
 * @param {Object} action - describes WHAT happened
 * @returns {Object} nextState
 *
 * The reducer decides HOW state changes,
 * not WHEN or WHY it changes.
 */
export function cartReducer(state, action) {
  switch (action.type) {
    /**
     * CART/LOAD
     * ----------
     * Used once when the app starts.
     * Replaces the current cart state with
     * data loaded from the API.
     */
    case "CART/LOAD": {
      return {
        ...state,
        itemsByKey: action.payload || {},
      };
    }

    /**
     * CART/ADD
     * --------
     * Adds an item to the cart.
     *
     * If the item already exists:
     * - Increase its quantity
     *
     * If it does not exist:
     * - Add it with quantity = 1
     */
    case "CART/ADD": {
      const { item } = action.payload;
      const existing = state.itemsByKey[item.key];

      const next = {
        ...state.itemsByKey,
        [item.key]: existing
          ? { ...existing, quantity: existing.quantity + 1 }
          : { ...item, quantity: 1 },
      };

      return { ...state, itemsByKey: next };
    }

    /**
     * CART/REMOVE
     * -----------
     * Completely removes an item from the cart
     * regardless of its quantity.
     */
    case "CART/REMOVE": {
      const { key } = action.payload;

      const next = { ...state.itemsByKey };
      delete next[key];

      return { ...state, itemsByKey: next };
    }

    /**
     * CART/SET_QTY
     * ------------
     * Explicitly sets the quantity for an item.
     *
     * If quantity <= 0:
     * - Remove the item entirely
     *
     * If item does not exist:
     * - Do nothing (state is returned unchanged)
     */
    case "CART/SET_QTY": {
      const { key, quantity } = action.payload;
      const existing = state.itemsByKey[key];

      if (!existing) return state;

      if (quantity <= 0) {
        const next = { ...state.itemsByKey };
        delete next[key];
        return { ...state, itemsByKey: next };
      }

      return {
        ...state,
        itemsByKey: {
          ...state.itemsByKey,
          [key]: { ...existing, quantity },
        },
      };
    }

    /**
     * CART/CLEAR
     * ----------
     * Removes ALL items from the cart.
     * Commonly used after checkout.
     */
    case "CART/CLEAR": {
      return { ...state, itemsByKey: {} };
    }

    /**
     * Default
     * -------
     * If the reducer does not recognize the action,
     * it MUST return the current state unchanged.
     */
    default:
      return state;
  }
}