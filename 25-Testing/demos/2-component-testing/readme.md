# Project 02 — Component Testing

Learn component testing with **Vitest + React Testing Library**.

Builds on Project 01 — the same cart utility functions now power React components,
and we add component tests on top of the unit tests.

## What This Project Covers

- Rendering React components in tests with `render()`
- Querying the DOM with `screen` — `getByText`, `getByRole`, `getByLabelText`
- Simulating user interactions with `userEvent`
- Testing what renders based on props (empty/non-empty/discounted states)
- Testing that callbacks are called correctly with `vi.fn()`
- The difference between `getByRole` and `queryByRole`

## Components Being Tested

| Component | What it does |
|---|---|
| `CartItem` | Displays a single cart item with a Remove button |
| `CartSummary` | Shows item count, subtotal, discount, total, and checkout button |
| `DiscountForm` | Input for entering a discount code with validation |

## Project Structure

```
02-component-testing/
  src/
    components/
      CartItem.jsx          ← displays one cart item
      CartSummary.jsx       ← shows totals and checkout button
      DiscountForm.jsx      ← discount code form with validation
    utils/
      cart.js               ← same utility functions from Project 01
    __tests__/
      CartItem.test.jsx     ← component tests for CartItem
      CartSummary.test.jsx  ← component tests for CartSummary
      DiscountForm.test.jsx ← component tests for DiscountForm
    test/
      setup.js              ← imports jest-dom matchers
  vite.config.js
  package.json
  README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the tests

```bash
npm test
```

Expected output:

```
✓ src/__tests__/CartItem.test.jsx (7)
✓ src/__tests__/CartSummary.test.jsx (9)
✓ src/__tests__/DiscountForm.test.jsx (8)

Test Files  3 passed (3)
Tests       24 passed (24)
```

### 3. Watch mode

```bash
npm run test:watch
```

## How to Read a Component Test

```jsx
it("calls onRemove with the item id when Remove is clicked", async () => {
  // vi.fn() creates a spy — tracks whether it was called
  const onRemove = vi.fn();
  const user = userEvent.setup();

  // Render the component
  render(<CartItem item={testItem} onRemove={onRemove} />);

  // Simulate a real user click
  await user.click(screen.getByRole("button", { name: /remove/i }));

  // Assert it was called with the right argument
  expect(onRemove).toHaveBeenCalledWith(1);
});
```

## Key Concepts

**`render()`** mounts a component into the test DOM.

**`screen`** gives you access to the rendered output via queries.

**`getByRole`** finds elements by their ARIA role — the most reliable query.

**`queryByRole`** returns null instead of throwing — use this when asserting absence.

**`userEvent`** simulates realistic user interactions (typing, clicking).

**`vi.fn()`** creates a spy function so you can check if it was called.

## Why `jsdom`?

React components render HTML. Tests need a DOM to render into.
`jsdom` simulates a browser DOM inside Node.js so components can render without a real browser.
This is configured in `vite.config.js` under `test.environment: "jsdom"`.

## Building On This

The next project (03-integration-testing) adds a mock API using MSW and tests
components that fetch data — combining component testing with network interception.
