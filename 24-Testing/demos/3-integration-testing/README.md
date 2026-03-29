# Project 03 — Integration Testing

Learn integration testing with **Vitest + React Testing Library + MSW**.

Builds on Projects 01 and 02 — the same cart utilities and components now
make real API calls, and MSW intercepts those calls in tests so we can
control exactly what the server returns.

## What This Project Covers

- What integration tests are and how they differ from component tests
- Setting up MSW (Mock Service Worker) to intercept API requests
- Writing default handlers for the happy path
- Overriding handlers per-test to simulate errors and empty states
- Using `findBy*` for elements that appear after async data loads
- Testing complete flows — add to cart, remove from cart, error handling
- Why `server.resetHandlers()` matters between tests

## The Key New Concept — MSW

In Projects 01 and 02, components had no network requests. Here, components
fetch data from `/api/products` and post to `/api/cart`.

In tests, we don't want to hit a real server. MSW sits between the component
and the network and intercepts fetch() calls, returning whatever we define.

```
Component → fetch("/api/products") → MSW intercepts → returns fake data
```

The component never knows the difference. It behaves exactly as it would
with a real backend.

## Components Being Tested

| Component | What it does |
|---|---|
| `ProductList` | Fetches products from `/api/products` and displays them |
| `CartPage` | Combines ProductList + cart sidebar, handles add/remove via API |

## Project Structure

```
03-integration-testing/
  src/
    components/
      ProductList.jsx       ← fetches and displays products
      CartPage.jsx          ← full cart page with API interactions
    utils/
      cart.js               ← same utilities from Projects 01 + 02
    __tests__/
      ProductList.test.jsx  ← integration tests for ProductList
      CartPage.test.jsx     ← integration tests for the full cart flow
    test/
      handlers.js           ← MSW request handlers (fake backend)
      server.js             ← MSW server instance
      setup.js              ← starts/resets/stops the server around tests
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
✓ src/__tests__/ProductList.test.jsx (8)
✓ src/__tests__/CartPage.test.jsx (7)

Test Files  2 passed (2)
Tests       15 passed (15)
```

### 3. Watch mode

```bash
npm run test:watch
```

## How MSW Works in Tests

### Default handler (happy path)

In `src/test/handlers.js`, the default GET /api/products handler returns
three products. Most tests use this automatically.

### Overriding a handler for one test

When you need to test an error state, override the handler inside the test:

```js
it("shows an error when the API fails", async () => {
  server.use(
    http.get("/api/products", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<ProductList onAddToCart={() => {}} />);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent("Something went wrong");
});
```

After the test, `server.resetHandlers()` automatically removes the override
so the next test gets the default handler again.

## getBy vs findBy — The Critical Difference

```js
// ❌ This fails — the fetch hasn't finished yet when this runs
expect(screen.getByText("Mechanical Keyboard")).toBeInTheDocument();

// ✅ This works — waits up to 1 second for the element to appear
expect(await screen.findByText("Mechanical Keyboard")).toBeInTheDocument();
```

Use `findBy*` whenever you are waiting for data to load from an API.
Use `getBy*` for elements that are already in the DOM immediately on render.

---

## Building On This

The next project (04-e2e-testing) runs the same shopping cart app in a real
browser using Playwright — no mocking, just real user flows against a real
running application.
