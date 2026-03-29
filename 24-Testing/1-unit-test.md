# Unit Testing

Unit testing is the **foundation of automated testing**.

A unit test verifies that a **small, isolated piece of logic** behaves exactly as expected. When unit tests are solid, they create confidence that the core logic of your application is correct — even as the code changes over time.

## What Is a Unit Test?

A **unit** is the smallest testable piece of code.

In JavaScript, a unit is usually:
- a function
- a utility helper
- a calculation
- a reducer
- a data transformation

A unit test:
- runs quickly
- has no side effects
- does not depend on the DOM
- does not depend on the network
- does not depend on external services

> **Mental model:** "If this function broke, would a unit test catch it?"

## Recommended Tool: Vitest

For modern JavaScript projects, **Vitest** is one of the best tools for unit testing.

### Why Vitest?

- Extremely fast
- Minimal configuration
- Native TypeScript support
- Works seamlessly with Vite projects
- Uses familiar syntax (`describe`, `it`, `expect`)

Vitest is designed for modern ESM-based projects and integrates naturally into current frontend and backend workflows.

### What About Jest?

**Jest** is another very popular unit testing framework.

- It has been around longer
- It has a very large ecosystem
- It is widely used in older and large-scale projects

Many teams still use Jest successfully. However, for new projects — especially those using Vite — Vitest is often the simpler and faster choice.

## Installing Vitest

For a typical project:

```bash
npm install -D vitest
```

Add a script to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Run tests with:

```bash
npm run test
```

### Useful CLI Flags

```bash
npm run test -- --watch        # re-run tests on file change (default in dev)
npm run test -- --run          # run once and exit (useful in CI)
npm run test -- --coverage     # generate a coverage report
npm run test -- sum.test.ts    # run a specific test file
```

### Vitest Config (Optional)

For more control, add a `vitest.config.ts` file:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,       // use describe/it/expect without importing
    environment: "node", // or "jsdom" for browser-like tests
  },
});
```

## Basic Unit Test Example (Vitest)

### Example Function

```ts
// sum.ts
export function sum(a: number, b: number) {
  return a + b;
}
```

### Unit Test

```ts
// sum.test.ts
import { describe, it, expect } from "vitest";
import { sum } from "./sum";

describe("sum()", () => {
  it("adds two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
```

This test verifies:
- correct logic
- predictable output
- no external dependencies

### Understanding `describe` and `it`

- `describe` groups related tests together under a label
- `it` (or `test`) defines a single test case
- Nesting `describe` blocks is allowed for further organization

```ts
describe("formatPrice()", () => {
  describe("when given a whole number", () => {
    it("formats with two decimal places", () => {
      expect(formatPrice(10)).toBe("$10.00");
    });
  });

  describe("when given a decimal", () => {
    it("rounds to two decimal places", () => {
      expect(formatPrice(9.999)).toBe("$10.00");
    });
  });
});
```

## The Arrange → Act → Assert Pattern

Most unit tests follow this structure:

1. **Arrange** — set up inputs
2. **Act** — call the function
3. **Assert** — verify the result

```ts
it("multiplies numbers correctly", () => {
  // Arrange
  const a = 4;
  const b = 5;

  // Act
  const result = multiply(a, b);

  // Assert
  expect(result).toBe(20);
});
```

This structure keeps tests readable and consistent.

### Why This Pattern Matters

Without structure, tests become hard to read and harder to debug. The AAA pattern ensures that every test has a clear purpose and a single point of failure. If a test fails, you know exactly which assertion broke and why.

## Common Matchers

Vitest and Jest share the same matcher API. These are the ones you will use most often.

### Equality

```ts
expect(value).toBe(5);           // strict equality (===)
expect(value).toEqual({ a: 1 }); // deep equality (for objects and arrays)
```

Use `toBe` for primitives (numbers, strings, booleans). Use `toEqual` for objects and arrays.

### Truthiness

```ts
expect(value).toBeTruthy();   // any truthy value
expect(value).toBeFalsy();    // any falsy value
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();
```

### Numbers

```ts
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThanOrEqual(10);
expect(value).toBeCloseTo(0.3, 5); // for floating point comparisons
```

### Strings

```ts
expect(str).toContain("hello");
expect(str).toMatch(/^\d{4}$/); // regex match
```

### Arrays

```ts
expect(arr).toContain("apple");
expect(arr).toHaveLength(3);
expect(arr).toEqual(expect.arrayContaining(["a", "b"]));
```

### Errors

```ts
expect(() => riskyFunction()).toThrow();
expect(() => riskyFunction()).toThrow("expected error message");
expect(() => riskyFunction()).toThrow(TypeError);
```

> Always wrap the function call in an arrow function when testing for thrown errors. `expect(riskyFunction()).toThrow()` will not work — the error needs to be caught by `expect`.

## When a Test Fails

A failing test is not a problem — it is information. Learning to read failure output is one of the most important unit testing skills.

### Reading the Failure Output

When a test fails, Vitest (and Jest) print a clear message showing what went wrong:

```
FAIL  sum.test.ts
  × adds two numbers

AssertionError: expected 4 to be 5
  - Expected: 5
  + Received: 4
```

This tells you:
- **which test failed** — `adds two numbers`
- **what was expected** — `5`
- **what was actually returned** — `4`

### Two Reasons a Test Fails

**1. The code has a bug.**
The function is not doing what it should. This is the test doing its job — fix the function.

**2. The test itself is wrong.**
The expected value is incorrect, or the test is checking the wrong thing. Review the test before changing the function.

> **Rule of thumb:** Read the failure message carefully before touching anything. It usually tells you exactly where to look.

### A Simple Example

```ts
// This function has a bug — it subtracts instead of adds
export function sum(a: number, b: number) {
  return a - b;
}
```

The test:

```ts
expect(sum(2, 3)).toBe(5);
// Fails: received -1, expected 5
```

The failure message points directly to the bug. Fix the function, re-run the tests, and the failure disappears.

### Isolating a Failing Test

When debugging, it helps to run just one test at a time. Use `.only` to isolate a test:

```ts
it.only("this is the only test that will run", () => {
  expect(sum(2, 3)).toBe(5);
});
```

Use `.skip` to temporarily skip a test without deleting it:

```ts
it.skip("this test is skipped for now", () => {
  expect(sum(2, 3)).toBe(5);
});
```

> Remove `.only` and `.skip` before committing. Leaving them in will cause other tests to be silently skipped in CI.

### Failing Tests Are a Good Sign

A failing test means your test suite caught a real problem — before a user did. That is exactly what unit tests are for.

> Do not delete a failing test to make it pass. Fix the code.

## Testing Edge Cases

Good unit tests cover:
- normal input
- edge cases
- invalid input (if applicable)

Edge cases are where many bugs hide.

### Common Edge Cases to Consider

| Input Type | Edge Cases to Test |
|---|---|
| Numbers | `0`, negative values, `NaN`, `Infinity` |
| Strings | empty string `""`, whitespace only, very long strings |
| Arrays | empty array `[]`, single item, duplicate items |
| Objects | missing keys, `null` values, unexpected types |
| Booleans | both `true` and `false` |

### A Realistic Edge Case Example

```ts
// formatUsername.ts
export function formatUsername(name: string): string {
  return name.trim().toLowerCase();
}
```

```ts
describe("formatUsername()", () => {
  it("lowercases the name", () => {
    expect(formatUsername("Alice")).toBe("alice");
  });

  it("trims surrounding whitespace", () => {
    expect(formatUsername("  Bob  ")).toBe("bob");
  });

  it("handles an already clean string", () => {
    expect(formatUsername("carol")).toBe("carol");
  });

  it("handles an empty string", () => {
    expect(formatUsername("")).toBe("");
  });
});
```

Each test is small, focused, and tests one specific behavior.

## What Should Be Unit Tested

Strong candidates for unit tests:

- pure functions
- business rules
- calculations
- validation logic
- formatting helpers
- reducers
- data normalization

If logic can be tested without rendering a UI or making a network call, it is likely a good unit test candidate.

### What Makes a Function Easy to Test

A function is easy to unit test when it is **pure** — meaning:
- given the same inputs, it always returns the same output
- it does not modify anything outside itself (no side effects)

```ts
// Easy to test — pure function
function calculateDiscount(price: number, percent: number): number {
  return price - (price * percent) / 100;
}

// Hard to test — depends on external state
function applyDiscount() {
  const price = getCartTotal(); // external dependency
  return price * 0.9;
}
```

The more your functions look like the first example, the easier they are to test.

## What Not to Unit Test

Avoid writing unit tests for:

- framework behavior
- browser APIs
- third-party libraries
- styling and layout
- network requests

Do not test things already guaranteed by the platform.

### Why Not Test These?

Testing library internals (like React's rendering engine) adds no value — those are already tested by the library authors. Testing things you do not own creates fragile tests that break when a dependency updates, not when your code breaks.

Focus unit tests on **your logic** — the code you wrote and are responsible for.

## Organizing Your Tests

### File Naming

Place test files next to the code they test:

```
src/
  utils/
    formatPrice.ts
    formatPrice.test.ts
  reducers/
    cartReducer.ts
    cartReducer.test.ts
```

Vitest and Jest will automatically find files matching `*.test.ts` or `*.spec.ts`.

### One File Per Module

Each source file should have one corresponding test file. Do not put all tests into a single file — it becomes difficult to navigate and maintain.

### Naming Tests Clearly

Test names should read like sentences describing behavior:

```ts
// Too vague
it("works", () => { ... });

// Clear and descriptive
it("returns an empty array when no items match the filter", () => { ... });
```

A good test name tells you exactly what broke when the test fails — without needing to read the test body.

## Unit Tests and Refactoring

One of the biggest advantages of unit tests is **safe refactoring**.

If you can:
- reorganize files
- rename variables
- improve internal logic

…and your unit tests still pass, you can refactor with confidence.

If tests break but visible behavior does not change, your tests may be too tightly coupled to implementation details.

### Testing Behavior, Not Implementation

A common mistake is writing tests that assert *how* something works internally, rather than *what* it produces.

```ts
// ❌ Tests implementation — breaks during refactoring
it("calls the helper function", () => {
  const spy = vi.spyOn(helpers, "helperFn");
  sum(2, 3);
  expect(spy).toHaveBeenCalled();
});

// ✅ Tests behavior — survives refactoring
it("returns the correct sum", () => {
  expect(sum(2, 3)).toBe(5);
});
```

The second test does not care how `sum` works internally. It only cares about the result. That is the right level of abstraction for a unit test.

## Code Coverage

Code coverage measures how much of your source code is executed when your tests run.

### Running Coverage

```bash
npm run test -- --coverage
```

This generates a report showing which lines, branches, and functions are covered.

### How to Interpret Coverage

| Metric | What It Measures |
|---|---|
| Line coverage | Which lines were executed |
| Branch coverage | Which `if/else` paths were taken |
| Function coverage | Which functions were called |
| Statement coverage | Which individual statements ran |

### Coverage Is a Tool, Not a Goal

A high coverage number does not mean your tests are good. It means your tests *ran* those lines — not that they checked the right things.

```ts
// This test gives 100% coverage but proves nothing
it("runs without crashing", () => {
  sum(1, 2);
});
```

Coverage is useful for finding **untested areas**, not for measuring test quality. Aim for meaningful tests over high numbers.

> A reasonable starting target is 70–80% coverage. Beyond that, returns diminish quickly.

## Common Beginner Mistakes

**Testing implementation details**
Tests should verify what a function does, not how it does it internally. If an internal refactor breaks your tests without changing behavior, the tests are wrong.

**Writing overly large tests**
Each test should verify one thing. If a test is long, split it into multiple focused tests.

**Ignoring edge cases**
Happy path tests alone are not enough. Think about empty inputs, zero values, and unexpected types.

**Treating coverage as the goal**
Coverage is a diagnostic tool. Writing tests just to hit a number produces shallow, low-value tests.

**Using vague test names**
`it("works")` tells you nothing when it fails. Name tests to describe the specific behavior being verified.

**Not running tests regularly**
Tests that are only run occasionally go stale. Run tests on every save during development.

Remember:

> One meaningful test is better than ten shallow ones.

## Key Takeaways

- Unit tests verify isolated logic
- Vitest is a modern, fast choice for new projects
- Jest is a long-standing and widely adopted alternative
- The Arrange → Act → Assert pattern keeps tests readable
- Matchers like `toBe`, `toEqual`, and `toThrow` cover most situations
- Failing tests are useful — read the output before changing anything
- Test behavior, not implementation
- Edge cases are where most bugs hide
- Coverage is a tool, not a target
- Well-named tests document your code for free

> If your logic matters, it deserves a unit test.
