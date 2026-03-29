# Component Testing

Component testing is the **next layer above unit testing**.

While unit tests verify isolated logic, component tests verify that **UI components behave correctly when users interact with them**. They focus on *what the user sees and does*, not how the component is implemented internally.

Component testing creates confidence that your UI works as intended — even as components are refactored or extended.

## What Is a Component Test?

A **component test** renders a UI component in a simulated environment and interacts with it the way a user would.

In JavaScript (and especially React), a component test usually involves:
- rendering a component
- querying the DOM for visible text or elements
- simulating user actions (clicks, typing)
- asserting what appears on the screen

A component test:
- runs in a simulated DOM (not a real browser)
- focuses on user-visible behavior
- does not test implementation details
- avoids real network requests

> **Mental model:** "If a user clicked this, would the UI respond correctly?"

## Recommended Tools: Vitest + React Testing Library

For modern frontend projects, component testing is commonly done using:

- **Vitest** — test runner and assertion library
- **React Testing Library (RTL)** — utilities for rendering components and querying the DOM

### Why React Testing Library?

React Testing Library is designed around a single philosophy:

> *The more your tests resemble the way your software is used, the more confidence they give you.*

Instead of testing component internals, RTL encourages you to:
- query by text users see
- interact the way users do
- avoid testing React-specific implementation details

This makes your tests more resilient. If you refactor a component's internals without changing what it shows or does, your tests should still pass.

### What About Enzyme?

**Enzyme** is an older React testing library that takes the opposite approach — it encourages testing component internals like state and props directly. Most teams have moved away from it in favor of React Testing Library, which produces more meaningful and maintainable tests.

## Installing Component Testing Tools

Install the required dependencies:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Add a test script if you don't already have one:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

### Configuring Vitest for Component Testing

Component tests require a browser-like environment because they interact with the DOM. Vitest does not set this up by default — you need to configure it.

Install `jsdom`:

```bash
npm install -D jsdom
```

Then create or update your `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",  // simulates a browser environment
    setupFiles: "./src/test/setup.ts",
  },
});
```

Create the setup file at `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom";
```

This imports the custom matchers from `jest-dom` (like `toBeInTheDocument`) so they are available in every test.

> Without `environment: "jsdom"`, your component tests will fail with errors like `document is not defined`. This is one of the most common setup mistakes beginners make.

## Basic Component Test Example

### Example Component

```tsx
// Counter.tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Component Test

```tsx
// Counter.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("starts at zero", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("increments the count when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole("button", { name: "Increment" }));

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
```

This test verifies:
- the component renders with an initial state
- the button is clickable
- the UI updates correctly after interaction

### Understanding `screen`

`screen` is the main way to query the DOM in React Testing Library. It represents the entire rendered document and gives you access to all query methods.

```tsx
render(<Counter />);

// screen gives you access to everything rendered
screen.getByText("Count: 0");
screen.getByRole("button", { name: "Increment" });
```

You may see older examples that destructure queries from `render()` directly:

```tsx
const { getByText } = render(<Counter />); // older pattern
```

The `screen` approach is now preferred because it is consistent and easier to read, especially when multiple queries are used in a single test.

## The Arrange → Act → Assert Pattern (Components)

Component tests still follow the same structure:

1. **Arrange** — render the component
2. **Act** — simulate user interaction
3. **Assert** — verify what the user sees

```tsx
// Arrange
render(<LoginForm />);

// Act
await user.click(screen.getByRole("button", { name: "Submit" }));

// Assert
expect(screen.getByText("Email is required")).toBeInTheDocument();
```

This keeps component tests readable and predictable.

## Testing What Renders

Before testing interactions, you need to know how to test what a component **displays**. This is the most fundamental type of component test — simply checking that the right elements appear on screen.

These tests answer questions like:
- Does this component show the right text?
- Does it render the correct number of items?
- Does it show or hide elements based on props?
- What does it look like in its default state?

### Testing Default Output

The simplest component test just renders a component and checks that expected elements are present.

```tsx
// Greeting.tsx
export function Greeting() {
  return (
    <div>
      <h1>Welcome back</h1>
      <p>You have 3 new messages.</p>
    </div>
  );
}
```

```tsx
// Greeting.test.tsx
import { render, screen } from "@testing-library/react";
import { Greeting } from "./Greeting";

it("renders the welcome heading", () => {
  render(<Greeting />);
  expect(screen.getByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
});

it("renders the message count", () => {
  render(<Greeting />);
  expect(screen.getByText("You have 3 new messages.")).toBeInTheDocument();
});
```

No clicks, no typing — just render and assert. This is a valid and useful test on its own.

### Testing Props

Most components receive props that change what they display. Testing props means verifying that different inputs produce different visible output.

```tsx
// UserCard.tsx
type Props = {
  name: string;
  role: string;
};

export function UserCard({ name, role }: Props) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}
```

```tsx
// UserCard.test.tsx
import { render, screen } from "@testing-library/react";
import { UserCard } from "./UserCard";

it("displays the user's name", () => {
  render(<UserCard name="Alice" role="Admin" />);
  expect(screen.getByRole("heading", { name: "Alice" })).toBeInTheDocument();
});

it("displays the user's role", () => {
  render(<UserCard name="Alice" role="Admin" />);
  expect(screen.getByText("Admin")).toBeInTheDocument();
});

it("displays a different name when a different prop is passed", () => {
  render(<UserCard name="Bob" role="Viewer" />);
  expect(screen.getByRole("heading", { name: "Bob" })).toBeInTheDocument();
});
```

Each test passes different props and verifies the output changes accordingly. This ensures the component responds correctly to whatever data it receives.

### Testing Conditional Rendering

Conditional rendering is when a component shows or hides elements based on a prop or state. This is one of the most important things to test because it is where UI bugs commonly hide.

```tsx
// StatusBadge.tsx
type Props = {
  isActive: boolean;
};

export function StatusBadge({ isActive }: Props) {
  return (
    <span>
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
```

```tsx
// StatusBadge.test.tsx
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "./StatusBadge";

it("shows Active when isActive is true", () => {
  render(<StatusBadge isActive={true} />);
  expect(screen.getByText("Active")).toBeInTheDocument();
});

it("shows Inactive when isActive is false", () => {
  render(<StatusBadge isActive={false} />);
  expect(screen.getByText("Inactive")).toBeInTheDocument();
});
```

Always test both sides of a conditional — the truthy and falsy case. Only testing one side leaves half the behavior unverified.

### Testing That Something Is Not Rendered

Sometimes the test is that an element does **not** appear. For this, use `queryBy` instead of `getBy`.

```tsx
// Alert.tsx
type Props = {
  message?: string;
};

export function Alert({ message }: Props) {
  if (!message) return null;

  return <p role="alert">{message}</p>;
}
```

```tsx
// Alert.test.tsx
import { render, screen } from "@testing-library/react";
import { Alert } from "./Alert";

it("renders the alert message when provided", () => {
  render(<Alert message="Something went wrong" />);
  expect(screen.getByRole("alert")).toBeInTheDocument();
});

it("renders nothing when no message is provided", () => {
  render(<Alert />);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
```

> **Why `queryBy` and not `getBy`?** If you use `getBy` and the element is not there, RTL throws an error immediately — before your assertion even runs. `queryBy` returns `null` when nothing is found, which lets `.not.toBeInTheDocument()` do its job.

This is one of the most common mistakes beginners make. Memorize the rule:
- Use `getBy` when the element **must** be there
- Use `queryBy` when checking the element is **absent**

### Testing Lists

When a component renders a list of items from an array, you want to verify the right number of items appear and that the correct content is displayed.

```tsx
// FruitList.tsx
type Props = {
  fruits: string[];
};

export function FruitList({ fruits }: Props) {
  if (fruits.length === 0) {
    return <p>No fruits available.</p>;
  }

  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}
```

```tsx
// FruitList.test.tsx
import { render, screen } from "@testing-library/react";
import { FruitList } from "./FruitList";

it("renders all fruits in the list", () => {
  render(<FruitList fruits={["Apple", "Banana", "Cherry"]} />);

  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.getByText("Banana")).toBeInTheDocument();
  expect(screen.getByText("Cherry")).toBeInTheDocument();
});

it("renders the correct number of list items", () => {
  render(<FruitList fruits={["Apple", "Banana", "Cherry"]} />);

  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(3);
});

it("shows a message when the list is empty", () => {
  render(<FruitList fruits={[]} />);

  expect(screen.getByText("No fruits available.")).toBeInTheDocument();
});
```

Note the use of `getAllByRole` — this returns **all** matching elements as an array, which lets you check the count with `toHaveLength`. Use `getAllBy` when you expect multiple elements of the same type.

| Query | Returns | Use when |
|---|---|---|
| `getBy` | Single element (throws if 0 or 2+) | Exactly one match expected |
| `getAllBy` | Array of elements (throws if 0) | Multiple matches expected |
| `queryBy` | Single element or null | Checking absence |
| `queryAllBy` | Array or empty array | Checking count or absence of multiple |

### Testing Loading and Error States

Components often display different UI depending on whether data is loading or an error has occurred. These states are important to test because they directly affect what the user sees.

```tsx
// UserProfile.tsx
type Props = {
  isLoading: boolean;
  error: string | null;
  name: string | null;
};

export function UserProfile({ isLoading, error, name }: Props) {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  return <h1>{name}</h1>;
}
```

```tsx
// UserProfile.test.tsx
import { render, screen } from "@testing-library/react";
import { UserProfile } from "./UserProfile";

it("shows a loading indicator while loading", () => {
  render(<UserProfile isLoading={true} error={null} name={null} />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

it("shows an error message when an error occurs", () => {
  render(<UserProfile isLoading={false} error="Failed to load user" name={null} />);
  expect(screen.getByRole("alert")).toHaveTextContent("Failed to load user");
});

it("shows the user's name when data is loaded", () => {
  render(<UserProfile isLoading={false} error={null} name="Alice" />);
  expect(screen.getByRole("heading", { name: "Alice" })).toBeInTheDocument();
});
```

Each state gets its own test. This ensures all three code paths are verified — not just the happy path.

### `role="alert"` — What Is It and Why Use It?

You may have noticed `role="alert"` in some of the examples above. This is an HTML attribute that marks an element as an alert region — it signals to screen readers and assistive technologies that the content is important and should be announced immediately.

In tests, it makes error messages easy to query:

```tsx
// In the component
<p role="alert">Something went wrong</p>

// In the test
screen.getByRole("alert");
```

It is better than querying by text because the test stays valid even if the error message wording changes — as long as the `role` is still `alert`.

> Using `role="alert"` for error messages is also good accessibility practice, not just a testing convenience. It is a habit worth building from the start.

## `userEvent` vs `fireEvent`

React Testing Library provides two ways to simulate user interactions.

### `fireEvent`

`fireEvent` dispatches a single DOM event directly.

```tsx
import { fireEvent } from "@testing-library/react";

fireEvent.click(screen.getByRole("button"));
```

It is simple but limited — it does not simulate the full sequence of events a real user triggers. For example, clicking a button in a real browser fires `mousedown`, `mouseup`, and `click` events in sequence. `fireEvent.click` fires only `click`.

### `userEvent` (Recommended)

`userEvent` simulates realistic user behavior by firing the full sequence of events.

```tsx
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
await user.click(screen.getByRole("button"));
await user.type(screen.getByRole("textbox"), "hello");
```

`userEvent` is async — always use `await` with it.

**Rule of thumb:** Use `userEvent` for all new tests. Use `fireEvent` only when you need to fire a specific low-level event that `userEvent` does not cover.

## Querying the DOM

Queries are how you find elements in the rendered output. RTL provides several query families, each suited to a different situation.

### The Three Query Families

| Family | Throws if not found? | Returns | Use when |
|---|---|---|---|
| `getBy...` | Yes | Single element | Element should always be present |
| `queryBy...` | No (returns `null`) | Single element or null | Checking an element is *not* present |
| `findBy...` | Yes (after timeout) | Promise | Element appears asynchronously |

```tsx
// getBy — use when the element must be there
screen.getByText("Submit");

// queryBy — use when checking something is absent
expect(screen.queryByText("Error")).not.toBeInTheDocument();

// findBy — use when waiting for async updates
const message = await screen.findByText("Saved successfully");
```

> A common beginner mistake is using `getBy` to assert something is *not* present. This throws an error before the assertion even runs. Use `queryBy` instead.

### Query Priority

RTL has a recommended order for which queries to use. Queries higher on the list are preferred because they more closely reflect how users perceive the page.

1. **`getByRole`** — the most preferred query. Matches by ARIA role.
2. **`getByLabelText`** — great for form inputs associated with a label.
3. **`getByPlaceholderText`** — for inputs with a placeholder.
4. **`getByText`** — for non-interactive elements like paragraphs or headings.
5. **`getByDisplayValue`** — for inputs with a current value.
6. **`getByAltText`** — for images.
7. **`getByTitle`** — for elements with a title attribute.
8. **`getByTestId`** — last resort only. Requires adding `data-testid` attributes to your markup.

```tsx
// Preferred — role-based
screen.getByRole("button", { name: "Submit" });

// Good — label-based (for form inputs)
screen.getByLabelText("Email address");

// Acceptable — text-based
screen.getByText("Welcome back");

// Avoid if possible — ties tests to implementation details
screen.getByTestId("submit-btn");
```

> Prefer `getByRole` whenever possible. It tests accessibility at the same time — if a role query can't find your element, that may signal an accessibility problem in the markup.

### `getByRole` Common Roles

```tsx
screen.getByRole("button", { name: "Save" });
screen.getByRole("textbox", { name: "Email" });
screen.getByRole("checkbox", { name: "Remember me" });
screen.getByRole("heading", { name: "Welcome" });
screen.getByRole("link", { name: "Sign in" });
screen.getByRole("img", { name: "Profile photo" });
```

The `name` option matches the accessible name — usually the visible label or button text.

## Common Matchers for Component Tests

These matchers from `@testing-library/jest-dom` are the ones you will use most often.

### Presence

```tsx
expect(element).toBeInTheDocument();
expect(element).not.toBeInTheDocument(); // use queryBy when checking absence
```

### Visibility

```tsx
expect(element).toBeVisible();
expect(element).not.toBeVisible();
```

### Form State

```tsx
expect(input).toBeDisabled();
expect(input).toBeEnabled();
expect(input).toBeChecked();
expect(input).toHaveValue("hello@example.com");
```

### Text Content

```tsx
expect(element).toHaveTextContent("Welcome");
expect(element).toHaveTextContent(/welcome/i); // regex, case-insensitive
```

### Attributes

```tsx
expect(link).toHaveAttribute("href", "/dashboard");
expect(img).toHaveAttribute("alt", "Profile photo");
```

## Async Component Testing

Many components update after an async operation — a fetch, a timeout, or a state change triggered by a promise. Testing these requires waiting for the DOM to update.

### `findBy` Queries

`findBy` queries wait for an element to appear (up to 1 second by default):

```tsx
it("shows a success message after saving", async () => {
  const user = userEvent.setup();
  render(<SaveButton />);

  await user.click(screen.getByRole("button", { name: "Save" }));

  // waits for the element to appear
  const message = await screen.findByText("Saved successfully");
  expect(message).toBeInTheDocument();
});
```

### `waitFor`

`waitFor` waits for an assertion to pass, retrying until it does or times out:

```tsx
import { waitFor } from "@testing-library/react";

await waitFor(() => {
  expect(screen.getByText("Data loaded")).toBeInTheDocument();
});
```

Use `waitFor` when you need to assert on something that changes asynchronously but is not a new element appearing — for example, an element's text changing after a delay.

> Always `await` async queries and `waitFor`. Forgetting `await` is one of the most common causes of tests that pass incorrectly.

## A Realistic Form Example

Pure counter examples are useful for learning, but real components are more complex. Here is a more realistic example — a login form with validation.

### The Component

```tsx
// LoginForm.tsx
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
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
      {error && <p role="alert">{error}</p>}
      <button type="submit">Sign In</button>
    </form>
  );
}
```

### The Tests

```tsx
// LoginForm.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("renders the email input and submit button", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("shows a validation error for an invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "notanemail");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(
      screen.getByRole("alert")
    ).toHaveTextContent("Please enter a valid email address");
  });

  it("does not show an error for a valid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
```

Each test covers one specific behavior. The tests read like plain descriptions of what the user does and what they should see.

## When a Component Test Fails

Component test failures can be harder to read than unit test failures. RTL provides useful output to help debug them.

### Common Failure Output

```
TestingLibraryElementError: Unable to find an element with the text: "Submit"

Here is the output of your component:

<div>
  <form>
    <button>Sign In</button>
  </form>
</div>
```

RTL prints the rendered HTML when a query fails. This tells you:
- exactly what is in the DOM
- why the query could not find what it was looking for

In this case, the test looked for "Submit" but the button says "Sign In". Fix the query or the component text.

### Using `screen.debug()`

If you are unsure what is rendered, call `screen.debug()` to print the current DOM:

```tsx
render(<MyComponent />);
screen.debug(); // prints the full rendered HTML to the console
```

This is the fastest way to understand what your component is actually rendering during a test.

### Two Reasons a Component Test Fails

**1. The component has a bug.**
The UI is not rendering or behaving correctly. Fix the component.

**2. The test query is wrong.**
The test is looking for something that exists but with the wrong query. Check the rendered output with `screen.debug()` and adjust the query.

> If a test passes but you are not confident it is actually testing the right thing, add `screen.debug()` temporarily and read the output.

## What Should Be Component Tested

Good candidates for component tests:

- button clicks that change visible output
- form validation messages
- conditional rendering (what shows or hides based on state or props)
- loading and error states
- user interaction flows within a single component

If behavior is visible to the user and driven by interaction, it belongs in a component test.

## What Not to Component Test

Avoid component tests for:

- internal state variable values
- private helper functions inside a component
- styling details (colors, margins, fonts)
- React internals
- complex API or backend behavior (use integration tests for that)

Component tests should survive refactors. If a test breaks because you renamed an internal variable or reorganized state, it is too tightly coupled to implementation details.

## Component Tests vs Unit Tests

| | Unit Tests | Component Tests |
|---|---|---|
| What they test | Pure logic | UI behavior |
| DOM required | No | Yes (jsdom) |
| Speed | Fastest | Slightly slower |
| User interaction | No | Yes |
| Main tool | Vitest | Vitest + RTL |

Both are essential. Unit tests verify the logic that powers your UI. Component tests verify the UI itself. They complement each other.

## Organizing Component Tests

Follow the same conventions from unit testing:

```
src/
  components/
    LoginForm.tsx
    LoginForm.test.tsx
  ui/
    Button.tsx
    Button.test.tsx
```

One test file per component. Test files live next to the component they test.

### Naming Component Tests Clearly

```tsx
// Too vague
it("works correctly", () => { ... });

// Clear and descriptive
it("shows a validation error when the email field is empty", () => { ... });
```

Good test names describe a specific user scenario. When the test fails, the name alone should tell you what broke.

## Common Beginner Mistakes

**Using `getBy` to assert absence**
`getBy` throws when the element is not found — so your test errors before the assertion runs. Use `queryBy` with `.not.toBeInTheDocument()` instead.

**Querying by class names or test IDs first**
Reaching for `getByTestId` or querying by CSS class is a sign the test is coupled to implementation. Prefer `getByRole` and `getByLabelText`.

**Forgetting `await` with `userEvent`**
`userEvent` is async. Forgetting `await` means the interaction has not completed before the assertion runs, causing tests to pass incorrectly or fail unpredictably.

**Forgetting `jsdom` configuration**
Component tests will fail immediately without the correct Vitest environment setup. If you see errors like `document is not defined`, check your `vitest.config.ts`.

**Testing too much in one test**
Each test should verify one behavior. If a test simulates five interactions and checks three things, split it up.

**Overusing snapshots**
Snapshot tests capture the full rendered output of a component. They break on any markup change — including harmless ones — and beginners often approve broken snapshots without reviewing them. Use specific assertions instead.

Remember:

> Test what the user sees and does — not how the component works internally.

## Key Takeaways

- Component tests verify UI behavior from the user's perspective
- Vitest + React Testing Library is the modern standard
- Configure `jsdom` in Vitest — component tests require a DOM environment
- Use `userEvent` over `fireEvent` for realistic interaction simulation
- Prefer `getByRole` and `getByLabelText` over `getByTestId`
- Know the difference between `getBy`, `queryBy`, and `findBy`
- Use `findBy` and `waitFor` for async updates
- `screen.debug()` is your best friend when a test fails unexpectedly
- Test behavior, not implementation — tests should survive refactoring
- One test per behavior, one test file per component

> If users interact with it, it deserves a component test.
