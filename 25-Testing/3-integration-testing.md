# Integration Testing

Integration testing is the **next layer above component testing**.

While unit tests verify isolated logic and component tests verify individual UI components, integration tests verify that **multiple pieces of your application work correctly together**. They test the connections — what happens when a component fetches data, processes it, and displays the result.

Integration testing creates confidence that your application behaves correctly as a whole — not just in isolation.

## What Is an Integration Test?

An **integration test** verifies that two or more parts of your application work together as expected.

In a React application, an integration test usually involves:
- rendering a component that depends on external data
- simulating a real network request (intercepted and faked)
- verifying the UI updates correctly based on the response
- testing flows that span multiple components

An integration test:
- still runs in a simulated DOM (not a real browser)
- intercepts network requests rather than making real ones
- tests behavior across multiple connected pieces
- is slower than unit and component tests, but faster than E2E tests

> **Mental model:** "Do these pieces work correctly when they are wired together?"

## How Integration Tests Differ from Component Tests

This distinction trips up a lot of beginners, so it is worth being explicit.

| | Component Tests | Integration Tests |
|---|---|---|
| Scope | Single component | Multiple components or component + API |
| Network | Avoided entirely | Intercepted and mocked |
| State | Local component state | Shared state, context, or server data |
| Complexity | Lower | Higher |
| Speed | Fast | Medium |

A **component test** renders a `LoginForm` and checks that a validation message appears when the email is invalid. It never touches a network.

An **integration test** renders a `LoginForm`, submits valid credentials, intercepts the API call, returns a fake response, and verifies the user is redirected to the dashboard. It tests the whole flow.

## Recommended Tools

Integration testing in React builds on the same tools from component testing, with one important addition:

- **Vitest** — test runner and assertion library (same as before)
- **React Testing Library** — rendering and querying (same as before)
- **MSW (Mock Service Worker)** — intercepts network requests and returns fake responses

MSW is the key new tool. It is what makes integration tests possible without needing a real backend running.

### Why MSW?

When a component fetches data, it makes a real HTTP request. In a test environment, you do not want to:
- depend on a real server being available
- send real data to a real API
- have tests fail because of network conditions

MSW solves this by **intercepting requests at the network level** and returning whatever response you define. Your component behaves exactly as if it received a real response — because from its perspective, it did.

> MSW works differently from manually replacing `fetch` with a fake function. It sits at the network boundary, which means your components do not need to change at all for MSW to work. The same code that runs in production runs in your tests.

## Installing Integration Testing Tools

If you already have Vitest and React Testing Library set up from component testing, you only need to add MSW:

```bash
npm install -D msw
```

Your existing `vitest.config.ts` and setup file from component testing will continue to work as-is.

### MSW Setup

MSW needs a small amount of configuration before it can be used in tests.

Create a file to hold your request handlers. Handlers define which requests to intercept and what to return:

```ts
// src/test/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/user", () => {
    return HttpResponse.json({
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    });
  }),
];
```

Create a server instance to use in tests:

```ts
// src/test/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

Update your setup file to start, reset, and stop the server around each test:

```ts
// src/test/setup.ts
import "@testing-library/jest-dom";
import { server } from "./server";

beforeAll(() => server.listen());        // start intercepting before tests run
afterEach(() => server.resetHandlers()); // reset any overrides after each test
afterAll(() => server.close());          // stop intercepting after all tests finish
```

`resetHandlers()` after each test is important — it ensures that any handler you override in one test does not bleed into another.

## Understanding Handlers

A handler tells MSW:
1. **which requests to intercept** — the method (`get`, `post`, `put`, `delete`) and URL
2. **what to return** — the fake response

```ts
import { http, HttpResponse } from "msw";

// Intercept GET /api/products and return a fake list
http.get("/api/products", () => {
  return HttpResponse.json([
    { id: 1, name: "Keyboard" },
    { id: 2, name: "Mouse" },
  ]);
});

// Intercept POST /api/login and return a success response
http.post("/api/login", () => {
  return HttpResponse.json({ token: "fake-token-123" });
});

// Intercept and return an error response
http.get("/api/user", () => {
  return new HttpResponse(null, { status: 401 });
});
```

Handlers are just functions that return responses. You can return success responses, error responses, empty data, or anything your component might receive in the real world.

## Basic Integration Test Example

### The Component

Here is a component that fetches a user from an API and displays their name:

```tsx
// UserProfile.tsx
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load user");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load user");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
```

### The Integration Test

```tsx
// UserProfile.test.tsx
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "./test/server";
import { describe, it, expect } from "vitest";
import { UserProfile } from "./UserProfile";

describe("UserProfile", () => {
  it("shows a loading state initially", () => {
    render(<UserProfile />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays the user's name and email after loading", async () => {
    render(<UserProfile />);

    // wait for the async fetch to complete and the UI to update
    expect(await screen.findByRole("heading", { name: "Alice" })).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });

  it("shows an error message when the request fails", async () => {
    // override the default handler for this test only
    server.use(
      http.get("/api/user", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<UserProfile />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to load user");
  });
});
```

This test covers three separate scenarios — loading, success, and error — each in its own test case.

Notice that the success and error tests use `findBy` instead of `getBy`. That is because the component is fetching data asynchronously — the UI does not update immediately. `findBy` waits for the element to appear, which is exactly what you need when testing async behavior.

## Overriding Handlers Per Test

The default handlers you define in `handlers.ts` cover the happy path — the typical successful response. But you also need to test what happens when things go wrong.

Use `server.use()` inside a test to override a handler for that test only:

```tsx
it("shows an error when the server returns 404", async () => {
  server.use(
    http.get("/api/user", () => {
      return new HttpResponse(null, { status: 404 });
    })
  );

  render(<UserProfile />);

  expect(await screen.findByRole("alert")).toBeInTheDocument();
});
```

Because the setup file calls `server.resetHandlers()` after each test, this override only applies to this one test. The next test will use the original handler again.

This pattern — default handlers for success, per-test overrides for errors — is the standard way to structure integration tests with MSW.

## Testing a Full User Flow

Integration tests shine when testing a sequence of actions that spans multiple steps. Here is a more realistic example — a login flow that submits credentials, calls an API, and redirects on success.

### The Component

```tsx
// LoginPage.tsx
import { useState } from "react";

type Props = {
  onSuccess: () => void;
};

export function LoginPage({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }

      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
```

### The Integration Tests

```tsx
// LoginPage.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "./test/server";
import { vi, describe, it, expect } from "vitest";
import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
  it("calls onSuccess after a successful login", async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn(); // a fake function we can track

    server.use(
      http.post("/api/login", () => {
        return HttpResponse.json({ token: "fake-token" });
      })
    );

    render(<LoginPage onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    // wait for the async login to complete
    await screen.findByRole("button", { name: "Sign In" });

    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it("shows an error message when credentials are invalid", async () => {
    const user = userEvent.setup();

    server.use(
      http.post("/api/login", () => {
        return new HttpResponse(null, { status: 401 });
      })
    );

    render(<LoginPage onSuccess={vi.fn()} />);

    await user.type(screen.getByLabelText("Email"), "wrong@example.com");
    await user.type(screen.getByLabelText("Password"), "wrongpassword");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid email or password"
    );
  });

  it("shows a loading state while the request is in progress", async () => {
    const user = userEvent.setup();

    // delay the response so we can catch the loading state
    server.use(
      http.post("/api/login", async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return HttpResponse.json({ token: "fake-token" });
      })
    );

    render(<LoginPage onSuccess={vi.fn()} />);

    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(screen.getByRole("button", { name: "Signing in..." })).toBeDisabled();
  });
});
```

These tests cover three distinct scenarios — success, failure, and the in-progress loading state. Each one sets up its own handler, renders the component, interacts with it, and asserts what the user sees.

## Spy Functions with `vi.fn()`

You may have noticed `vi.fn()` in the example above. This is a **spy function** — a fake function that records whether it was called, how many times, and with what arguments.

```ts
const onSuccess = vi.fn();

// after the test runs
expect(onSuccess).toHaveBeenCalledOnce();
expect(onSuccess).toHaveBeenCalledWith("some-argument");
expect(onSuccess).not.toHaveBeenCalled();
```

Spy functions are useful in integration tests when you need to verify that a callback was triggered — for example, checking that `onSuccess` was called after a successful login, or that `onError` was called after a failure.

They do not replace the real function — they just let you observe whether it was called.

## Testing Components with Context

Many React applications use context to share state across components — things like the current user, a theme, or a shopping cart. Components that consume context need that context to be provided in tests, otherwise they will error or render incorrectly.

### Wrapping with a Provider

```tsx
// ThemeContext.tsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children, theme = "light" }: { children: React.ReactNode; theme?: string }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
```

```tsx
// ThemedButton.tsx
import { useTheme } from "./ThemeContext";

export function ThemedButton() {
  const theme = useTheme();
  return <button data-theme={theme}>Click me</button>;
}
```

```tsx
// ThemedButton.test.tsx
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "./ThemeContext";
import { ThemedButton } from "./ThemedButton";

it("renders with the provided theme", () => {
  render(
    <ThemeProvider theme="dark">
      <ThemedButton />
    </ThemeProvider>
  );

  expect(screen.getByRole("button")).toHaveAttribute("data-theme", "dark");
});
```

Wrap the component in its required provider when rendering in tests. You can pass different values to the provider to test how the component behaves under different context values.

### Creating a Custom Render Helper

If many of your tests need the same providers, wrapping every `render()` call manually gets repetitive. A custom render helper solves this:

```tsx
// src/test/renderWithProviders.tsx
import { render } from "@testing-library/react";
import { ThemeProvider } from "../ThemeContext";

export function renderWithProviders(ui: React.ReactElement, { theme = "light" } = {}) {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
}
```

Now use it in tests instead of the default `render`:

```tsx
import { renderWithProviders } from "./test/renderWithProviders";

it("renders with dark theme", () => {
  renderWithProviders(<ThemedButton />, { theme: "dark" });
  expect(screen.getByRole("button")).toHaveAttribute("data-theme", "dark");
});
```

This keeps tests clean and avoids repeating provider setup in every file.

## Testing Multiple Components Together

Integration tests are also useful when verifying that a parent component and its children work correctly as a unit.

```tsx
// ProductList.tsx
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

type Product = { id: number; name: string; price: number };

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <ul>
      {products.map((product) => (
        <ProductCard key={product.id} name={product.name} price={product.price} />
      ))}
    </ul>
  );
}
```

```tsx
// ProductCard.tsx
type Props = { name: string; price: number };

export function ProductCard({ name, price }: Props) {
  return (
    <li>
      <h2>{name}</h2>
      <p>${price.toFixed(2)}</p>
    </li>
  );
}
```

```tsx
// ProductList.test.tsx
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "./test/server";
import { ProductList } from "./ProductList";

describe("ProductList", () => {
  it("renders a product card for each product returned", async () => {
    server.use(
      http.get("/api/products", () => {
        return HttpResponse.json([
          { id: 1, name: "Keyboard", price: 79.99 },
          { id: 2, name: "Mouse", price: 39.99 },
        ]);
      })
    );

    render(<ProductList />);

    expect(await screen.findByText("Keyboard")).toBeInTheDocument();
    expect(screen.getByText("$79.99")).toBeInTheDocument();
    expect(screen.getByText("Mouse")).toBeInTheDocument();
    expect(screen.getByText("$39.99")).toBeInTheDocument();
  });

  it("shows a message when no products are returned", async () => {
    server.use(
      http.get("/api/products", () => {
        return HttpResponse.json([]);
      })
    );

    render(<ProductList />);

    expect(await screen.findByText("No products found.")).toBeInTheDocument();
  });
});
```

This test verifies `ProductList` and `ProductCard` working together — not in isolation. It confirms that fetched data flows correctly from the parent down to the child components and appears correctly on screen.

## When Integration Tests Fail

Integration test failures can come from more places than unit or component test failures. When a test fails, think through the layers:

**1. The component has a bug.**
The fetch logic, state updates, or rendering logic is wrong. Check the component code.

**2. The handler is wrong.**
The MSW handler is returning unexpected data or the wrong status code. Check that the handler matches what the component expects.

**3. The query is wrong.**
The test is looking for something that exists but with the wrong query. Use `screen.debug()` to inspect the rendered output.

**4. Missing `await`.**
Async tests are the most common source of subtle failures. If a test passes when it should fail, or fails unpredictably, check that every `findBy`, `waitFor`, and `userEvent` call is properly awaited.

### `screen.debug()` Still Works Here

Just like in component tests, `screen.debug()` prints the current DOM and is the fastest way to understand what is actually rendered:

```tsx
render(<UserProfile />);
screen.debug(); // print the DOM before the fetch resolves

expect(await screen.findByRole("heading", { name: "Alice" })).toBeInTheDocument();
screen.debug(); // print the DOM after the fetch resolves
```

You can call it at any point in a test to capture the state of the DOM at that moment.

## What Should Be Integration Tested

Good candidates for integration tests:

- components that fetch data from an API
- forms that submit data and update the UI based on the response
- flows that involve multiple components working together
- components that depend on context or shared state
- loading, error, and empty states driven by real async behavior

If the behavior you are testing requires a network request, context, or multiple components interacting — it belongs in an integration test.

## What Not to Integration Test

Avoid integration tests for:

- logic that can be covered by a unit test
- UI behavior that does not involve a network or shared state (use component tests)
- full end-to-end flows involving routing and a real browser (use E2E tests)
- every possible API error code (test the most important ones and move on)

Integration tests are slower and more complex to write than unit or component tests. Use them where they add the most value — at the boundaries between your UI and external data.

## Integration Tests vs Component Tests vs Unit Tests

| | Unit Tests | Component Tests | Integration Tests |
|---|---|---|---|
| What they test | Isolated logic | Single component UI | Multiple pieces together |
| Network | None | None | Intercepted via MSW |
| Context/State | None | Local state only | Shared state and context |
| Speed | Fastest | Fast | Medium |
| Complexity | Lowest | Medium | Higher |
| Main tools | Vitest | Vitest + RTL | Vitest + RTL + MSW |

All three layers work together. Unit tests protect your logic. Component tests protect your UI. Integration tests protect the connections between them.

## Organizing Integration Tests

Integration tests can live next to the component they test, just like component tests:

```
src/
  components/
    UserProfile.tsx
    UserProfile.test.tsx     ← component or integration test
  pages/
    LoginPage.tsx
    LoginPage.test.tsx       ← integration test
  test/
    handlers.ts              ← default MSW handlers
    server.ts                ← MSW server setup
    setup.ts                 ← global test setup
    renderWithProviders.tsx  ← custom render helper
```

Keep your default handlers in one place and override them per test as needed. Keep your test utilities (`renderWithProviders`, server setup) in a dedicated `test/` folder so they are easy to find and reuse.

## Common Beginner Mistakes

**Not awaiting async queries**
This is the most common integration test mistake. If the component fetches data, the DOM does not update immediately. Use `findBy` instead of `getBy` and always `await` it.

**Using real fetch instead of MSW**
If you forget to set up MSW, your component will attempt a real network request in the test environment. This will either fail silently or cause unpredictable results. Always verify your server setup file is included in `vitest.config.ts`.

**Putting too much in one test**
Integration tests are already more complex than unit or component tests. Keep each test focused on one scenario. If you are testing success, error, and loading all in one `it` block, split them up.

**Not resetting handlers between tests**
Without `server.resetHandlers()` in `afterEach`, a handler override in one test will affect all subsequent tests. Always include the reset in your setup file.

**Skipping the loading and error states**
It is tempting to only test the happy path. But loading and error states are real user experiences. Test all three: loading, success, and failure.

**Over-integrating**
Not every test needs to be an integration test. If a behavior can be verified with a unit test or component test, use those instead. Integration tests are more expensive to write and maintain — use them where they earn their cost.

Remember:

> Integration tests protect the connections. Unit and component tests protect the parts.

## Key Takeaways

- Integration tests verify that multiple pieces of your application work correctly together
- MSW intercepts network requests so your tests do not need a real server
- Default handlers cover the happy path — override them per test for error scenarios
- Always use `findBy` and `await` when testing async behavior
- `vi.fn()` lets you track whether callbacks were called
- Wrap components in providers when they depend on context
- A custom render helper avoids repeating provider setup across tests
- `screen.debug()` works the same way here — use it when a test fails unexpectedly
- Test loading, success, and error states as separate test cases
- Keep integration tests focused — one scenario per test

> If your component talks to the outside world, integration tests make sure the conversation goes as expected.
