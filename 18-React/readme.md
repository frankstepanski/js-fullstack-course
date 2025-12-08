# Introduction to React

## 1) - The Limitations of HTML, CSS, and JavaScript Alone

Before React, developers built web applications by writing **HTML**, **CSS**, and **JavaScript** directly — manipulating the **DOM (Document Object Model)** to update the page.  

While this works fine for small sites, it quickly becomes **painful** when apps grow larger or when multiple developers work together.  

### Common Problems:
- **Manual DOM manipulation** — you must find elements, update them, and remove them manually.  
- **Spaghetti code** — logic for updating the UI is scattered across many scripts.  
- **Hard to reuse** — you repeat similar HTML structures and styles over and over.  
- * *Scaling issues** — as features grow, coordinating updates becomes messy.  
- **Team collaboration** — multiple people editing the same HTML files often causes conflicts.  

React was created to solve these exact problems.

## 2) - The Idea of Components

Before we dive into React, let’s think about **components** as a general idea.  

A **component** is a **self-contained piece of a larger system** — it does one job well and can be reused in many places.

### Examples (Outside of Coding):
- A car is made of smaller components: wheels, seats, and an engine.  
- A restaurant menu might reuse the same “menu item” format for every dish.  

In the same way, your website can be broken down into **smaller UI parts**.

---

### 🧱 UI Components in HTML & CSS

Even before React, you’ve already worked with **UI components** — things like **Bootstrap buttons, navbars, or modals**.  

You can build your own reusable patterns using HTML and CSS classes too — for example, a card component with an image, title, and button.  

### Example:

```html
<div class="card">
  <img src="image.jpg" alt="..." />
  <h3>Product Title</h3>
  <p>Description here</p>
  <button>Buy Now</button>
</div>
```

Once you’ve designed this card, you can copy and reuse it anywhere.  

But the problem? It’s **static**. You still have to manually update each one with new data.

### 🧠 Thinking in Components

When you design an app or website, you can **visually break it down into smaller components**.  

For example, a social media page might be broken into:
- Header  
- Sidebar  
- Post list  
- Each individual Post component  

Then you go a step further — thinking not just visually, but **functionally**.  
Some components handle **interaction**, like:
- A carousel that scrolls automatically  
- A Bootstrap accordion that opens and closes sections  

These are **components with both structure and behavior**.  

The beauty of components is that they can be:
- **Reused** across multiple pages or apps  
- **Shared** with other developers or teams  
- **Updated** in one place and applied everywhere  

### 🧩 Component Composition

**Component composition** is the idea that components can contain or “compose” other components.  

For example, a `PostList` component might contain multiple `Post` components, and each `Post` might contain a `Comment` component.

Composition allows you to **build complex interfaces** by combining simple building blocks — like LEGO pieces.


### 🌳 The Component Tree

React apps are made up of a **component tree** — a hierarchy of parent and child components.  

At the top is usually `App.js`, the **root component**, which imports and renders all others.

Example tree:

```
App
 ├── Header
 ├── Sidebar
 └── Main
      ├── PostList
      │    ├── Post
      │    └── Post
      └── Footer
```

Each component can pass data to its children, just like how the DOM has nested elements inside `<body>`.

## 3) - What is a Single-Page Application (SPA)?

In traditional websites, you have **multiple HTML pages** — one for each route (`home.html`, `about.html`, etc.).  
When you click a link, the browser loads a new page from the server.

In a **Single-Page Application (SPA)**, there’s **only one HTML file** — usually `index.html`.  
React dynamically updates what’s shown on the page **without reloading**.

This means your app feels faster and smoother because only the **necessary components** are updated, not the entire page.

### ⚙️ How React Works Under the Hood

React uses two key libraries:
1. **React** — for building components and managing state (data).  
2. **React DOM** — for rendering those components onto the actual web page.

When you build a React app:
- You write components using **JSX** and **modern JavaScript**.  
- React’s build tools **transpile** this code into **plain JavaScript** the browser understands.  
- React DOM takes your components and updates the **real DOM** efficiently using a **Virtual DOM** (a lightweight copy).  

This process makes React apps much faster and easier to maintain.

### 🧩 Changing the Way You Think

When moving from vanilla JavaScript to React, your mindset shifts:

| Vanilla JS | React |
|-------------|--------|
| Manually change the DOM | React updates the DOM for you |
| Separate HTML, CSS, and JS files | Logic and UI live together in components |
| Page reloads for navigation | Single-page with smooth routing |
| Copy-paste UI for reuse | Reusable components |
| One giant HTML structure | Tree of small, independent parts |

React changes how you **build** and **think** about web apps — not just as pages, but as **interactive systems** made of reusable components.


## 4) JSX (JavaScript XML)

**JSX** is a special syntax that lets you write **HTML-like code inside JavaScript**.  

This is how React combines structure (UI) and logic in the same place — something that wasn’t possible with just HTML, CSS, and JS alone.

### Why JSX Exists
Normally, JavaScript can’t understand HTML directly.  
JSX bridges that gap — it allows you to write markup that looks familiar to web developers, but behind the scenes, it’s converted into **React function calls**.

For example:
```jsx
const element = <h1>Hello, world!</h1>;
```

This line might look like HTML, but under the hood it becomes:
```js
const element = React.createElement("h1", null, "Hello, world!");
```

React uses this to create a **virtual representation** of the DOM element in memory — not an actual `<h1>` in the page yet.  
When React renders your app, it takes this virtual element and efficiently updates the real DOM.

---

### 🎨 JSX = HTML + JavaScript Together

JSX is powerful because it allows you to mix UI markup with JavaScript expressions.

```jsx
function Greeting() {
  const name = "Ada";
  const isMorning = true;

  return (
    <h1>
      Good {isMorning ? "Morning" : "Evening"}, {name}!
    </h1>
  );
}
```

🧠 **What’s happening:**
- You can use **variables**, **conditions**, and **functions** directly inside `{}` braces.
- JSX expressions must return **one parent element** (like a wrapping `<div>`).
- JSX is compiled to JavaScript before the browser sees it.

💡 **Pro Tip:**  
If you want multiple elements, wrap them in a parent tag or use React fragments:
```jsx
return (
  <>
    <h1>Title</h1>
    <p>Subtitle text</p>
  </>
);
```

---

### ⚙️ JSX Rules Every Beginner Should Know

| Rule | Explanation |
|------|--------------|
| Must return a single parent | JSX expressions must be wrapped in one element or `<>...</>`. |
| Use `className` instead of `class` | `class` is a reserved JavaScript keyword. |
| JavaScript inside `{}` | Embed variables or expressions inside curly braces. |
| Self-close empty tags | `<img />`, `<input />`, `<br />` are self-closing. |
| All tags must close | Even `<p>` and `<li>` require closing tags. |

## 5) - Declarative Programming

Declarative programming means you **describe what you want your web page to look like**, and React takes care of showing it in the browser.

By contrast, **imperative programming** means you have to **manually tell the browser every step** of what to do — like “create a button,” “add text,” “change color,” etc.

### 🔍 Analogy

| Imperative | Declarative |
|-------------|-------------|
| You tell a friend: “Go to the kitchen, grab bread, add peanut butter, add jelly, put it on a plate.” | You just say: “Make me a peanut butter and jelly sandwich.” |
| You describe every step. | You describe the result you want. |

React works in the same way — you describe the final result, and React figures out how to make the DOM match.

### 🧱 DOM vs React’s Virtual DOM

- The **DOM** (Document Object Model) is the browser’s internal tree of everything on the page.
- Normally, JavaScript updates it directly when something changes — but that can get messy and slow.
- **React** uses a **Virtual DOM**, which is like a lightweight copy.
  - When something changes, React compares the new version to the old one.
  - Then it updates **only the parts that changed**, not the whole page.

This is why React apps feel smooth and efficient.

---

### Imperative (Vanilla JS)
```js
const heading = document.createElement("h1");
heading.textContent = "Welcome!";
document.body.appendChild(heading);

const paragraph = document.createElement("p");
paragraph.textContent = "This was created with JavaScript.";
document.body.appendChild(paragraph);
```

Here, you’re doing all the work — telling the browser *how* to build the page.

### Declarative (React)
```jsx
function App() {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>This was created with React.</p>
    </div>
  );
}
```

You simply describe *what* the page should look like.  
React figures out how to create and display it in the DOM.

## 6) - What Tools Power Modern Frontends?

When building anything beyond a tiny demo, developers use a **toolchain** that typically includes:

- **Package Manager** (npm / yarn / pnpm) — installs libraries like React.
- **Dev Server** — runs your app locally and refreshes as you code.
- **Transpiler/Compiler** — turns modern JS/JSX/TypeScript into browser‑friendly JS.
- **Bundler** — collects your modules (JS, CSS, images) and produces optimized files for the browser.
- **HMR (Hot Module Replacement)** — updates just the changed parts **without** a full page reload.
- **Linters & Formatters** (ESLint, Prettier) — keep code clean and consistent.

Why use all this? Because modern web apps use features the browser doesn’t natively understand (JSX, TypeScript, module imports) and because teams need **speed**, **safety**, and **performance**.

A **bundler** takes all your application files (JavaScript modules, CSS, images) and creates a **small set of files** for the browser to download efficiently.

**Key jobs of a bundler:**
- **Module graph**: Follows your `import ... from '...'` statements to include everything you use.
- **Code splitting**: Splits your app into chunks so users only download what each page needs.
- **Minification & tree‑shaking**: Removes whitespace and unused code to make files smaller.
- **Asset handling**: Lets you `import './styles.css'` or `import logo from './logo.png'`.

---

### Why React Needs These Tools

React isn’t “just a script” — it uses patterns browsers don’t natively understand yet:

- **JSX** — HTML‑like syntax inside JavaScript. Browsers don’t read JSX directly; it must be **transformed** into plain JS.
- **Modules** — You’ll break UI into many files and `import` components, styles, and assets. The toolchain resolves and bundles them.
- **Single‑Page Apps** — One `index.html`, the rest is JavaScript. You’ll want a **dev server** + **HMR** while developing.
- **Production builds** — Users should download as little as possible; the bundler optimizes and splits code automatically.

In short: React code → (transpiler + bundler + dev server) → fast local dev + small production build.

---

### Vite - The modern, build tool

**Vite** (pronounced “veet”) is a fast, modern tool that combines:
- A **lightning‑fast dev server** (leveraging native ES modules + on‑demand transforms).
- A **production bundler** (optimized builds using Rollup under the hood).
- Simple setup (one command to start).
- Works great with **React + JSX** out of the box.

---

### How Vite Works

- **Development**: Vite serves your source files directly to the browser. It transforms only what you import on that page (e.g., JSX → JS), keeping it fast. Dependencies are pre‑bundled once for speed. HMR updates the running app **without** full reloads.
- **Production**: Vite builds your app with an optimized bundler — minifies, splits code, hashes filenames for caching — producing a `/dist` folder ready to deploy.

## 7) - Create Your First React App using Vite

> **Prerequisite**: Install **Node.js** (includes `npm`).

Run these commands in your terminal:

```bash
# 1) Create a new project
npm create vite@latest my-first-react-app

# 2) Choose: React (or React + TypeScript)
# 3) Enter the folder
cd my-first-react-app

# 4) Install dependencies
npm install

# 5) Start the dev server
npm run dev
```

Open the URL shown (usually **http://localhost:5173**) — you should see a starter page.

---

### Project Folder Structure (Bootstrapped React App)

```
my-first-react-app/
├─ index.html          # Single HTML file; Vite injects your app here
├─ package.json        # Scripts & dependencies
├─ vite.config.js      # Vite config (you can ignore for now)
├─ /src                # Your app code
│  ├─ main.jsx         # Entry: renders <App /> into the page
│  ├─ App.jsx          # Root component (your UI starts here)
│  └─ /assets          # Images, icons, styles
└─ /public             # Static files copied as-is
```

**How it connects:**
- `index.html` has `<div id="root">`.
- `src/main.jsx` renders your React app **into** that element.
- `src/App.jsx` defines what appears on screen.

---

### React Project Code

Open `src/App.jsx` and replace with:

```jsx
import React from "react";

function App() {
  return (
    <main>
      <h1>My First React Page</h1>
      <p>This content is rendered by a React component.</p>
    </main>
  );
}

export default App;
```

Open `src/main.jsx` (usually already set up like this):

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

And in `index.html`, notice the mount point:

```html
<div id="root"></div>
```

That’s where your React app appears.

### Create Your Own Component

Create `src/Header.jsx`:

```jsx
import React from "react";

function Header() {
  return <h2>Welcome to My Site</h2>;
}

export default Header;
```

Use it inside `App.jsx`:

```jsx
import React from "react";
import Header from "./Header";

function App() {
  return (
    <main>
      <Header />
      <p>Built with Vite + React.</p>
    </main>
  );
}

export default App;
```

---
## 8) - Running Your React App with Vite 

Even though you only see one `index.html`, modern React apps use **modules** and **tooling** that browsers expect to be served over **HTTP** (not just opened from your file system). A web server is needed the code uses imports and modules that only work when files are served over the web, not opened directly from your computer.

The server also makes sure everything runs smoothly while you build — like live updates when you save — and helps your app's pages work correctly when you navigate between them.

### What Happens When You Run the Dev and Build Commands?

#### `npm run dev` (Development)
- **Starts Vite’s dev server** (e.g., `http://localhost:5173`).
- **Serves your source files** using **native ES Modules**.
- **Transforms JSX on demand** (and TypeScript if you use it) only for files you import.
- **Pre‑bundles dependencies** (like React) once for fast imports.
- Enables **HMR**: when you save a file, only that module/component is updated in the browser **without a full reload**.

#### `npm run build` (Production)
- Runs Vite’s production bundling (Rollup under the hood):
  - **Transpiles** JSX/TS to plain JS.
  - **Minifies** and **tree‑shakes** code (removes unused pieces).
  - **Splits** code into chunks for faster loading.
  - **Hashes** filenames for long‑term browser caching.
- Outputs an optimized `/dist` folder ready to deploy.
- Use `npm run preview` to serve `/dist` locally and test the production build.

### How Do Components Render in the Browser

```
You run: npm run dev
        │
        ▼
Vite Dev Server starts (http://localhost:5173)
        │
        ▼
Browser requests index.html
        │
        ▼
Vite serves index.html (with <script type="module" src="/src/main.jsx">)
        │
        ▼
Browser loads /src/main.jsx as an ES module
        │
        ▼
Vite transforms JSX → JS on the fly and serves it
        │
        ▼
main.jsx imports React, ReactDOM, and App.jsx
        │
        ▼
ReactDOM.createRoot(document.getElementById("root")).render(<App />)
        │
        ▼
Vite serves App.jsx (transformed); React builds a Virtual DOM tree
        │
        ▼
React compares Virtual DOM to the real DOM and applies minimal changes
        │
        ▼
You see your UI in the #root element in index.html
```

### In Plain English
1. **Dev server** starts and serves your project files.
2. The browser downloads `index.html`, which points to your entry module (`/src/main.jsx`).
3. Vite **transforms** JSX as needed and returns JavaScript modules to the browser.
4. `main.jsx` tells **React DOM** to render your **App** component into the `#root` div.
5. React builds an internal **Virtual DOM** and updates the real DOM efficiently.
6. When you save a file, **HMR** swaps just the changed module — instant feedback.

---
## 9) - Understanding Props in React

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

---


### What Are Props?

**Props** (short for *properties*) are how you pass data from a **parent component** to a **child component** in React.

Think of props like **arguments to a function**.  
When you call a function, you can send it some data — React components work the same way.

### 📦 Visual Analogy

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

---

### The Props Object

When React runs, the child component receives a `props` object like this:

```
props = {
  name: "Alex"
}
```

So when you write `props.name`, you’re just reading a value from this object.

---

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

### 🧱 Visual Comparison

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

---

### 🧠 Key Takeaways
- Props let components **receive data** from their parents.
- They make components **reusable** and **dynamic**.
- You can pass **any kind of data** — strings, numbers, arrays, objects, or even functions.
- **Destructuring** makes prop syntax cleaner and easier to read.

---

**Next Up:**  
We’ll explore how components can manage their own data using **state**, and how props and state work together to make React apps truly interactive.