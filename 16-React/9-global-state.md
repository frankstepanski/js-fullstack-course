# Global State in React

At a high level, **state is how your application remembers things over time**. It represents data that can change such as user input, fetched data, UI toggles, selections, authentication status, and it directly drives what the user sees on the screen.

In React, state is the bridge between data and UI. When state changes, React automatically re-renders the parts of the interface that depend on it. This is what makes React feel dynamic and responsive without you manually touching the DOM. You don’t tell the UI *how* to change — you update state, and React figures out *what* needs to change.

>The most important design question in any React app isn’t *whether* to use state — it’s **where that state should live**.

Some state naturally belongs to a single component, such as the value of an input field or whether a dropdown is open. Other state represents shared knowledge across the application, like who the current user is, what theme is selected, or which data filters are active. Choosing the right place for state affects readability, maintainability, and how well your app can scale.

Understanding state at this level helps you avoid two common mistakes:

- **Over-engineering too early** by introducing complex global solutions before they’re needed
- **Under-engineering for too long** by forcing shared data through component trees that were never designed for it

When state only affects a single component or is passed down one or two levels, `useState` keeps things simple, readable, and easy to reason about. In these cases, keeping state local avoids unnecessary abstraction and makes the data flow very clear. Many small apps, prototypes, and early-stage projects never need anything more than local state.

As applications grow, however, this approach starts to show its limits.

## When to Consider Global State

As components become more nested, passing the same piece of state through multiple layers — even when those middle components don't care about it — creates what's known as prop drilling.

At first this feels manageable, but over time it becomes difficult to track where state lives, which component is responsible for updating it, and how changes ripple through the app. This is usually the first signal that local state is starting to work against you instead of for you.

Global state should be considered when:

- The app revolves around shared data such as authenticated user information, theme settings, language preferences, or application-wide filters
- Multiple views or distant components need access to the same state
- Centralizing state would be clearer than scattering related state across components

In these situations, global state provides a single, **shared source of truth** that components can access directly, without being tightly coupled through props. This reduces boilerplate, improves clarity, and makes shared behavior easier to maintain as the app grows.

>The key idea is not to avoid global state entirely, nor to introduce it too early. Start with local state by default, and reach for global state when sharing becomes common, coordination becomes complex, or the same data is needed across distant parts of the component tree.

## Local State vs Global State

Local state lives inside a single component and is managed with hooks like `useState`.

```jsx
const [count, setCount] = useState(0);
```

Local state works best when the data is owned by one component or only needs to be passed down a short distance. In small applications, or in isolated parts of larger apps, this keeps state simple, predictable, and easy to reason about. 

Global state helps centralize this shared data so it doesn't need to be threaded through the component tree manually. When state is truly shared across distant parts of the app, global state reduces duplication and improves clarity.

### Local state (works well)

```text
<App>
  └── <Counter>
        └── state lives here
```

- State belongs to one component  
- Easy to understand  
- Minimal prop passing  
- No extra abstraction needed  

### Local state with prop drilling (warning sign)

This is usually the moment to pause and reconsider the approach.

```text
<App>
  ├── state: user
  │
  └── <Layout user={user}>
        └── <Sidebar user={user}>
              └── <Profile user={user}>
                    └── uses user
```

- State is passed through multiple layers  
- Middle components don’t care about the state  
- Harder to track updates  
- Code becomes noisy and fragile  

### Global state (shared source of truth)

Global state moves shared data **out of the component tree**.

```text
        [ Global State ]
        ├── user
        ├── theme
        └── cart
             ↑
             |
<App>   <Sidebar>   <Profile>   <Header>
```

Instead of passing data through parents, components read from the same shared source. State no longer “belongs” to any one component.

- State lives in one central place  
- Components access it directly  
- No unnecessary prop passing  
- Updates stay in sync everywhere  

###  How Components Interact with Global State

```text
[ Global State Store ]
        │
        │  read / update
        ▼
<Profile>   <Header>   <Cart>
```

Each component:
- Reads only the state it needs
- Updates state through a defined API
- Automatically re-renders when relevant data changes

There are no prop chains or middle components involved.

## Built-In React Tools for Global State

Before introducing external libraries, React provides built-in tools that help manage state creation, state logic, and state sharing. These tools are designed to solve the most common problems developers encounter as applications grow, while keeping the data flow predictable and understandable. For many small to medium-sized applications, these built-in tools are often all that’s needed.

>It's important to understand that React only has two ways to create state: **useState** and **useReducer**. That’s it. 

Any data that changes over time and causes re-renders must be created using one of these two hooks. `Context` does not create state, store state, or manage state updates on its own.

Context is part of React’s Context API, and `useContext` is only one piece of that API. Context defines a **shared portal** where data can be placed, while useContext is the hook that allows a component to read data from that portal. In other words, Context decides where data can flow, and useContext is how a component taps into that flow. This allows state created with useState or useReducer to be transported directly to deeply nested components without prop drilling.

This pattern often works best when Context is paired with `useReducer`. While useState is ideal for simple state updates, useReducer is designed for more structured or rule-based state changes. It centralizes update logic, makes state transitions explicit, and scales better as complexity increases. 

>Under the hood, useState itself is implemented using the same internal mechanism as useReducer, but with constraints added to keep it simple and beginner-friendly.

Together, these tools form React’s native state architecture:
useState or useReducer create and own state, Context shares that state, and useContext allows components to access it directly. This separation of responsibilities is what keeps React applications flexible, predictable, and scalable as they grow.

### Context: Sharing State Across the App

Context allows state to be shared across the component tree without passing props manually.

Context introduces a **shared data channel** that components can tap into when they need common information. Instead of components passing data to each other, they all read from the same source.

Think of Context as a three-step process:

1. Create a place for shared data  
2. Put data into that place  
3. Let components read from that place  

### Step 1: `createContext()` — Creating the Shared Space

The first step is to create a Context using `React.createContext()`.

```jsx
const UserContext = React.createContext();
```

In a real React app, Context is almost always defined in its **own file**, outside of any component.

#### Example: `UserContext.jsx`

```text
src/
├── context/
│   └── UserContext.jsx
├── components/
│   └── Dashboard.jsx
├── App.jsx
└── main.jsx
```

```jsx
// src/context/UserContext.jsx
import { createContext } from "react";

export const UserContext = createContext(null);
```

- `createContext()` defines the container
- It is usually called once
- It lives outside of components

### Step 2: The Provider — Supplying the Data

Next, you use the Context’s Provider to put actual data into the shared space.

```jsx
// src/App.jsx
import { UserContext } from "./context/UserContext";

function App() {
  const user = { name: "Alex" };

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}
```
#### What Does `value` Mean?

```jsx
<UserContext.Provider value={user}>
```

The `value` prop is **the data you are placing into Context**.

> Context does not create data — it **shares** data.


### Step 3: `useContext()` — Reading the Shared Data

Once data exists in Context, components can read it using the `useContext` hook.

```jsx
// src/components/Dashboard.jsx
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Dashboard() {
  const user = useContext(UserContext);
  return <p>Welcome, {user.name}</p>;
}
```

What `useContext()` does:
- Connects the component to the Context
- Reads the current value from the nearest Provider above it
- Re-renders the component when the value changes

The component does not need props to receive this data.

```text
UserContext.jsx
   └── createContext()

App.jsx
   └── UserContext.Provider (supplies data)

Any Component
   └── useContext(UserContext) (reads data)
```

Or summarized as:

```text
createContext → defines where shared data can live
Provider      → puts data into that shared space
useContext    → reads the data inside components
```

In plain English:

> You create Context once,  
> you provide data near the top,  
> and you use the data wherever you need it.

By defining a shared space with createContext(), supplying data through a Provider, and reading it with useContext, components can stop passing data through props and instead read from a common source. This solves the distribution problem — how data moves through the component tree — but it does not solve the state problem itself.

All state updates must come from useState or useReducer, which are the only built-in React hooks that actually create state and trigger re-renders. Context simply transports that state (and any update functions) to other components.

For many applications, especially small to medium ones, pairing Context with useState is perfectly fine. When state updates are simple and easy to reason about, there is no requirement to use useReducer. 

As applications grow, however, shared state often needs to be updated from many places, follow specific rules, or respond to different user actions. At that point, useReducer becomes useful because it centralizes update logic and makes state changes more predictable — but it’s a tool to adopt when complexity demands it, not something every app needs from the start.

This separation of concerns is key: Context decides who can access state, while useState or useReducer decide how that state is created and changed.


```text
State lives somewhere (useState / useReducer)
        ↓
Passed into Context via `value`
        ↓
Read by components using `useContext`
```

---

### `useReducer`: Structured State Logic

The `useReducer` hook exists to bring **structure and clarity** to state updates. Instead of directly setting state values, useReducer encourages you to describe **what happened** and centralize **how state responds** to those events. This makes state changes easier to understand, easier to debug, and easier to maintain over time.

At its core, useReducer is about **organizing state logic**. It replaces scattered updates with a single, predictable flow where all changes pass through one function. Whether that state stays inside a single component or is shared using Context is a separate decision.

A helpful question to ask is:

> “Is my state hard to manage because of **logic**, or because of **sharing**?”

- useReducer helps with **logic**
- Context helps with **sharing**

---

### `dispatch`: How State Changes Flow

One of the most important ideas behind `useReducer` is the separation between **intent** and **logic**. This separation is what makes state updates predictable and easier to reason about as applications grow.

If useState is about *setting values*, useReducer is about *sending events*.

dispatch is **not** a function that updates state directly.

Instead, `dispatch`:
- Sends a message describing *what happened*
- Hands that message to the reducer
- Lets the reducer decide *how state should change*

```text
dispatch → reducer → new state
```

A helpful way to think about `dispatch` is:

> "Something happened — here's the event.  
> Reducer, you decide what to do about it."

### Intent vs Logic 

#### The Component's Job:
- Render the UI
- Listen for user actions (clicks, typing, submits)
- Report events using `dispatch`


With useReducer, components describe **intent**:

```js
dispatch({ type: "increment" });
```

"The user triggered an increment action."

#### The Reducer’s Job:
- Decide how state should change
- Apply the rules for updates
- Return the new state

```js
case "increment":
  return { count: state.count + 1 };
```

"The reducer responds to the increment action by increasing the count by 1."

### Actions Are Descriptions, Not Commands

An action is a plain object that describes *what happened*.

```js
{ type: "NEXT_STEP" }
{ type: "START_LOADING" }
{ type: "ERROR", message: "Invalid input" }
```

Actions do not say *how* to update state. They only describe events. If a component needs to decide *how* state changes, that logic belongs in the reducer.

---

### Situation 1: Complex State Inside One Component  
#### (useReducer without Context)

This is the most common beginner use case for `useReducer`.

You should consider useReducer when:
- A component has many related pieces of state
- One user action updates multiple values
- State changes depend on previous state
- You are starting to lose track of *why* state changed

#### Think of:
- A multi-step form
- A modal with several states (open, loading, error, success)
- A wizard or onboarding flow
- A game or interactive UI with rules

**Before (scattered updates):**
```text
User action
 ├── setCount(...)
 ├── setError(...)
 ├── setIsLoading(...)
 └── setStep(...)
```

**After (useReducer):**
```text
User action
   ↓
dispatch({ type: "NEXT_STEP" })
   ↓
reducer decides how state changes
```

Here, useReducer:
- Centralizes update logic
- Makes state changes predictable
- Keeps everything inside one component

👉 No Context is needed because the state is not shared.

### Situation 2: The Same Complex State Is Needed Elsewhere  
### (useReducer with Context)

Sometimes you already have well-structured state logic, but now:
- Multiple components need to read the same state
- Multiple components need to trigger updates
- Passing state through props starts to feel awkward

This is when Context becomes useful.

#### Think of:
- A shopping cart used across many components
- Authenticated user state with actions (login, logout)
- Application-wide filters with clear update rules
- Theme or settings state shared across views

**Reducer + Context (shared):**
```text
Context Provider
 ├── useReducer (state + dispatch)
 └── shared with many components
```

From a component’s perspective:

```text
Component
 └── useContext → state + dispatch
```

---

### `useReducer`: How to Implement It

At a high level, useReducer and useState solve the same problem: they create state and trigger re-renders when that state changes. The difference is how state updates are expressed and organized.

With useState, you update state by directly setting a new value. This works very well when state is simple and updates are easy to understand. However, as components grow, state updates often become scattered across multiple setters, making it harder to see why state changed and which updates belong together.

useReducer takes a different approach. Instead of directly changing state, components describe what happened by **dispatching an action**. A separate reducer function then defines how state is allowed to change in response to those actions. This centralizes update logic in one place, making state transitions more predictable and easier to reason about.

>Both hooks create state. useReducer simply adds structure and clarity when state logic starts to feel complex.

#### Step 1: Define the State Shape

Start by deciding what your state looks like.

```js
{
  count: 0
}
```

Even for simple examples, using an object makes state easier to extend later.

#### Step 2: Write the Reducer Function

- Takes the current state
- Takes an action
- Returns the next state

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```
>The reducer function can be written either in the component
file or in a separate reducer file.

This makes responsibilities clear:

- Reducer → owns update rules
- Context → distributes state
- Components → consume state

Key ideas:
- Never mutate state directly
- Always return a new state object
- Each `case` represents a rule

#### Step 3: Use useReducer in a Component

```jsx
import { useReducer } from "react";

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>

      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

### Code Flow

1. State is defined as a single object that represents what the UI needs to know.
2. A user interaction occurs, such as clicking a button.
3. An action is created — a plain object describing what happened.
4. `dispatch` sends the action to the reducer.
5. The reducer applies rules based on the action type and returns a new state object.
6. React re-renders the component using the updated state.

---

### How to Decide Between State Hooks

```text
Simple local state           → useState
Complex local state          → useReducer
Simple shared state          → Context
Complex shared state         → useReducer + Context
```

Most applications move through these stages gradually.

## When Built-In Tools Aren’t Enough

As applications grow larger, teams often need simpler APIs, better performance, and clearer separation of concerns. This is when external state management libraries become useful.

### Redux Toolkit

Redux was created to enforce one central place for state and one predictable way state can change.

Redux introduced an architecture where:
- State lives in one store
- State is read-only
- The only way to change state is by describing what happened

These ideas strongly influenced modern React patterns.

### Redux: A Short History

Redux was created by [Dan Abramov around 2015](https://redux.js.org/understanding/history-and-design/history-of-redux#2015-the-birth-of-redux), inspired by ideas from Flux architecture and functional programming.

At the time, React had no hooks and no built-in way to manage complex shared state. Redux filled that gap.

Later, when React Hooks were released (2018–2019), Redux-like ideas were brought into React itself through `useReducer` and `useContext`. These hooks were not taken from Redux, but were inspired by the same principles:
- Centralized logic
- Event-driven updates
- Predictable state transitions

This is why useReducer feels philosophically similar to Redux.

### Redux (pre–Redux Toolkit) Felt Heavy

Classic Redux was powerful, but it came with a lot of ceremony:
- Multiple files for a single feature
- Manual action creators
- Large switch statements
- Significant boilerplate

#### 🟥 Classic Redux

```text
src/
├── actions/
│   ├── actionTypes.js        ← string constants
│   └── counterActions.js    ← action creators
│
├── reducers/
│   ├── counterReducer.js    ← switch-based reducer logic
│   └── index.js             ← combineReducers
│
├── store.js                 ← createStore setup
│
├── main.jsx                 ← <Provider store={store}>
│
└── components/
    └── Counter.jsx          ← useSelector + useDispatch
```

#### Concepts You Had to Learn
- Action type constants
- Action creators
- Reducer functions
- Root reducer
- Store creation
- Provider wiring
- Selectors
- Dispatch functions

```text
Classic Redux:
User → Action → Action Creator → Reducer → Store → Component
```

Redux was often disliked because it required a large amount of **boilerplate code** for even simple features. Managing actions, reducers, stores, and multiple files made applications harder to read and reason about over time. As projects grew, this extra ceremony added complexity instead of clarity. Many developers felt Redux made apps more confusing and harder to maintain than necessary.

### Why Redux Toolkit Was Created

Redux Toolkit was created to solve Redux’s biggest pain point: boilerplate.

The Redux team recognized that:
- Most Redux apps followed the same patterns
- Beginners struggled with setup
- The core ideas were solid, but the API was verbose

Redux Toolkit became the official, recommended way to use Redux.

Its goals were to:
- Reduce boilerplate
- Prevent common mistakes
- Make Redux easier to learn
- Keep Redux’s robustness and predictability

### Redux Toolkit: Same Ideas, Less Code

```js
import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment(state) {
      state.count += 1;
    }
  }
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});
```

Usage in a component:

```js
dispatch(counterSlice.actions.increment());
```

Redux Toolkit keeps Redux robust while making it much easier to use.


#### 🟩 Redux Toolkit (Modern Redux)

```text
src/
├── features/
│   └── counter/
│       └── counterSlice.js   ← state + actions + reducer (all in one)
│
├── store.js                  ← configureStore
│
├── main.jsx                  ← <Provider store={store}>
│
└── components/
    └── Counter.jsx           ← useSelector + useDispatch
```

Redux Toolkit groups related logic together, making it easier to reason about and maintain over time.

### When Redux Toolkit Makes Sense

- Applications are large or long-lived
- Multiple developers work on the same codebase
- State changes must be auditable
- Business rules are complex
- Debugging state history matters

Examples include enterprise dashboards, financial systems, and large SaaS products.

---

### Zustand: Lightweight Global State

Zustand is a small, modern state management library that provides **global state** while feeling very similar to `useState`. It is designed to be simple, flexible, and easy to adopt without restructuring your React application.

Unlike Context or Redux, Zustand does not require Providers, reducers, or action objects. State lives outside of components, and components simply subscribe to the data they need.


Zustand creates a **global store** that exists independently of React components.

```text
Zustand Store (global)
 ├── state
 ├── update functions
 └── lives outside components

Any Component
 └── useStore() → reads or updates state
```

Components do not own the state. They **subscribe** to it.

### Creating a Store

```jsx
import { create } from "zustand";

const useStore = create(set => ({
  count: 0,
  increment: () =>
    set(state => ({ count: state.count + 1 }))
}));
```

#### What’s happening here?

- `create` builds a **custom hook**
- That hook (`useStore`) gives access to shared state
- `set` is Zustand’s version of `setState`
- The store is created **once**, not per component

#### Understanding the Store Object

```js
{
  count: 0,
  increment: () => set(...)
}
```

- `count` → global state value
- `increment` → function that updates state
- State and logic live **together** inside the store

This is different from `useReducer`, where logic is separated into reducers.

### Using the Store in Components

```jsx
function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>Count: {count}</button>;
}
```

What’s happening:
- The component subscribes to the store
- It re-renders only when `count` changes
- No props or Providers are required


### Zustand vs `useReducer + Context` 

Zustand solves the same problems as `useReducer` combined with Context, but with less boilerplate.

```text
useReducer + Context
 ├── reducer
 ├── dispatch
 ├── provider
 └── context wiring

Zustand
 └── store + functions
```

Zustand removes the need for:
- Providers
- Dispatch functions
- Action objects


#### Zustand is a great fit for:
- Theme toggles (dark / light mode)
- Authentication state
- Feature flags
- Modals and UI visibility
- Shopping carts
- App-wide settings


## State Management Comparison Table

| Tool | What It Does | When to Use It | Strengths | Tradeoffs |
|-----|-------------|---------------|-----------|-----------|
| **`useState`** | Creates and manages state inside one component | Simple values or UI state used by one component or passed down a few levels | Easiest to learn, very readable, minimal setup | Becomes messy when many state values or deep prop passing are needed |
| **`useReducer`** | Manages complex state logic with clear rules | One component has many related state changes or rule-based updates | Centralizes logic, predictable updates, easier to debug | More code than `useState`, can feel verbose for simple cases |
| **Context** | Shares existing state across components | Multiple components need the same state (auth, theme, settings) | Eliminates prop drilling, built into React | Does not create or manage state by itself, can cause extra re-renders if misused |
| **`useReducer` + Context** | Shares complex, rule-based state | Shared state with structured updates (cart, auth, filters) | Clean architecture without external libraries | Still manual setup, can grow complex in very large apps |
| **Zustand** | Lightweight global state store | App-wide state without Redux complexity | Very little boilerplate, easy API, scalable | Less opinionated, fewer conventions for large teams |
| **Redux Toolkit** | Full global state solution | Large apps with many features and teams | Strong conventions, excellent tooling, predictable | More concepts to learn, heavier than Zustand |

### Visual Mental Model

```text
Simple UI state                → useState
Complex component logic       → useReducer
Shared state (few components) → Context
Shared + complex state        → useReducer + Context
Large app global state        → Zustand or Redux Toolkit
```
## Key Takeaways

There is no “best” state tool — only the **right tool for the current problem**. Understanding these tradeoffs is far more important than memorizing APIs.

## Next Up: Deployment

You've learned all the tools to build real, dynamic React applications using components, state and global state, styling strategies, routing, and reusable layouts. At this point, your app behaves like a real product—but it still only runs on your local machine. Deployment is the step that turns your work into something others can actually access, share, and use through a public URL.

Deployment means building your React app into optimized files and hosting them on a platform that can serve them to users. This includes choosing between frontend-only hosting or full-stack deployment, ensuring client-side routing works correctly, and deciding between free and paid hosting options. Once deployed, your app moves from "it works for me" to "it works for everyone."
