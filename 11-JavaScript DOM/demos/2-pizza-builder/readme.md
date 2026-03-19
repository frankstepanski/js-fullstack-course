# Pizza Order Builder 🍕🧾

This app is the **next step up** from the Pizza Slice Counter. Instead of tracking a single number, you’ll build a small UI where a user can configure a pizza order:

- Choose a **size** (with different base prices)
- Toggle **gluten-free crust**
- Add and remove **toppings**
- See a live **order summary** and **total price**

Even though it’s still small, it feels closer to a real frontend app because it uses:

- Multiple pieces of **state** (size, crust, toppings, prices)
- An **array** of items (the toppings list)
- A **form** (select + checkbox)
- DOM manipulation to render a **dynamic list**
- A `render()` function that updates the UI from state


## Files and Structure

```text
pizza-order-builder/
  index.html   ← structure of the UI
  styles.css   ← visual design and layout
  app.js       ← state, events, and render logic
  README.md    ← this documentation
```

- **`index.html`**: static HTML structure and placeholders for dynamic content.
- **`styles.css`**: keeps styling separate from logic and content.
- **`app.js`**: contains the state object, event handlers, helpers, and `render()`.
- **`README.md`**: explains the purpose, structure, and flow of the app (for you, teammates, or reviewers).


## What the App Does 

- Lets the user select a **pizza size**:
  - Small, Medium, Large — each with its own base price
- Optionally adds a **gluten-free crust** surcharge
- Lets the user choose a **topping** from a dropdown and click **“Add topping”**:
  - Each topping has its own price
  - You can add the same topping more than once (extra cheese, etc.)
- Shows an **order summary** sentence, for example:
  - `Medium pizza, gluten-free crust, with: Pepperoni, Mushrooms.`
- Shows a **toppings list**, where each topping:
  - Displays its name and price
  - Has a **Remove** button to delete that topping from the order
- Displays a live-updating **Total**:
  - Base price (from size)
  - + optional gluten-free surcharge
  - + sum of all topping prices
- Includes a **Reset** button to start over

### The JavaScript script does most of the work by:

- Defining a **state object** that keeps track of:
  - `size` (e.g. `"medium"`)
  - `basePrice` (e.g. `12`)
  - `glutenFree` (`true`/`false`)
  - `toppings` (an array of `{ id, name, price }` objects)
  - `nextToppingId` (a simple counter so each topping has a unique id)
- Adding **event listeners** for:
  - Changing the size `<select>`
  - Toggling the gluten-free checkbox
  - Clicking **“Add topping”**
  - Clicking **“Reset order”**
  - Clicking **“Remove”** for any topping (using event delegation on the list)
- Implementing helper functions to:
  - Read prices from `data-price` attributes on `<option>` tags
  - Build the summary sentence from the current state
  - Calculate the total price from base + crust + toppings
- Implementing a **`render()`** function that:
  - Updates the summary text
  - Rebuilds the `<ul>` toppings list from the `state.toppings` array
  - Updates the total amount shown on screen

The key pattern remains:

> **Update the state → call `render()` → DOM reflects the latest state**

## State: The Single Source of Truth

Here is a simplified version of the state shape:

```js
const state = {
  size: "medium",
  basePrice: 12,
  glutenFree: false,
  toppings: [],            // array of { id, name, price }
  nextToppingId: 1
};
```

We do **not** store the “truth” of the order in the DOM (like reading the text from list items). Instead:

1. The user interacts with the page (selects size, adds topping, toggles crust).
2. We update the appropriate parts of `state`:
   - `state.size`, `state.basePrice` for size changes
   - `state.glutenFree` for crust toggle
   - `state.toppings` when adding or removing toppings
3. We call `render()` to:
   - Regenerate the toppings list from `state.toppings`
   - Recalculate and display the total price
   - Rebuild the summary sentence describing the current order

This way, **state is the single source of truth**, and the DOM is just a “view” of that state.


## High-Level Flow

```text
User changes size / crust / toppings
                ↓
         Update state
                ↓
          Call render()
                ↓
  - Rebuild toppings list (<ul>)
  - Recalculate total price
  - Update summary text
                ↓
      UI matches the latest state
```

Another way to see it:

```text
Action (change, click)
      → update JavaScript data (state)
      → redraw the UI from that data
```
