# Project 01 — Unit Testing

Learn unit testing with **Vitest**.

## What This Project Covers

- What a unit test is and why it matters
- The `describe` / `it` / `expect` API
- The Arrange → Act → Assert pattern
- Testing normal input, edge cases, and invalid input
- How to read test output when tests pass and fail

## What Is Being Tested

Two utility modules that power a shopping cart:

| File | What it does |
|---|---|
| `src/utils/cart.js` | Calculate totals, apply discounts, format currency |
| `src/utils/strings.js` | Format names, truncate text, validate emails, convert slugs |

Both contain **pure functions** — they take inputs and return outputs with no side effects.
Pure functions are the easiest things to unit test.

## Project Structure

```
01-unit-testing/
  src/
    utils/
      cart.js             ← the functions being tested
      strings.js          ← more functions being tested
    __tests__/
      cart.test.js        ← tests for cart.js
      strings.test.js     ← tests for strings.js
  package.json
  vitest.config.js
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
✓ src/__tests__/cart.test.js (22)
✓ src/__tests__/strings.test.js (17)

Test Files  2 passed (2)
Tests       39 passed (39)
```

### 3. Watch mode — reruns on every save

```bash
npm run test:watch
```

### 4. Coverage report

```bash
npm run test:coverage
```

## How to Read a Test

Open `src/__tests__/cart.test.js` and look at any test:

```js
it("returns the correct total for a single item", () => {
  // Arrange — set up the input
  const items = [{ price: 10, quantity: 2 }];

  // Act — call the function
  const result = calculateTotal(items);

  // Assert — check the result
  expect(result).toBe(20);
});
```

Three steps. Every test in this project follows this same pattern.

## Try Breaking a Test

Open `src/utils/cart.js`. Find the `calculateTotal` function and introduce a bug:

```js
// Change this:
return Math.round(total * 100) / 100;

// To this:
return Math.round(total * 100) / 100 + 999;
```

Run `npm test`. Several tests will fail and tell you exactly what went wrong.
Fix the bug — the tests go green again. That is unit testing working as intended.

## Building On This

The next project (02-component-testing) uses the same cart logic but wraps it in a
React UI and tests the components that display it.
