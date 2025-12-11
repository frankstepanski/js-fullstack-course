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


## What the App Does (Functionality)

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

This is a compact example of managing **multiple state fields** and **derived values** (like total price) in your UI.

## How the Interface Is Built

### HTML

The page includes:

- A centered `<main>` wrapper with a card-like `<section>`
- A title and short subtitle explaining what the app does
- **Section 1: Size + Crust**
  - A `<select>` for pizza size (with `data-price` attributes for base price)
  - A checkbox for gluten-free crust
- **Section 2: Add Toppings**
  - A `<select>` for toppings (with `data-price` for each topping)
  - An **“Add topping”** button
  - A help text line
- **Section 3: Summary + Total**
  - A paragraph for the **summary text**
  - An empty `<ul>` where toppings will be rendered by JavaScript
  - A row showing the **Total** amount
  - A **“Reset order”** button

Key idea: the HTML provides **slots** (summary text, list, total) that JavaScript will fill in based on the current state.

### CSS

The CSS handles:

- A **card layout** centered on the page
- Comfortable padding, rounded corners, and a soft drop shadow
- Clear section headings (`1. Choose your size`, `2. Add toppings`, `3. Order summary`)
- Simple, readable **form styling** for `<select>` and checkbox fields
- A visually clean **toppings list**, where each row shows:
  - Topping name
  - Topping price
  - A small button to remove that topping
- A **total row** with an emphasized total price
- Button styles for primary (Add topping) and secondary (Reset) actions

The layout is kept simple and mobile-friendly with a max-width card and a few small tweaks at smaller screen sizes.

### JavaScript

The JavaScript script does most of the work by:

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

---

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

## Step-by-Step Implementation

### 1. HTML Layout (UI Skeleton)

- Create a `<main class="app">` container and a `.card` element inside.
- Add a main heading (`Pizza Order Builder`) and a short explanatory subtitle.
- Add three sections:
  - **Section 1 (Size)**: a `<select>` with options (Small/Medium/Large) and a checkbox for gluten-free crust.
  - **Section 2 (Toppings)**: another `<select>` listing toppings and a button labeled “Add topping”.
  - **Section 3 (Summary)**: a `<p>` for summary text, an empty `<ul>` for toppings, a total display, and a “Reset order” button.
- Add a `<script src="app.js"></script>` at the bottom of the `<body>`.

The HTML stays fairly simple; most of the “dynamic” part is done via JS.

### 2. CSS Styling

- Apply a global reset with `box-sizing: border-box`.
- Style the `<body>` with a light background and a readable font.
- Center the `.card` using Flexbox or margin auto inside `<main>`.
- Give the card:
  - Padding
  - Rounded corners
  - A soft box-shadow
- Style form fields:
  - `<select>` with padding and border-radius
  - A nice layout for the topping selector + button
- Style the list of toppings:
  - Remove bullets
  - Use flexbox in each list item so the name, price, and remove button are aligned.
- Emphasize the total amount with larger, bold text and a distinctive color.

Keep the CSS focused on **readability** for beginners: simple rules with clear comments if needed.

### 3. JavaScript

- Define the state as shown above.
- Select DOM elements:
  - Size `<select>`
  - Gluten-free checkbox
  - Topping `<select>`
  - “Add topping” button
  - Toppings `<ul>`
  - Summary text `<p>`
  - Total `<span>`
  - “Reset order” button
- Attach event listeners:
  - `change` on size select → update `state.size` and `state.basePrice` (using `data-price`).
  - `change` on gluten-free checkbox → update `state.glutenFree`.
  - `click` on “Add topping” → read selected topping, push a new `{ id, name, price }` object into `state.toppings`.
  - `click` on “Reset` → reset state and form values.
  - `click` on topping list → use event delegation to detect which “Remove” button was clicked, then remove that topping from `state.toppings`.
- Write helper functions:
  - `calculateTotal()` → base + gluten-free surcharge + sum of topping prices.
  - `buildSummaryText()` → returns a string describing the current pizza.
- Write `render()`:
  - Clear the `<ul>` toppings list and rebuild it from `state.toppings`.
  - Update the summary text paragraph with `buildSummaryText()`.
  - Calculate the total and update the total price `<span>`.

Finally, call `render()` once at the bottom of `app.js` so the UI matches the **initial state** when the page loads.

## Why This Project Matters

Compared to the simple **Pizza Slice Counter**, this app adds:

- Multiple state fields instead of a single number
- An **array** of items rendered into a list
- A little bit of **form handling**
- Derived values (the total price) computed from state
- **Add / remove** behavior that mirrors real-world apps (carts, wishlists, etc.)

By building this, students practice:

- Thinking carefully about **state shape** (`size`, `glutenFree`, `toppings`, etc.)
- Updating state in response to user actions
- Using the DOM as a **view layer**, not the primary source of truth
- Building clean, predictable UIs from a `render()` function

Once they’re comfortable with patterns like this, they’ll be much more prepared for:

- Larger DOM-based projects (task lists, forms, dashboards)
- Fetching data from APIs and rendering lists
- Frontend frameworks (React, Vue, etc.) that formalize the “state → UI” pattern.
