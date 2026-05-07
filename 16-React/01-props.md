# Props in React

In almost every program you’ve written, you’ve needed a way to give information from one part of your code to another.  
For example, when you call a function, you can send it data through **parameters** so it can use that information to do something useful.

```js
function greet(name) {
  console.log("Hello " + name);
}

greet("Taylor");
greet("Jordan");
```

Each time the function runs, it behaves differently because of the data you passed in (`"Taylor"` or `"Jordan"`).  
Without that, every call to `greet()` would do the same thing — no variation, no flexibility.

This same concept applies to **components** in modern web development.  
Components are like reusable functions that describe parts of your user interface (UI).  
But to make them reusable and dynamic, they also need a way to receive data — and that’s exactly what **props** (short for “properties”) do in React.

In short:  
> Props are how you pass data into components, just like arguments are how you pass data into functions.

Without props, every React component would always show the same thing — making your app static and repetitive.

## What Are Props?

**Props** (short for *properties*) are how you pass data from a **parent component** to a **child component** in React.

Think of props like **arguments to a function**.  
When you call a function, you can send it some data — React components work the same way.

```
Parent Component (App)
   │
   ├── props: { name: "Alex" }
   ▼
Child Component (Greeting)
   └── receives props → uses props.name
```

Each component can receive its own set of props and use them to render different content — that’s what makes React components reusable.

---

### How Props Work

Let’s look at an example step by step.

#### Parent Component (`App.jsx`)
```jsx
import Greeting from "./Greeting";

function App() {
  return (
    <div>
      <Greeting name="Alex" />
      <Greeting name="Jordan" />
    </div>
  );
}

export default App;
```

#### Child Component (`Greeting.jsx`)
```jsx
function Greeting(props) {
  return <h2>Hello, {props.name}!</h2>;
}

export default Greeting;
```

### 💡 What Happens
- The `App` component sends data (`name="Alex"`) into `Greeting`.
- The `Greeting` component receives it as an object called `props`.
- You can access that value with `props.name`.

Each `<Greeting />` renders something different — but uses the **same code**.

## The Props Object

When React runs, the child component receives a `props` object like this:

```
props = {
  name: "Alex"
}
```

So when you write `props.name`, you’re just reading a value from this object.

### What Kind of Data Can Props Hold?

Props can carry **any kind of JavaScript data**:

| Type | Example | Description |
|------|----------|-------------|
| String | `name="Sara"` | Text content |
| Number | `age={25}` | Use `{}` for non-strings |
| Boolean | `isAdmin={true}` | Flags and toggles |
| Array | `items={["apple", "banana"]}` | Lists of data |
| Object | `user={{ name: "Sam", age: 30 }}` | Grouped data |
| Function | `onClick={handleClick}` | Event handler |

Example:
```jsx
function Profile(props) {
  return (
    <div>
      <h3>{props.user.name}</h3>
      <p>Age: {props.user.age}</p>
    </div>
  );
}

// In parent:
<Profile user={{ name: "Sam", age: 30 }} />
```

---

### Destructuring Props (Cleaner Syntax)

You’ll often see props written like this instead:

```jsx
function Greeting({ name }) {
  return <h2>Hello, {name}!</h2>;
}
```

This is called **destructuring** — a JavaScript feature that lets you unpack values from an object directly.

Instead of writing `props.name`, you pull out the `name` key immediately in the function’s parameters.  
It’s shorter and easier to read, especially when you have multiple props.

```
Without Destructuring:
props = { name: "Alex" }
props.name → "Alex"

With Destructuring:
{ name } = { name: "Alex" }
name → "Alex"
```

| Without Destructuring | With Destructuring |
|------------------------|--------------------|
| `function Greeting(props) { return <h2>{props.name}</h2>; }` | `function Greeting({ name }) { return <h2>{name}</h2>; }` |

---

### Data Flow Between Components

```
App Component
   ├── <Greeting name="Alex" />
   └── <Greeting name="Jordan" />

Greeting Component
   ├── Receives props → { name: "Alex" }
   └── Displays → "Hello, Alex!"
```

Every `<Greeting />` is the same **component**, but it behaves differently because it gets different data (props).

##  Key Takeaways
- Props let components **receive data** from their parents.
- They make components **reusable** and **dynamic**.
- You can pass **any kind of data** — strings, numbers, arrays, objects, or even functions.
- **Destructuring** makes prop syntax cleaner and easier to read.

## Next Up: State  
We’ll explore how components can manage their own data using **state**, and how props and state work together to make React apps truly interactive.