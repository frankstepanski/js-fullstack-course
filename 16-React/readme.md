# Introduction to React

Before React existed, developers built websites using **HTML**, **CSS**, and **JavaScript** directly — manipulating the **DOM (Document Object Model)** to update the page.

While this works fine for small sites, it quickly becomes **painful** when apps grow larger or when multiple developers work together.

Students in the Moonlight Pizza projects have already experienced firsthand *why* these older approaches become difficult as a site grows.

## ⚠️ What Building Websites Was Like Before React

### 1️⃣ Vanilla JavaScript Only (No Frameworks)
Developers had to do *everything* manually:

- Find DOM elements  
- Insert text or HTML using `.innerHTML`  
- Attach and remove event listeners  
- Fetch data and manually re-render UI  
- Keep track of what changed and ensure the DOM stayed in sync  

This causes several issues:

| Problem | Why It’s Hard for Beginners |
|---------|-----------------------------|
| Duplicate code | Same HTML patterns repeated in many files |
| Unorganized structure | Hard to find where UI updates happen |
| Fragile updates | One DOM change can break another |
| Harder collaboration | Multiple devs editing the same HTML files |
| Not scalable | More features = exponentially more complexity |

---

### 2️⃣ Early Libraries Like jQuery (Better, but Not Enough)

jQuery simplified DOM manipulation with helpers like:

```js
$('#item').addClass('active');
```

But it still suffered from:

- **Spaghetti code** → Logic spread across many JS files  
- **No reusable components** → Navbar/footer/layout repeated everywhere  
- **Hard-to-maintain state** → App gets out of sync with UI  
- **Difficult scaling** → Features collide and break each other  
- **Team conflicts** → Designers and devs overwriting same HTML templates  

Even professional developers found large jQuery apps nearly impossible to maintain long-term.

### How This Relates to Your Experience So Far:

#### **Project 1**
- Multiple HTML pages  
- CSS Grid, Flexbox, responsive layout  
- Shared UI like navbars/footers manually copied  
- Static content  

#### **Project 2**
- Fetching data from a REST API  
- Updating the DOM dynamically  
- JavaScript files for each page (`menu.js`, `specials.js`, etc.)  
- Growing code complexity  

**But you likely noticed:**

- Repeating HTML/CSS/JS patterns  
- Rewriting similar DOM-building logic  
- Hard-to-manage shared elements  
- Many separate files to update  
- Difficulty keeping everything consistent  

These challenges are **not caused by mistakes** — they are weaknesses of the vanilla JS approach.

>They are exactly the reasons React was invented.

## Why React Became a Game-Changer 

Before React existed, building large websites or apps with plain JavaScript became **very hard to manage**. Developers used lots of separate HTML files, CSS files, and JavaScript files — and had to manually update the page whenever something changed.

React changed the way developers build user interfaces by introducing **simpler, more organized, and more predictable patterns**.

### 1️⃣ A New Way to Organize Your UI

React introduced **components**, but at a beginner level, you can think of them simply as:

**“Small pieces of a webpage that you build once and reuse anywhere.”**

For example:

- A header  
- A navigation bar  
- A pizza card  
- A button  
- A modal  

Before React, developers had to **copy and paste** the same HTML into multiple files.  
React allowed you to:

- Build a UI piece once  
- Reuse it anywhere  
- Update it in one place instead of many  

This dramatically reduced repetition and errors.

### 2️⃣ No More Manual Page Updates

In plain JavaScript, if something changes (like a shopping cart count), you must:

- Find the element in the DOM  
- Update its text  
- Maybe move or replace elements  
- Remove old HTML  
- Handle edge cases manually  

React changed this.

React introduced an idea where you **describe what the UI should look like**, and React figures out **how** to update the page behind the scenes.

This is powered by something called the **Virtual DOM**, but the key takeaway is:

> You no longer update the page manually — React does it for you.

This reduces bugs and makes your code much easier to reason about.

### 3️⃣ Reusable Layouts Become Simple

In plain HTML/JS, if you have:

- A header on 10 pages  
- A footer on 10 pages  
- A sidebar used in multiple places  

You must manually include or copy these into every HTML file.

React allows you to build one layout and let multiple pages share it automatically.

This makes larger websites easier to maintain, especially when you're changing designs later.

### 4️⃣ A More Predictable Structure

React encourages a more organized way to build projects:

- Each UI piece is its own file  
- Code is grouped by purpose  
- Files become smaller and easier to understand  
- You can see exactly where each part of the UI comes from  

For beginners coming from multi-file HTML/CSS/JS projects, React is a relief — everything related to a part of the UI lives together in one place.

### 5️⃣ Faster, App-Like Websites

Modern websites built with React can behave more like apps:

- Pages load faster  
- Navigating around feels smoother  
- The browser doesn’t reload the whole page each time  
- Shared elements like the header don’t re-render unnecessarily  

You don’t need to understand how this works yet — just know that React makes websites feel more like modern applications instead of old-fashioned page reloads.

**Project 1 and Project 2 taught you:**

- How to organize HTML  
- How to link multiple pages  
- How to reuse CSS  
- How to fetch and display dynamic data  
- How messy multiple JS files can become  

Then React is the **natural next step**.  
It takes everything you’ve learned so far — and dramatically simplifies the parts that were becoming painful.

## 1 - The Virtual DOM

Before learning React, you’ve been building websites by:

- Writing HTML & CSS  
- Updating the page using JavaScript  
- Using the DOM to add/remove/change elements  

Example:

```js
document.querySelector("#count").textContent = count;
```

This works fine for small pages…  
But as your site grows, updating the DOM by hand becomes:

- Repetitive  
- Hard to maintain  
- Easy to break  
- Slow when the page has many parts  

React introduces a new tool to help with this called the **Virtual DOM**.

Think of your webpage as having **two versions**:

#### 1️⃣ **The Real DOM**  
This is the actual webpage the browser displays — real HTML elements.

#### 2️⃣ **The Virtual DOM**  
A **lightweight copy** of your webpage stored in JavaScript.

>React uses this copy to *figure out* what changed before touching the real page.
Once React knows what changed, it updates **only the specific parts** that need updating.

### Why This Matters

Updating the real DOM many times can be **slow**.  
Updating a JavaScript object is **fast**.

React updates the Virtual DOM first → compares old vs new → updates only what changed.

### Example:

If only a single number changes:

❌ Do NOT rebuild the entire page  
❌ Do NOT delete and recreate full HTML sections  

✔ ONLY update that one piece of text

>This keeps your site smooth and efficient.

---

### How Virtual DOM Updates Work

Here’s the big picture:

```
1. Something changes (like a button click)
2. React creates a NEW Virtual DOM version of the page
3. React compares it to the OLD Virtual DOM
4. React identifies small differences
5. React updates ONLY those parts in the real webpage
```

No need to manually search for elements or update them yourself.

```
Your Code (React components)
         |
Creates a Virtual DOM (a JS copy of your UI)
         |
React compares NEW vs OLD Virtual DOM
         |
React updates ONLY SMALL PARTS of the Real DOM
```

Or even more simply:

```
[ Virtual DOM ]  --->  [ Diff ]  --->  [ Update Real DOM ]
```

### 🚫 The Old Way: Manual DOM Updates

Before React, you might write:

```js
document.querySelector("#count").textContent = count;
document.querySelector("#title").style.color = "red";
document.querySelector("#list").innerHTML = createList();
```

You manually update different parts of the page yourself.  
This works in small apps, but becomes hard to manage as things grow.

### ✔ The New Way: React + Virtual DOM

With React, you **describe what the UI should look like**.

React + Virtual DOM handle:

- How to update the UI  
- When to update it  
- Which parts need changes  

React ensures the page always matches your data, without you manually fixing the DOM.

## 2 - The Idea of Components

Before we dive into React, let’s think about **components** as a general idea.  

A **component** is a **self-contained piece of a larger system** — it does one job well and can be reused in many places.

### Examples (Outside of Coding):
- A car is made of smaller components: wheels, seats, and an engine.  
- A restaurant menu might reuse the same “menu item” format for every dish.  

In the same way, your website can be broken down into **smaller UI parts**.

### UI Components in HTML & CSS

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

### Thinking in Components

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

### Component Composition

**Component composition** is the idea that components can contain or “compose” other components.  

For example, a `PostList` component might contain multiple `Post` components, and each `Post` might contain a `Comment` component.

Composition allows you to **build complex interfaces** by combining simple building blocks — like LEGO pieces.


### The Component Tree

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

## 3 - What Is an SPA?

When you learned HTML, CSS, and JavaScript, you built websites where:
- Each page had its **own HTML file**
- Clicking a link loaded an entirely new page  
  (the browser asked the server for `about.html`, `contact.html`, etc.)

React applications work differently.

A **Single‑Page Application** (SPA) is a website where:

- There is **only ONE HTML file** → usually `index.html`
- The page **never fully reloads**
- JavaScript controls which content appears on the screen
- React updates the UI **dynamically** using components

Even though it *feels* like a multi‑page website,
all the screens are actually drawn with **JavaScript**, not separate HTML files.

### SPA Under the Hood

When you build a React app, something important happens:

#### ✔ All your components (written in many JS files)  
➡️ are **bundled together** into **one big JavaScript file**.

That file is downloaded into the browser’s **memory**, and it contains:

- All your components  
- All your layout code  
- All your logic for showing/hiding pages  
- Routing logic (React Router)  
- State management  
- UI interactions  

So instead of downloading many HTML pages…

👉 The browser downloads **one HTML file + one JS bundle**.

And the JavaScript bundle is responsible for *drawing everything* on screen.

#### Traditional Website
```
index.html  ← browser loads this
about.html  ← new request to server
contact.html
menu.html
```

#### React SPA
```
index.html         ← loaded ONCE
bundle.js          ← contains ALL UI code
React Router       ← decides what appears on screen
```

The page stays the same — **React just changes which components appear**.

### Why SPAs Feel Faster

Because the browser does **not reload the entire page**.

Only the specific parts of the UI that need updating are changed.

No:
- Flashing reloads  
- Re‑downloading CSS  
- Re‑downloading images  

Just instant updates.

React switches components like scenes in a movie.

## 4 - JSX

JSX is a special syntax that lets you write **HTML-like code inside JavaScript**.  
It looks like HTML, but it's actually JavaScript under the hood.

Example:

```jsx
const element = <h1>Hello, world!</h1>;
```

Behind the scenes, React turns it into plain JavaScript:

```js
const element = React.createElement("h1", null, "Hello, world!");
```

>JSX makes writing UI easier because it feels like writing HTML, but gives you the *power of JavaScript* at the same time.


### Why JSX Exists

Browsers do **not** understand JSX.

React uses a transpiler tool (e.g. esbuild, SWC, or the older Babel) to **transform JSX into JavaScript** that browsers *can* understand.

JSX → (transpiled) → JavaScript → Virtual DOM → Real DOM

>Transpiling means converting code from one version of the same language to another. React code (JSX) is transpiled, not traditionally compiled.


### JSX Lets You Mix UI + Logic

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

What JSX adds:

- `{}` lets you insert JavaScript expressions  
- You can use variables, functions, and logic inside your UI  
- React uses the Virtual DOM to turn this into real UI efficiently  


```
           You Write JSX
       -----------------------
       | <h1>Hello!</h1>     |
       -----------------------
                    |
                    | (transpiled by esbuild)
                    v
        React.createElement(...)
                    |
                    v
      Virtual DOM Representation
       -------------------------
       | type: "h1"           |
       | props: { children }  |
       -------------------------
                    |
                    | (React compares changes)
                    v
           Real DOM Update
       -----------------------
       | <h1>Hello!</h1>      |
       -----------------------
```

>JSX → becomes JavaScript → becomes Virtual DOM → updates the Real DOM *efficiently*.

---

### JSX Rules 

| Rule | Why It Matters |
|------|----------------|
| Must return **one parent element** | All JSX must be wrapped in one root element or `<>...</>`. |
| Use `className` instead of `class` | Because `class` is a reserved JavaScript keyword. |
| JavaScript goes inside `{}` | You can embed variables and expressions. |
| Tags must close | Even `<p>` and `<li>` must have closing tags. |
| Self‑closing tags need `/` | `<img />`, `<input />`, `<br />` |

###  JSX Helps You Write **Declarative** Code 

Before React, developers wrote UI updates **imperatively** — meaning you tell the browser *exactly how to update the page step-by-step*.

#### 🤯 Imperative Example (Vanilla JS)

```js
const countEl = document.querySelector("#count");
countEl.textContent = count;
if (count > 10) {
  countEl.style.color = "red";
}
```

You must:

- find the element  
- decide how it changes  
- update it manually  
- keep track of previous state  

You’re responsible for every step.

#### 😌 Declarative Example (React + JSX)

With JSX, you no longer describe *how* to update the DOM.  
You simply describe *what the UI should look like* for the current data.

```jsx
<p id="count" style={{ color: count > 10 ? "red" : "black" }}>
  {count}
</p>
```

Here, you’re saying:

> “If `count > 10`, the text should be red. Otherwise it should be black.”

You are **not**:

- selecting elements  
- updating text manually  
- applying/removing styles  
- tracking what changed  

React compares the new JSX description to its Virtual DOM and updates only what’s needed.

## 5 — What Tools Power Modern Frontends? 

Up until now, you’ve built websites using:

- HTML  
- CSS  
- JavaScript  
- The browser opening those files directly  

That’s perfect for small projects — but **modern web apps** are much more complex. They use **many small files**, advanced syntax, and features the browser cannot run on its own. To handle this, developers rely on a group of tools called a **frontend toolchain**.

Think of it like this:

> You *could* cook everything over a campfire…  
> but modern kitchens (ovens, timers, mixers) make cooking faster, easier, and more consistent.

Frontend tools do the same for building apps.

### Why Modern Frontend Tools Exist

Before we talk about package managers, bundlers, or dev servers, it’s important to understand **why** modern frontend development needs these tools in the first place.

As we've talked about earlier, when you first learn to build websites, you typically work like this:

```
index.html
styles.css
script.js
```

You open the file in a local server extension (i.e. Live Server) in the browser and it just works.  
This is perfect for **small projects** and for learning the fundamentals.

But modern web applications — like Netflix, Spotify, TikTok, Amazon, Discord — are far more complex:

- Hundreds or thousands of components  
- Data loading from APIs  
- Reusable UI parts  
- Multiple developers working together  
- Code split into many files to stay organized  
- Optimization so the site loads fast on slow networks  
- Tools that catch bugs early  
- Features browsers don’t understand yet (JSX, TypeScript, modules)

Because of that, big projects can no longer rely on simple HTML/CSS/JS files alone.

### The Modern Frontend Requires:
- Code organization  
- Reuse and maintainability  
- Performance optimization  
- Developer workflow improvements  
- Support for new language features not yet built into browsers  

To handle all of this, developers use a **toolchain**.

This toolchain isn’t there to make your life harder — it exists to make large-scale development **possible**, **fast**, and **reliable**.

>A toolchain is simply a collection of tools that work together to help developers build modern websites or applications.

### What Tools Power Modern Frontends?

#### ⚡ Vite — The Modern Tool for React

Is a combination of tools working together to make modern frontend development fast and easy. Here are the key pieces inside Vite:


1️⃣ **A Development Server (Dev Server)**
- Runs your app locally in the browser
- Updates instantly when you change a file (HMR)
- Serves your JavaScript modules using native ES modules

2️⃣ **A JSX/TypeScript Transpiler (esbuild)**
- Vite uses esbuild, a super-fast transpiler
- Converts JSX → JavaScript
- Converts TypeScript → JavaScript

3️⃣ **A Production Bundler (Rollup)**
- Combines your files into optimized bundles
- Minify your JavaScript
- Split code into chunks for performance

4️⃣ **Hot Module Replacement (HMR)**
- Only reloads the parts of the page that changed
- Keeps your React component state when you save
- Makes development feel smooth and instant

5️⃣ **Static Asset Handling**

- Understands imports statements
- It processes and optimizes these assets automatically.

6️⃣ **Starter Templates for Popular Frameworks**

- Makes it easy to start a project by including preconfigured templates for modern frameworks and libraries such as React, Vue, Svelte, etc

### During Production:

Vite bundles your app:

- Minifies code  
- Removes unused pieces  
- Splits files for faster loading  
- Outputs a `/dist` folder ready to deploy  

```
            Your React Code (JSX, modules, CSS)
                      ↓
             ┌─────────────────────┐
             │  Transpiler(esbuild)│
             │  - JSX → JS         │
             │  - Modern → Older   │
             └─────────────────────┘
                      ↓
             ┌────────────────────┐
             │    Bundler (Vite)  │
             │  - Combine files   │
             │  - Optimize        │
             │  - Minify          │
             └────────────────────┘
                      ↓
     ┌────────────────────────────────────┐
     │  Development Server + HMR (Vite)   │
     │  - Instant page updates            │
     │  - Fast feedback loop              │
     └────────────────────────────────────┘
                      ↓
               Browser Runs App
```




## 6 - Create Your First React App using Vite

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

### Project Folder Structure (Bootstrapped React App)

>It was automatically generated by a tool that sets up all the files, folders, configs, and dependencies needed for a working React project.

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

### Creating Your First React Components

Each component usually lives in **its own file**, and you import it wherever you want to use it.

Open **`src/App.jsx`** and replace it with:

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

Now open **`src/main.jsx`**:

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

And in **`index.html`**, notice the mount point where React loads your app:

```html
<div id="root"></div>
```

### Creating Your Own Component

To create a new React component, you follow this process:

1. Create a new file  
2. Write a function that returns JSX  
3. Export the function  
4. Import it into another component  
5. Use it like a custom HTML tag  

#### Step 1 — Create a Component File

Create a file:

```
src/Header.jsx
```

Add:

```jsx
import React from "react";

// A component is just a JavaScript function that returns JSX (UI)
function Header() {
  return <h2>Welcome to My Site</h2>;
}

// Export it so other components can use it
export default Header;
```

### Step 2 — Import & Use the Component

Open **`src/App.jsx`** and update:

```jsx
import React from "react";
import Header from "./Header"; // import the component

function App() {
  return (
    <main>
      <Header />  {/* use the component like a tag */}
      <p>Built with Vite + React.</p>
    </main>
  );
}

export default App;
```

✔ `<Header />` is your custom component  
✔ React replaces it with the JSX you wrote  
✔ This is how React apps grow: **many small components combined together**

### Why Components Work This Way

- Each component lives in its **own file** → keeps your project clean  
- You **import** components when needed → just like importing images or CSS  
- JSX lets you treat components like custom HTML tags  
- Components make it easy to reuse UI across your app  

## 7 - Running Your React App with Vite 

Even though a React project only has one **index.html** file, the app itself is made of many JavaScript modules that import and use one another. Browsers cannot load these modules correctly if you just double-click index.html.

That's why React needs to run on a local development server:

- The server understands modern JavaScript features like import and JSX (after they’re transformed).

- It serves your files over HTTP, which is how browsers expect modern apps to load modules.

- It also gives you helpful tools like automatic page reloads when you save and smooth navigation between pages.

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

## Summary

React introduces a modern way to build user interfaces by breaking the UI into reusable components, using JSX to blend HTML-like syntax with JavaScript, and relying on tools like Vite to bundle, optimize, and serve your code efficiently. 

Together, these concepts form the foundation of React development, helping beginners shift from manually manipulating the DOM to thinking in components, composition, declarative rendering, and predictable update flows. 

As you continue learning, you’ll build on this foundation with essential topics like props, state, effects, custom hooks, routing, layouts, styling, component libraries, global state management, and deployment workflows.

### Next Topics to Explore

- [Props](1-props.md) – Passing data into components  
- [State](2-state.md) – Managing dynamic data inside components  
- [Effects](3-effects.md) – Running code when components update  
- [Custom Hooks](4-custom-hooks.md) – Reusing logic across components  
- [Routing](5-routing.md) – Creating multi-page experiences in a single-page app  
- [Layouts](6-layouts.md) – Reusable page structures  
- [Styling Options](7-styling.md) – CSS modules, frameworks, libraries  
- [Component Libraries](8-component-libraries.md) – Pre-built UI components  
- [Global State](9-global-state.md) – Tools like Context, Redux, Zustand, Jotai  
