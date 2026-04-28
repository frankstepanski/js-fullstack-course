# End-to-End Testing

End-to-end testing is the **top layer of the testing pyramid**.

While unit tests verify isolated logic, component tests verify individual UI components, and integration tests verify connected pieces, end-to-end tests verify that **your entire application works correctly from the user's perspective** — in a real browser, against a real server, the way a real person would use it.

E2E testing creates the highest level of confidence. If an E2E test passes, you know that a real user can successfully complete that flow.

## What You Will Learn in This Document

By the end of this document you will be able to:
- install and configure Playwright
- write your first E2E test
- find elements on a real page using locators
- simulate user interactions — clicking, typing, navigating
- assert that the right content appears
- handle navigation and page loading
- debug a failing test
- intercept network requests to test error states
- keep your tests organised and maintainable with the Page Object Model

## Before You Start — A Mental Shift

E2E testing feels different from everything you have written so far. In unit, component, and integration tests, you import code and call it directly. In E2E tests, you do not touch the source code at all.

Instead, you control a real browser like a remote control — telling it to navigate to a URL, click a button, type into a field, and check what appears on screen. Your application runs exactly as it would for a real user. The test just drives it.

That shift takes a moment to get used to, but the concepts are simpler than they look. If you can describe what a user does to complete a task, you can write an E2E test for it.

## What Is an End-to-End Test?

An **end-to-end test** simulates a real user navigating your application in a real browser.

An E2E test usually involves:
- opening a browser and navigating to a URL
- clicking buttons, filling out forms, and following links
- asserting that the right pages, messages, and content appear
- verifying complete user flows from start to finish

An E2E test:
- runs in a real browser (Chrome, Firefox, Safari)
- requires your application to actually be running
- tests the frontend and backend together
- is the slowest and most realistic type of automated test

> **Mental model:** "Can a real user successfully complete this flow?"

## How E2E Tests Differ from Everything Before

Everything covered in the previous documents — unit tests, component tests, integration tests — ran in Node.js with a simulated DOM. E2E tests are fundamentally different.

| | Unit / Component / Integration | E2E |
|---|---|---|
| Environment | Node.js + simulated DOM | Real browser |
| Application running? | No | Yes — required |
| Network requests | None or intercepted | Real requests |
| Speed | Fast to medium | Slowest |
| Realism | Partial | Highest |
| Maintenance cost | Low to medium | Highest |

Because E2E tests run a real browser against a real running application, they are slower, more complex to set up, and more likely to break due to things outside your code — network timing, environment differences, or minor UI changes. This is a worthwhile tradeoff for the confidence they provide on critical user flows.

> **Important:** E2E tests are not a replacement for unit, component, or integration tests. They are the final safety net — used sparingly on the most important flows in your application.

## Recommended Tool: Playwright

For modern web applications, **Playwright** is the recommended tool for E2E testing.

### Why Playwright?

- Supports real browsers — Chromium, Firefox, and WebKit (Safari)
- Excellent TypeScript support out of the box
- Fast and reliable — built to handle async behavior automatically
- Powerful built-in features — screenshots, video recording, network interception
- Runs tests in parallel by default
- Actively maintained by Microsoft

Playwright has become the modern standard for E2E testing and is well suited to beginners and experienced teams alike.

### What About Cypress?

**Cypress** is another popular E2E testing tool.

- Has a visual interactive test runner that is useful for debugging
- Strong community and ecosystem
- Slightly simpler initial setup for basic use cases

Cypress is a valid choice, especially if a team is already using it. However, for new projects, Playwright is generally the stronger choice — it supports more browsers, runs faster, and handles more complex scenarios more reliably.

## The Testing Pyramid

Before going further, it helps to understand where E2E tests sit relative to everything else:

```
        /\
       /  \
      / E2E \          ← few, slow, high confidence
     /--------\
    / Integration\     ← some, medium speed
   /--------------\
  /   Component    \   ← more, fast
 /------------------\
/     Unit Tests     \  ← many, fastest
```

The pyramid shape is intentional:
- Write **many** unit tests — they are fast and cheap
- Write **some** integration and component tests — they are slower and more complex
- Write **few** E2E tests — they are the slowest and most expensive to maintain

A common beginner mistake is trying to test everything with E2E tests because they feel the most realistic. In practice, a small focused set of E2E tests on critical paths — login, checkout, signup — provides most of the value at a fraction of the cost.

## Installing Playwright

Playwright has its own installer that sets everything up for you:

```bash
npm init playwright@latest
```

The installer will ask a few questions:

```
Where to put your end-to-end tests? › e2e
Add a GitHub Actions workflow? › No (for now)
Install Playwright browsers? › Yes
```

This creates:
- a `playwright.config.ts` configuration file
- an `e2e/` folder for your test files
- browser binaries for Chromium, Firefox, and WebKit

### What Gets Created

```
e2e/
  example.spec.ts       ← a sample test Playwright generates
playwright.config.ts    ← configuration file
```

### The Config File

Playwright's default config works well out of the box. Here is a simplified version of what it looks like:

```ts
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:5173", // your local dev server URL
    headless: true,                  // run without a visible browser window
    screenshot: "only-on-failure",   // capture screenshots on failure
    video: "retain-on-failure",      // save video recordings on failure
    trace: "on-first-retry",         // record a trace when a test is retried
  },
  webServer: {
    command: "npm run dev",          // start your app before tests run
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
```

The `webServer` option is the most important part for beginners — it tells Playwright to start your development server automatically before running tests, and shut it down when tests finish. Without it, your tests will fail immediately because there is no application to connect to.

> In plain English — `webServer` means you never have to manually start your app before running E2E tests. Playwright handles it for you.

### Running Tests

```bash
npx playwright test                   # run all E2E tests headlessly
npx playwright test --headed          # run with a visible browser window
npx playwright test login.spec.ts     # run a specific file
npx playwright test --ui              # open the interactive UI mode
npx playwright test --retries=2       # retry failed tests up to 2 times
```

The `--headed` flag opens a real browser window so you can watch the test run. **Always use this when writing new tests** — writing E2E tests without watching the browser is like coding with your eyes closed.

## Writing Your First E2E Test

E2E tests in Playwright use a `page` object that represents the browser tab. You use it to navigate, interact, and assert.

### The Simplest Possible Test

Start here — navigate to a page, find one element, assert it is visible. Nothing else.

```ts
// e2e/home.spec.ts
import { test, expect } from "@playwright/test";

test("homepage shows the welcome heading", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
});
```

Breaking this down line by line:
- `import { test, expect }` — Playwright's equivalents of `it` and `expect` from Vitest
- `async ({ page })` — `page` is provided automatically by Playwright. You do not create it yourself
- `await page.goto("/")` — opens the browser and navigates to your base URL
- `page.getByRole("heading", { name: "Welcome" })` — finds the heading with that text
- `await expect(...).toBeVisible()` — asserts the element is on screen
- Every line uses `await` — Playwright is fully asynchronous

Run it with:

```bash
npx playwright test --headed
```

Watch the browser open, navigate to your homepage, and close. If the heading is there, the test passes.

### The Arrange → Act → Assert Pattern Still Applies

```ts
test("user can search for a product", async ({ page }) => {
  // Arrange — navigate to the starting page
  await page.goto("/shop");

  // Act — interact with the page
  await page.getByRole("searchbox", { name: "Search" }).fill("keyboard");
  await page.getByRole("button", { name: "Search" }).click();

  // Assert — verify what the user sees
  await expect(page.getByText("Mechanical Keyboard")).toBeVisible();
});
```

The same thinking from unit, component, and integration tests applies — set up, act, assert. The difference is you are driving a real browser instead of calling functions directly.

### Grouping Tests with `test.describe`

Use `test.describe` to group related tests together, just like `describe` in Vitest:

```ts
test.describe("Login page", () => {
  test("shows the sign in form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("shows an error with wrong credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByRole("alert")).toContainText("Invalid email or password");
  });
});
```

## Basic Locators — Finding Elements on the Page

In Playwright, elements are found using **locators**. These work the same way as RTL queries — prefer locators that reflect how users actually see and use the page.

### The Locators You Will Use Most

```ts
// By role — always try this first
page.getByRole("button", { name: "Sign In" });
page.getByRole("heading", { name: "Dashboard" });
page.getByRole("link", { name: "Forgot password?" });
page.getByRole("textbox", { name: "Email" });
page.getByRole("checkbox", { name: "Remember me" });

// By label — best for form inputs
page.getByLabel("Email address");
page.getByLabel("Password");

// By visible text — good for paragraphs, headings, messages
page.getByText("Welcome back");
page.getByText("Welcome back", { exact: true }); // exact match

// By placeholder — for inputs with placeholder text
page.getByPlaceholder("Search products...");

// By alt text — for images
page.getByAltText("Profile photo");

// By test ID — last resort only
page.getByTestId("submit-button");
```

### Interacting with Locators

Once you have a locator, interact with it:

```ts
await page.getByRole("button", { name: "Submit" }).click();
await page.getByLabel("Email").fill("alice@example.com");
await page.getByLabel("Password").fill("password123");
await page.getByRole("checkbox", { name: "Remember me" }).check();
await page.getByLabel("Username").clear(); // clear existing value
```

All interactions are async — always use `await`.

### Locator Priority

Follow the same priority as RTL — the higher on this list, the better:

| Priority | Locator | Best for |
|---|---|---|
| 1 | `getByRole` | Buttons, headings, links, inputs |
| 2 | `getByLabel` | Form inputs with a label |
| 3 | `getByText` | Visible text content |
| 4 | `getByPlaceholder` | Inputs with placeholder text |
| 5 | `getByAltText` | Images |
| 6 | `getByTestId` | Last resort — requires adding `data-testid` |

> Avoid CSS selectors, XPath, and index-based locators like `nth(0)`. These break whenever the markup changes. Role and label locators survive most refactors.

## Advanced Locators

> **Note:** This section covers patterns you will need once your pages get more complex. If you are writing your first E2E tests, the basic locators above will get you far. Come back here when you hit a situation where a simple locator is not finding the right element.

### Chaining Locators

Sometimes an element is only unique within a specific part of the page. For example, there might be multiple "Edit" buttons — one per row in a table. Chain locators to narrow down to the right one:

```ts
// Find the Edit button inside the "Mechanical Keyboard" row specifically
const productRow = page.getByRole("row", { name: "Mechanical Keyboard" });
await productRow.getByRole("button", { name: "Edit" }).click();
```

In plain English — find the row first, then find the button inside that row. This is much more reliable than guessing which button is at index 2.

### Filtering Locators

When multiple elements match and chaining is not enough, use `filter()` to narrow down:

```ts
// Find the list item that contains "In Stock"
const inStockItem = page.getByRole("listitem").filter({ hasText: "In Stock" });

// Find the product card for a specific product, then click Add to Cart within it
const card = page.getByRole("article").filter({ hasText: "Mechanical Keyboard" });
await card.getByRole("button", { name: "Add to Cart" }).click();
```

`filter()` narrows a locator to only elements that match an additional condition. This avoids index-based selectors like `nth(0)` which break whenever item order changes.

### Getting Multiple Elements

When you expect multiple elements of the same type — a list of products, a set of rows — use `all()` to get them as an array:

```ts
const items = await page.getByRole("listitem").all();
expect(items).toHaveLength(5);

// verify each item is visible
for (const item of items) {
  await expect(item).toBeVisible();
}
```

Or use `toHaveCount` directly without converting to an array:

```ts
await expect(page.getByRole("listitem")).toHaveCount(5);
```

## Assertions in Playwright

Playwright has its own set of built-in assertions through `expect`. These are designed specifically for the browser.

### Common Assertions

```ts
// Visibility
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();

// Text content
await expect(locator).toHaveText("Welcome back");        // exact match
await expect(locator).toHaveText(/welcome/i);            // regex, case-insensitive
await expect(locator).toContainText("Welcome");          // partial match

// URL and title
await expect(page).toHaveURL("/dashboard");
await expect(page).toHaveURL(/dashboard/);               // regex
await expect(page).toHaveTitle("My App — Dashboard");

// Form state
await expect(locator).toBeEnabled();
await expect(locator).toBeDisabled();
await expect(locator).toBeChecked();
await expect(locator).toHaveValue("alice@example.com");
await expect(locator).toBeEmpty();                       // input with no value

// Count
await expect(locator).toHaveCount(3);

// Attributes
await expect(locator).toHaveAttribute("href", "/about");
await expect(locator).toHaveAttribute("aria-expanded", "true");
```

### Auto-Waiting

One of Playwright's most important features is **auto-waiting**.

When you assert that an element is visible, Playwright does not just check once and fail if it is not there. It waits — retrying up to a default of 5 seconds — for the condition to become true.

```ts
// Playwright waits up to 5 seconds for this heading to appear
await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
```

> In plain English — you do not need to tell Playwright to wait. It figures out the timing for you. This eliminates most of the flakiness that made older E2E tools frustrating to work with.

If an assertion is still failing after 5 seconds, the test fails with a clear message showing what was expected and what the page actually contained.

## Waiting for Navigation and Page Load

When a user clicks a link or submits a form, the browser navigates to a new page. You need to wait for that navigation to complete before asserting on the new page.

### `page.waitForURL()`

Use `waitForURL` to wait until the browser has navigated to a specific URL:

```ts
await page.getByRole("button", { name: "Sign In" }).click();
await page.waitForURL("/dashboard");

// now safe to assert on the dashboard content
await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
```

`waitForURL` accepts strings, regex, and glob patterns:

```ts
await page.waitForURL("/dashboard");        // exact string
await page.waitForURL(/dashboard/);         // regex
await page.waitForURL("**/dashboard");      // glob
```

### `page.waitForLoadState()`

Use `waitForLoadState` when a page makes several requests after loading and you need everything to settle before asserting:

```ts
await page.goto("/dashboard");
await page.waitForLoadState("networkidle"); // wait until no requests for 500ms
```

| State | When it resolves |
|---|---|
| `"load"` | The page `load` event has fired (default for `goto`) |
| `"domcontentloaded"` | The DOM is ready, resources may still be loading |
| `"networkidle"` | No network requests for at least 500ms |

> In plain English — `waitForURL` is for after you click a link or button and the page changes. `waitForLoadState` is for when the page is loaded but content is still appearing. Most of the time, Playwright's auto-waiting handles this without either one — reach for them only when auto-waiting is not enough.

## Reusing Setup with `beforeEach`

If multiple tests need the same starting point — like being logged in — use `beforeEach` to run setup before each test in a group:

```ts
test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    // runs before each test in this describe block
    await page.goto("/login");
    await page.getByLabel("Email").fill("alice@example.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.waitForURL("/dashboard");
  });

  test("shows the user's name", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Welcome, Alice" })).toBeVisible();
  });

  test("shows the recent activity section", async ({ page }) => {
    await expect(page.getByText("Recent Activity")).toBeVisible();
  });
});
```

Each test still gets a fresh browser context — `beforeEach` just runs the same setup steps at the start of each one. Tests never share state with each other.

## Debugging with `page.pause()`

When a test is failing and you cannot figure out why, `page.pause()` is one of the most useful tools available. It freezes the test at that exact point and opens Playwright's Inspector — an interactive tool that lets you explore the page and find the right locator.

```ts
test("user can complete checkout", async ({ page }) => {
  await page.goto("/cart");

  await page.pause(); // ← test freezes here, Inspector opens

  await page.getByRole("button", { name: "Checkout" }).click();
});
```

When the test hits `page.pause()`, a browser window opens with the Inspector. You can:
- hover over elements to see what locator Playwright suggests
- run locator queries in the Inspector console to test them live
- step through the remaining test actions one by one
- resume the test when you are ready

> `page.pause()` only works in headed mode. **Always remove it before committing** — a paused test will hang indefinitely in any automated environment.

## Network Interception in Playwright

Like MSW in integration tests, Playwright can intercept real network requests and return fake responses. This is useful when you want to test error states without needing your backend to actually return errors.

### When to Use Network Interception in E2E Tests

For most E2E tests, let real network requests happen — that is the point of E2E testing. Use interception selectively for:
- error states that are hard or unreliable to trigger with a real backend
- loading states that resolve too quickly to catch in a real environment
- avoiding slow third-party API calls that are not what you are testing

### Returning an Error Response

Use `page.route()` to intercept a request and return a controlled response:

```ts
test("shows an error message when the API fails", async ({ page }) => {
  // intercept GET requests to /api/products and return a server error
  await page.route("/api/products", (route) => {
    route.fulfill({
      status: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    });
  });

  await page.goto("/products");

  await expect(page.getByRole("alert")).toContainText("Something went wrong");
});
```

### Returning Fake Data

Return fake JSON data when you want consistent test data regardless of the backend:

```ts
test("displays a list of products", async ({ page }) => {
  await page.route("/api/products", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: 1, name: "Mechanical Keyboard", price: 79.99 },
        { id: 2, name: "Wireless Mouse", price: 39.99 },
      ]),
    });
  });

  await page.goto("/products");

  await expect(page.getByText("Mechanical Keyboard")).toBeVisible();
  await expect(page.getByText("Wireless Mouse")).toBeVisible();
});
```

### Aborting a Request

Abort a request to simulate a complete network failure:

```ts
test("shows an error when there is no network", async ({ page }) => {
  await page.route("/api/user", (route) => route.abort());

  await page.goto("/profile");

  await expect(page.getByRole("alert")).toContainText("Failed to load");
});
```

> In plain English — `page.route()` lets you intercept any request your app makes and decide what comes back. You can return success data, error codes, or nothing at all.

## The Page Object Model

> **Note:** This is an intermediate pattern. If you are writing your first E2E tests, skip this section and come back when your test files start to feel repetitive. You do not need it to get started.

As your E2E test suite grows, you will notice the same locators and interactions appearing across multiple test files. If the "Sign In" button text changes to "Log In", you have to update every test file that uses it.

The **Page Object Model (POM)** solves this by grouping the locators and actions for each page into a reusable class. There is then one place to update when things change.

### Without Page Objects — the Problem

```ts
// login.spec.ts
await page.getByLabel("Email").fill("alice@example.com");
await page.getByLabel("Password").fill("password123");
await page.getByRole("button", { name: "Sign In" }).click();

// dashboard.spec.ts — same locators repeated
await page.getByLabel("Email").fill("alice@example.com");
await page.getByLabel("Password").fill("password123");
await page.getByRole("button", { name: "Sign In" }).click();
```

### With Page Objects — the Solution

```ts
// e2e/pages/LoginPage.ts
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.submitButton = page.getByRole("button", { name: "Sign In" });
    this.errorMessage = page.getByRole("alert");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

Now use it in tests:

```ts
// e2e/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

test("user can log in with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("alice@example.com", "password123");

  await expect(page).toHaveURL("/dashboard");
});

test("shows an error with invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("wrong@example.com", "wrongpassword");

  await expect(loginPage.errorMessage).toContainText("Invalid email or password");
});
```

The tests are shorter, easier to read, and easier to maintain. If a locator changes, update the page object once — not every test.

### A Second Page Object Example

```ts
// e2e/pages/ProductsPage.ts
import { Page, Locator } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole("searchbox", { name: "Search products" });
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.productCards = page.getByRole("article");
    this.noResultsMessage = page.getByText("No products found");
  }

  async goto() {
    await this.page.goto("/products");
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async addToCart(productName: string) {
    const card = this.productCards.filter({ hasText: productName });
    await card.getByRole("button", { name: "Add to Cart" }).click();
  }
}
```

```ts
// e2e/products.spec.ts
import { test, expect } from "@playwright/test";
import { ProductsPage } from "./pages/ProductsPage";

test("search returns matching products", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.goto();
  await productsPage.search("keyboard");

  await expect(productsPage.productCards).toHaveCount(2);
});

test("shows a message when no products match", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.goto();
  await productsPage.search("xyzunknownproduct");

  await expect(productsPage.noResultsMessage).toBeVisible();
});
```

### When to Introduce Page Objects

- Start without page objects — write tests directly with `page` locators
- Add page objects when you notice the same locators appearing in more than one test file
- Page objects are a tool for managing complexity, not a requirement from day one

## Screenshots and Video Recording

Playwright automatically captures screenshots and video when a test fails, making it much easier to understand what went wrong.

This is already configured in the config file shown earlier:

```ts
use: {
  screenshot: "only-on-failure",
  video: "retain-on-failure",
  trace: "on-first-retry",
},
```

After a failed test, files are saved in `test-results/`. To view a trace interactively:

```bash
npx playwright show-trace test-results/trace.zip
```

The trace viewer shows every action the test took, a screenshot at each step, network requests made, and console logs. It is like rewinding the test and watching it happen step by step — one of the most powerful debugging tools Playwright provides.

## When an E2E Test Fails

E2E test failures can come from more places than any other test type. Work through these possibilities:

**1. The application has a bug.**
The user flow is genuinely broken. This is the test doing its job — fix the application.

**2. The locator is wrong.**
The element exists but the locator cannot find it. Run with `--headed` to watch the test, or use `page.pause()` to inspect the page interactively.

**3. A navigation or timing issue.**
The page has not finished loading or navigating before the assertion runs. Add `waitForURL` or `waitForLoadState` after navigation actions.

**4. The test environment differs from expectations.**
Test data, API responses, or server configuration does not match what the test assumes. Check that your local server is running and returning expected data.

**5. A flaky test.**
The test fails intermittently — passes sometimes, fails others. This is almost always a missing `await` or a race condition. Investigate and fix rather than relying on retries.

### Debugging Toolkit

```bash
# Watch the test run in a real browser
npx playwright test login.spec.ts --headed

# Open the interactive UI mode — step through tests visually
npx playwright test --ui

# View a saved trace after a failure
npx playwright show-trace test-results/trace.zip
```

Add `page.pause()` to freeze the test at any point and inspect the page manually. Remove it before committing.

## What Should Be E2E Tested

Good candidates for E2E tests:

- user authentication — login, logout, signup, password reset
- critical conversion flows — checkout, form submission, account creation
- navigation — do links and routes work correctly?
- protected routes — does the app redirect unauthenticated users?
- full form flows that involve validation, submission, and a result
- anything that, if broken, would immediately stop users from using the app

If a flow is genuinely critical — if it broke, users could not use the app — it deserves an E2E test.

## What Not to E2E Test

Avoid E2E tests for:

- logic that can be covered by a unit test
- UI behavior covered by a component test
- every possible error state and edge case — use integration tests for these
- styling, layout, and visual details
- things already well covered by lower-level tests

The goal is not to replace everything else with E2E tests. The goal is to add a final layer of confidence on the flows that matter most.

## How Many E2E Tests Should You Write?

A practical guideline for a typical application:

- **Unit tests** — as many as your logic needs. Often hundreds.
- **Component tests** — one per significant UI behavior. Often dozens.
- **Integration tests** — one per connected flow or API interaction. Often dozens.
- **E2E tests** — one per critical user journey. Often ten to thirty.

More is not always better with E2E tests. A lean, focused set that covers your most important flows is more valuable than a large suite that is slow, brittle, and hard to maintain.

## Organizing E2E Tests

```
e2e/
  pages/
    LoginPage.ts          ← page object for the login page
    ProductsPage.ts       ← page object for the products page
  login.spec.ts           ← login flow tests
  signup.spec.ts          ← signup flow tests
  navigation.spec.ts      ← navigation and routing tests
  checkout.spec.ts        ← checkout flow tests
playwright.config.ts
```

Name test files after the feature or flow — not the component. E2E tests are about user journeys.

Add generated files to `.gitignore`:

```
test-results/
playwright-report/
```

## E2E Tests vs the Rest

| | Unit | Component | Integration | E2E |
|---|---|---|---|---|
| What they test | Isolated logic | Single UI | Connected pieces | Full user flows |
| Environment | Node.js | Node.js + jsdom | Node.js + jsdom | Real browser |
| App running? | No | No | No | Yes |
| Speed | Fastest | Fast | Medium | Slowest |
| Realism | Low | Medium | High | Highest |
| Maintenance | Lowest | Low | Medium | Highest |
| Tools | Vitest | Vitest + RTL | Vitest + RTL + MSW | Playwright |

All four layers work together. Remove any one and your testing strategy has a gap.

## Quick Reference

A cheat sheet of the most common Playwright methods:

| Method | What it does |
|---|---|
| `page.goto("/path")` | Navigate to a URL |
| `page.getByRole("button", { name: "X" })` | Find an element by its ARIA role |
| `page.getByLabel("Email")` | Find an input by its label |
| `page.getByText("Welcome")` | Find an element by visible text |
| `page.getByPlaceholder("Search...")` | Find an input by placeholder |
| `page.getByTestId("id")` | Find an element by `data-testid` |
| `locator.click()` | Click an element |
| `locator.fill("text")` | Type into an input |
| `locator.clear()` | Clear an input's value |
| `locator.check()` | Check a checkbox |
| `page.waitForURL("/path")` | Wait for navigation to complete |
| `page.waitForLoadState("networkidle")` | Wait for all requests to finish |
| `page.pause()` | Freeze test and open Inspector (debug only) |
| `page.route("/api/x", handler)` | Intercept a network request |
| `expect(locator).toBeVisible()` | Assert element is visible |
| `expect(locator).toContainText("x")` | Assert element contains text |
| `expect(page).toHaveURL("/path")` | Assert current URL |
| `expect(locator).toBeDisabled()` | Assert element is disabled |
| `expect(locator).toHaveCount(n)` | Assert number of matching elements |
| `screen.debug()` → `page.pause()` | The E2E equivalent of RTL's debug tool |

## Common Beginner Mistakes

**Testing everything with E2E tests**
E2E tests are the most expensive to write and maintain. If something can be tested at a lower level, test it there. E2E tests cover critical paths only.

**Not using `--headed` when writing tests**
Writing E2E tests without watching the browser is like coding with your eyes closed. Always use `--headed` when creating new tests.

**Tests that depend on each other**
Each test must be fully independent. If test B relies on test A having run first, a failure in A will cascade into B misleadingly. Use `beforeEach` to set up state fresh for every test.

**Using fragile locators**
Querying by CSS class, element position, or auto-generated IDs creates tests that break whenever markup changes. Use `getByRole`, `getByLabel`, and `getByText`.

**Using index-based locators**
`page.getByRole("button").nth(0)` breaks whenever the order of elements changes. Use chaining and filtering instead.

**Ignoring flaky tests**
A test that fails intermittently is a test you cannot trust. Do not use retries to hide the problem — investigate it. The cause is almost always a missing `await` or a timing issue.

**Not testing the unhappy path**
It is easy to only test the happy path. Error states and failure flows are real user experiences. Cover at least one failure scenario per critical flow.

**Forgetting that the app must be running**
E2E tests require a running application. Use the `webServer` config option to automate this — without it, tests fail immediately with connection errors.

**Leaving `page.pause()` in committed code**
A paused test hangs indefinitely in any automated environment. Always remove `page.pause()` before committing.

Remember:

> E2E tests are not better than unit tests — they are different. Each layer catches different bugs.

## Key Takeaways

- E2E tests simulate real users in a real browser — the most realistic type of automated test
- You are controlling a browser like a remote control — not calling functions directly
- Playwright is the modern recommended tool — fast, reliable, and TypeScript-native
- E2E tests require your application to be running — `webServer` in the config automates this
- Use `getByRole` and `getByLabel` first — the same priority as RTL
- Playwright auto-waits — you rarely need to write manual waits
- Use `waitForURL` after navigation, `waitForLoadState` when page content takes time to settle
- Use `page.pause()` to freeze a test and inspect the page — remove it before committing
- Use `page.route()` to intercept network requests and simulate errors
- The Page Object Model keeps tests maintainable as the suite grows — but start without it
- Screenshots, video, and traces are captured automatically on failure
- Write few E2E tests — focus on the flows that matter most to real users
- Each test must be fully independent

> If a real user cannot complete this flow, your whole application fails. E2E tests make sure they can.
