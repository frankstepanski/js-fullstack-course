# Pizza Shopping Cart 🍕🛒

This app is the **next evolution** of the Pizza Order Builder.

Instead of configuring a single pizza, you’ll build a **shopping-cart-style UI** where a user can create **multiple different pizzas**, add them to a cart, review what went into each pizza, and see a live-updating **order total**.

This project feels much closer to a **real-world frontend application**. It introduces the idea of a **pizza builder** (temporary state) and a **shopping cart** (persistent state), while still using only **vanilla JavaScript**.

Even though the app is still compact, it reinforces important frontend concepts like:

- Separating **temporary vs persistent state**
- Managing **arrays of complex objects**
- Handling **multiple form inputs at once** (checkboxes)
- Preventing invalid or duplicate state
- Computing **derived values** (pizza totals, order totals)
- Rendering detailed UI from state using a `render()` function

## Files and Structure

```text
pizza-shopping-cart/
  index.html   ← structure of the UI
  styles.css   ← visual design and layout
  app.js       ← state, events, and render logic
  README.md    ← this documentation
```

## What the App Does

### Pizza Builder (Temporary State)

- Select a pizza size
- Toggle gluten-free crust
- Select multiple toppings at once (checkboxes)
- Prevent duplicate toppings
- See a live list of selected toppings

### Shopping Cart (Persistent State)

- Add multiple pizzas to the cart
- View each pizza’s toppings and price
- Remove pizzas from the cart
- See a live-updating order total

## State Overview

```js
const state = {
  builder: {
    size: "medium",
    basePrice: 12,
    glutenFree: false,
    toppings: []
  },
  cart: [],
  nextPizzaId: 1,
  nextToppingId: 1
};
```

## Why This Project Matters

This app introduces real-world frontend patterns:

- Shopping carts
- Builder vs cart workflows
- Derived data
- Clean state management

It is a strong bridge to **React and reducers**.
