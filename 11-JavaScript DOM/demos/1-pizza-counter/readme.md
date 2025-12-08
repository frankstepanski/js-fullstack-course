# Pizza Slice Counter 🧮🍕

The goal is simple: build a small UI where the user can increase or decrease the number of pizza slices they want to order. Even though it’s small, it uses the same ideas as bigger apps:

- A visual layout (HTML + CSS)
- A **state** that represents "what's true right now"
- Event listeners that update state when the user clicks buttons
- A `render()` function that updates the UI based on the state

## What the App Does (Functionality)

- Shows the current number of slices (starts at 0).
- User can click:
  - **“+ Add slice”** → increases the count.
  - **“– Remove slice”** → decreases the count (but not below 0).
  - **“Reset”** → sets the count back to 0.
- A **status message** changes based on the number of slices:
  - 0 slices → “No slices yet.”
  - 1–3 slices → “Nice little snack.”
  - 4–7 slices → “Pizza party!”
  - 8+ slices → “Are you feeding a whole team? 😅”

This is a tiny but complete example of a **stateful UI**.

## How the Interface Is Built

### HTML

The page includes:

- A wrapper `<main>` for the app.
- A **title**.
- A **current count** display.
- A **status message**.
- Three buttons:
  - `Add slice`
  - `Remove slice`
  - `Reset`

### CSS

- Centers the app on the page.
- Styles the card, number display, and buttons.
- Uses basic layout (no Flexbox or Grid required, but you could add them later).

### JavaScript

- Keeps all dynamic data in a small **state object**:
  - `sliceCount` — current number of slices.
- Adds event listeners to buttons.
- Updates **state first**, then calls `render()` to update the DOM.

## State: The Single Source of Truth

```js
const state = {
  sliceCount: 0
};
```

We **never** read the text directly from the DOM to make decisions. Instead:

1. The user clicks a button.
2. We update `state.sliceCount`.
3. We call `render()`, which:
   - Updates the number on screen.
   - Updates the message based on `sliceCount`.
   - Disables the “Remove slice” button when `sliceCount` is `0`.


## High-Level Flow

```
User clicks button
        ↓
Update state.sliceCount
        ↓
Call render()
        ↓
Screen updates to match the latest state
```


## Files and Structure

```
pizza-slice-counter/
  index.html
  styles.css
  app.js
  README.md
```

## Step-by-Step Implementation

### 1. HTML Layout (UI Skeleton)

- A container to center the app.
- A heading like **“Pizza Slice Counter”**.
- A large number showing the current slice count.
- A message explaining what that count means.
- Three buttons in a row.

### 2. CSS Styling

- Center the card using margin and a max-width.
- Slight shadow or border.
- Buttons with hover styles.

### 3. JavaScript

- Define the state.
- Write render().
- Add event listeners.
- Update state → call render().
