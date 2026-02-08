# Typed User Dashboard - React
## The Big Idea

In a React app, TypeScript does **not** change how React works.

React still:
- renders components
- updates state
- responds to user events

TypeScript’s role is to:
- describe **what data looks like**
- enforce **how components are used**
- catch mistakes **while you are coding**

Just like before:
> **TypeScript is erased before the app runs.**

## Where Types Show Up in a React App

In practice, TypeScript appears in a few key places:

1. Component props
2. Component state
3. Event handlers
4. Derived data and helper functions
5. API responses

You do *not* type everything.
You type **boundaries**.

## Typing Component Props

Props are one of the most important places to use TypeScript.

### JavaScript version

```jsx
function UserCard(props) {
  return <h2>{props.name}</h2>;
}
```

This component accepts *anything*.

### TypeScript version

```tsx
type UserCardProps = {
  name: string;
  isActive: boolean;
};

function UserCard({ name, isActive }: UserCardProps) {
  return <h2>{name} {isActive ? "✅" : "❌"}</h2>;
}
```

Now React + TypeScript enforce:
- required props
- correct prop types
- safe usage inside the component

If a prop is missing or incorrect, the error appears **in the editor**, not in the browser.

## Typing State with `useState`

TypeScript helps ensure state stays consistent over time.

```tsx
const [count, setCount] = useState<number>(0);
```

Now:
- `count` can only be a number
- `setCount` rejects invalid values

Without types, state can silently drift into invalid shapes.

### Typing Objects in State

```tsx
type User = {
  id: number;
  name: string;
};

const [user, setUser] = useState<User | null>(null);
```

This makes an important idea explicit:
- the user may not exist yet

TypeScript now forces you to handle that case instead of crashing later.


## Typing Event Handlers

React events are typed for you.

```tsx
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  setValue(event.target.value);
}
```

This ensures:
- correct access to `event.target`
- no guessing what kind of event this is

## Typing Derived Data and Helper Functions

Any logic that transforms data benefits from types.

```tsx
function getStatusLabel(isActive: boolean): string {
  return isActive ? "Active" : "Inactive";
}
```

Now:
- callers must pass the right data
- return values are predictable

This prevents subtle UI bugs.

## Typing API Data

APIs are a common source of bugs.

```ts
type UserResponse = {
  id: number;
  name: string;
  email: string;
};
```

```tsx
async function loadUser(): Promise<UserResponse> {
  const res = await fetch("/api/user");
  return res.json();
}
```

TypeScript now protects the rest of your app from malformed data.

## Why Types Make React Easier to Work With

In real React apps:
- components are reused
- props change over time
- state becomes complex

Types:
- document component contracts
- prevent accidental misuse
- make refactoring safe
- improve autocomplete and navigation

React becomes **more predictable**.

## What TypeScript Does *Not* Do in React

It’s important to be clear:

TypeScript does **not**:
- validate API responses at runtime
- prevent all bugs
- replace testing
- change how React renders

TypeScript is a **thinking tool**, not a magic shield.

## The Key Mental Model

In React:

- JavaScript + React define behavior
- TypeScript defines expectations

Or simply:

> React runs your app.  
> TypeScript helps you write it correctly.

## When to Use More (or Less) TypeScript

Use types most heavily at:
- component boundaries
- shared utilities
- API edges
- complex state

Use less typing for:
- tiny components
- local variables
- obvious values

TypeScript is most effective when applied **strategically**, not everywhere.

## Final Takeaway

TypeScript makes React applications:
- easier to reason about
- safer to refactor
- more maintainable over time

Once you understand how types fit into React, they stop feeling like extra work and start feeling like **guardrails**.

That’s when TypeScript becomes hard to give up.