# Testing Fundamentals

You now know how to build applications using HTML, CSS, JavaScript, React, and TypeScript.

The next step is learning how to **verify that your code works — and continues to work as it changes**.

That is the role of **testing**.

Testing is how developers gain confidence in their work. As applications grow, code changes frequently: new features are added, bugs are fixed, and existing logic is refactored. Each change introduces the risk of breaking something that already worked. Testing helps reduce that risk.

At a high level, testing answers questions like:
- Does this feature behave the way I expect?
- If I change this code, did I accidentally break something else?
- Can other developers safely build on top of this code?
- Will this still work after weeks or months of changes?

Testing is not just about finding bugs. It is about **creating safety** around your code so you can move faster, make changes with confidence, and collaborate effectively with others.

For early projects, testing may feel optional. For real-world applications, testing becomes part of the foundation that keeps an app stable, maintainable, and trustworthy over time.

## Why Testing Exists

As applications grow, uncertainty grows with them.

- More code paths are introduced
- More features depend on shared logic
- More developers make changes over time

Each change increases the risk of unintentionally breaking existing behavior.

Testing exists to control that risk.

It allows developers to:
- verify that existing behavior still works
- refactor code without fear
- catch bugs earlier, before users encounter them
- collaborate safely in shared codebases


## Types of Testing Developers Perform

### Manual Testing

Manual testing is what you already do instinctively:

- clicking buttons
- filling out forms
- refreshing pages
- resizing the browser
- navigating between routes
- checking error messages
- watching the console

**Example**
- Log in with valid credentials
- Try invalid credentials
- Reload the page
- Navigate to the dashboard
- Log out and log back in

**Why manual testing matters**
- Fast feedback
- Human intuition catches UX issues
- Essential during early development

**Limitations**
- Easy to forget steps
- Hard to repeat consistently
- Does not scale as apps grow

Manual testing never goes away — but it cannot be your only strategy.

---

### Automated Testing

Automated tests are **code that verifies other code**.

Instead of repeating the same steps manually:
- tests run automatically
- expected behavior is asserted
- failures are reported immediately

**Why teams rely on automated testing**
- Tests run on every commit
- Bugs are caught earlier
- Refactoring becomes safer
- Teams move faster with confidence

Automated tests are infrastructure.

## Testing as Part of the Developer Toolbelt

Testing works alongside other professional tools:

- TypeScript → catches type errors at development time
- Linters → enforce code quality and consistency
- Git → tracks and manages change
- CI/CD → runs tests automatically before deployment

Testing provides **confidence at scale**.

The larger the application, the more valuable testing becomes.

## How Testing Improves Application Design

Well-tested applications usually have:
- small, focused functions
- clear data flow
- predictable side effects
- separation of concerns

If something is difficult to test, it often signals:
- tight coupling
- too much responsibility in one place
- unclear data flow

Testing pushes you toward better architecture.

## When Should You Think About Testing?

Testing should influence design **before code is written**.

Testing affects:
- how functions are structured
- how components are split
- how state is managed
- how APIs are shaped

**Rule of thumb**
- Prototype → manual testing
- Stable features → automated tests

Think about how something *could* be tested, even if you do not write the test immediately.
## Types of Automated Testing (Big Picture)

Automated testing exists at **multiple levels**, each answering a different question about your code.

No single test type is “enough” on its own — they work **together**.

### Unit Testing

Unit tests verify **small, isolated pieces of logic**.

Common unit test targets:
- utility functions
- validation logic
- reducers
- data transformation
- business rules

```ts
function add(a: number, b: number) {
  return a + b;
}

expect(add(2, 3)).toBe(5);
```

**What unit tests answer**  
> “Does this piece of logic work by itself?”

**Pros**
- Very fast
- Easy to write
- Great for pure logic
- Easy to debug when failures happen

**Cons**
- Does not reflect real user behavior
- Can miss integration bugs

---

### Integration Testing

Integration tests verify **multiple parts working together**.

Instead of testing a single function, you test:
- components + state
- components + API calls
- form submission + validation
- multiple modules interacting

```ts
render(<LoginForm />);
fireEvent.click(screen.getByText("Submit"));

expect(
  screen.getByText("Invalid credentials")
).toBeInTheDocument();
```

**What integration tests answer**  
> “Do these pieces work correctly together?”

**Pros**
- More realistic than unit tests
- Catches many real-world bugs
- Still fairly fast

**Cons**
- More setup than unit tests
- Often requires mocks

---

### Component Testing (Frontend-Specific)

Component tests focus specifically on **UI components**.

They verify:
- rendering
- user interactions
- state changes
- conditional UI logic

```ts
render(<Button />);
fireEvent.click(screen.getByText("Save"));
expect(screen.getByText("Saved")).toBeInTheDocument();
```

Component testing often overlaps with integration testing, but the intent is UI-focused.

**What component tests answer**  
> “Does this UI component behave correctly when a user interacts with it?”

**Common tools**
- React Testing Library
- Vue Test Utils
- Cypress Component Testing

---

### End-to-End (E2E) Testing

End-to-end tests simulate **real users using a real browser**.

They test:
- full user flows
- routing
- frontend + backend
- network behavior
- real data wiring

```ts
await page.goto("/login");
await page.fill("input[name=email]", "test@test.com");
await page.click("button[type=submit]");
await expect(page).toHaveURL("/dashboard");
```

**What E2E tests answer**  
> “Can a real user successfully complete this flow?”

**Tools**
- Playwright
- Cypress
- Selenium

**Tradeoffs**
- Highest confidence
- Slowest
- More brittle
- More setup and maintenance

---

### Snapshot Testing

Snapshot tests compare **rendered output** to a previously saved version.

Often used with UI components.

```ts
const tree = renderer.create(<Button />).toJSON();
expect(tree).toMatchSnapshot();
```

**What snapshot tests answer**  
> “Did the output change?”

**Pros**
- Quick to add
- Good for catching unintended UI changes

**Cons**
- Can become noisy
- Fails even for harmless UI changes
- Easy to approve broken behavior accidentally

Snapshot tests should be used **sparingly**.

---

### Mocking & Spies (Testing Techniques)

Mocking is **not a test type**, but a **supporting technique** used across test types.

Mocks are used to:
- fake API responses
- replace external services
- isolate logic
- control edge cases

```ts
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ name: "Test" }])
  })
);
```

Spies are used to:
- observe function calls
- verify side effects
- check how code is used

Mocks are most common in:
- unit tests
- integration tests

---

### Performance Testing (Advanced / Optional)

Performance tests measure:
- response time
- rendering speed
- load handling

These are usually **not** part of beginner workflows, but exist in real systems.

**Common tools**
- Lighthouse
- k6
- custom benchmarks

## What Each Testing Level Requires

| Testing Type | What It Needs |
|-------------|---------------|
| Unit | Pure functions, minimal dependencies |
| Integration | Components, mocks, shared state |
| Component | UI rendering, user events |
| End-to-End | Running app, browser, test data |
| Snapshot | Stable UI output |
| Performance | Realistic load and timing |

## How to Think About Testing Levels

A helpful mental model:

- **Unit tests** → logic correctness  
- **Integration tests** → pieces working together  
- **Component tests** → UI behavior  
- **API tests** → contract + backend correctness  
- **E2E tests** → real user success  
- **Performance tests** → speed and reliability  

Each layer increases:
- confidence  
- realism  
- cost  

> As you move down the list, tests become more realistic — and more expensive to maintain.

## JavaScript Testing Landscape

| Step | Testing Type | What It Tests | What You Verify | Common Examples | Tools | When to Use | Primary Goal |
|-----:|-------------|---------------|-----------------|-----------------|-------|-------------|--------------|
| **1** | **Unit Testing** | Small, isolated logic | Correct return values, edge cases | Utility functions, validators, formatters, business rules | Vitest, Jest | First tests you write | **Trust core logic** |
| **2** | **Component Testing** | UI behavior | Rendering, clicks, state updates, visible output | Button clicks, counters, form inputs | React Testing Library, Vitest, Jest | After unit tests | **UI behaves correctly** |
| **3** | **Integration Testing** | Multiple pieces together | Components + APIs + state working as one | Form submit → API call → error message | React Testing Library, Vitest/Jest, MSW | When logic spans multiple parts | **System works when wired together** |
| **4** | **API Testing** | Backend endpoints | Status codes, response shape, error handling | Login routes, CRUD endpoints | Supertest, Vitest/Jest | Backend-focused apps | **Backend contracts are reliable** |
| **5** | **Snapshot Testing** *(Optional)* | Rendered output | UI did not change unexpectedly | Stable components, layouts | Jest Snapshots | Selective use only | **Detect unintended UI changes** |
| **6** | **End-to-End (E2E) Testing** | Full user flows | Real browser behavior | Login flows, navigation, checkout | Playwright, Cypress | Critical user paths | **Real users succeed** |
| **7** | **Performance / Load Testing** *(Advanced)* | Speed & scalability | Response time, degradation under load | API throughput, render speed | Lighthouse, k6 | Mature apps | **App is fast & reliable** |

## Key Characteristics by Test Type

| Test Type | Speed | Realism | Cost to Maintain | Confidence Level |
|----------|------|---------|------------------|------------------|
| Unit | ⚡ Very fast | ❌ Low | 💲 Low | Medium |
| Component | ⚡ Fast | ⚠️ Medium | 💲 Medium | High |
| Integration | ⚠️ Medium | ✅ High | 💲💲 Medium | Very High |
| API | ⚠️ Medium | ✅ High | 💲💲 Medium | Very High |
| Snapshot | ⚡ Fast | ❌ Low | ⚠️ Medium | Low–Medium |
| E2E | 🐢 Slow | ✅✅ Very High | 💲💲💲 High | Highest |
| Performance | 🐢 Slow | ✅✅ Very High | 💲💲💲 High | Situational |

## Recommended Testing Progression (Roadmap View)

| Level | What You Should Be Writing |
|------|----------------------------|
| **Beginner** | Manual tests → Unit tests → Basic component tests |
| **Intermediate** | Integration tests → API tests → CI automation |
| **Advanced** | End-to-end tests → Performance tests → Contract testing |

## One-Sentence Purpose per Testing Level

- **Unit tests** → *“My logic is correct.”*
- **Component tests** → *“My UI responds correctly.”*
- **Integration tests** → *“My pieces work together.”*
- **API tests** → *“My backend behaves as expected.”*
- **E2E tests** → *“Users can actually use the app.”*
- **Performance tests** → *“The app holds up under pressure.”*
