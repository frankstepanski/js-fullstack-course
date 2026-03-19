# Pizza Slice Counter 🧮🍕

This app is the **first step** in building interactive frontend applications.

The goal is simple: build a small UI where a user can increase or decrease the number of pizza slices they want to order. Even though it’s small, it introduces the **core mental model** that all larger frontend apps are built on.

This project focuses on understanding:

- How **state** represents what’s true right now
- How user actions update that state
- How the UI is re-rendered from state
- Why we never treat the DOM as the source of truth

Everything here will show up again in later projects — just at a much smaller scale.

## What the App Does

- Displays the current number of pizza slices (starts at `0`)
- Provides three buttons:
  - **“+ Add slice”** → increases the slice count
  - **“– Remove slice”** → decreases the slice count (never below 0)
  - **“Reset”** → sets the slice count back to 0
- Displays a **status message** that changes based on the number of slices:
  - `0` slices → *“No slices yet.”*
  - `1–3` slices → *“Nice little snack.”*
  - `4–7` slices → *“Pizza party!”*
  - `8+` slices → *“Are you feeding a whole team? 😅”*
- Disables the **Remove slice** button when the count is `0`

This is a tiny but complete example of a **stateful UI**.

## Files and Structure

```text
pizza-slice-counter/
  index.html   ← structure of the UI
  styles.css   ← visual design and layout
  app.js       ← state, events, and render logic
  README.md    ← this documentation
```

- **index.html**: static HTML elements (buttons, text placeholders).
- **styles.css**: basic styling so the UI is readable and centered.
- **app.js**: contains the state, event listeners, and `render()` function.
- **README.md**: explains how the app works and why it matters.

## State: The Single Source of Truth

The entire app is driven by a single piece of state:

```js
const state = {
  sliceCount: 0
};
```

We **never** read values from the DOM to decide what to do.

Instead:

1. The user clicks a button.
2. We update `state.sliceCount`.
3. We call `render()`.

The UI always reflects whatever is currently stored in `state`.

## The `render()` Function

The `render()` function is responsible for updating the UI based on state:

- Displays the current slice count
- Updates the status message based on `sliceCount`
- Disables or enables the **Remove slice** button

The key idea is:

> The DOM is a *view* of the state — not the source of truth.

## High-Level Flow

```text
User clicks a button
        ↓
Update state.sliceCount
        ↓
Call render()
        ↓
Screen updates to match the latest state
```

Another way to think about it:

```text
Action → update data → redraw UI
```

## Why This Project Matters

This project establishes the **core pattern** used in every frontend application that follows:

- User actions change **state**
- The UI is **re-rendered from state**
- No application logic is hidden in the DOM

Even though this app only manages a single number, the mental model is the same one used for:
- counters
- forms
- shopping carts
- dashboards
- React components

If this pattern makes sense here, it will scale naturally as you move on to:
- multiple pieces of state
- arrays of data
- add/remove behavior
- and eventually **React state hooks**

This project is intentionally small — but it lays the foundation for everything that comes next.
