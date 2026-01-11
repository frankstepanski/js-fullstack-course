# Styling Patterns in React 

When you first learn HTML and CSS, styling is simple: you write CSS files, link them in your HTML, and the browser applies the styles.

When you move to **React**, styling still uses CSS — but **how styles are organized, applied, and scoped changes** because React apps are built differently.

## Traditional HTML Website (Multiple Pages)

```
Browser
───────
index.html   → styles.css
about.html   → about.css
contact.html → contact.css

Each HTML page loads its own CSS files
Styles usually affect ONE page at a time
```

On a traditional multi-page HTML website, **CSS is global within each page**.
That means naming conflicts are **possible**, especially as a site grows larger. Though these conflicts are usually limited to **one page at a time**, because CSS is loaded and unloaded as you navigate between pages.

>A **CSS conflict** happens when multiple CSS rules apply to the same element and the browser must choose which one wins. CSS conflicts are natural and expected, and the browser resolves them using the CSS cascade rules—mainly specificity and source order.

In a React app, CSS conflicts happen more often and are harder to reason about than in traditional multi-page websites.

This is not because React or CSS is doing something wrong — it’s because of how React apps are built and loaded using tools like **Vite**.

## How CSS Works in a React App

When you import CSS in a React project:

```js
import "./styles.css";
```

### Vite:

- Collects **all imported CSS files** from across the app
- Bundles them together
- Sends them to the browser as **one shared set of styles**

To the browser, it looks like:

> “Here is one big CSS file.”

The browser does **not** know:
- Which component a style belongs to
- Why the style exists
- When it should stop applying

```
React App
─────────
Button.jsx   ┐
Card.jsx     │
Modal.jsx    │   →  All CSS files bundled
Layout.jsx   │      into ONE global style space
             │
styles.css   │
admin.css    │
modal.css    ┘

        ↓

One Global CSS Pool
───────────────────
button { ... }
.button { ... }
.card { ... }
```


## What Global CSS *Should* Be Used For

Global CSS is still useful — **when used correctly**.

### Good uses of global CSS

These styles are meant to apply everywhere:

```css
/* global.css */

/* 1. Resets / defaults */
* {
  box-sizing: border-box;
}

/* 2. Base typography */
body {
  font-family: system-ui, sans-serif;
}

/* 3. App-wide elements */
a {
  color: blue;
}
```

These are called **global styles** because:
- They set defaults
- They define the foundation of the app
- They are not tied to one component


## What Should NOT Go in Global CSS

Avoid putting these in global CSS:
- Button designs
- Cards
- Forms
- Modals
- Page-specific layouts

These are **component styles**, not global styles.

## How to Avoid These Global Issues

You've now seen how using regular CSS files in a React app creates global CSS, which can lead to naming conflicts as the app grows. This isn’t caused by React itself, but by build tools like Vite, which bundle all regular CSS files into one shared style space.

Over time, developers have established **clear patterns** to reduce conflicts, improve readability, and keep styles easier to maintain as applications scale.

### 1️⃣ CSS Modules: Component-Scoped Styling 

CSS Modules make **CSS class styles** local to a component. This means each component owns its styles, and naming conflicts are avoided automatically.

- Two components can safely use the same class name
- Styles stay close to the component that uses them

This matches how React encourages you to think:

> One component → one set of styles

```css
/* Button.module.css */
.button {
  background: tomato;
  color: white;
  padding: 8px 12px;
}
```

```jsx
import styles from "./Button.module.css";

function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

#### What to notice

- The file name ends with `.module.css`
- The class name `.button` is **local to this component**
- Another component can also have a `.button` class without conflict

#### History: Where CSS Modules Came From

They are a build-time convention created by the frontend community to solve a long‑standing problem: CSS class name collisions at scale.

[CSS Modules](https://github.com/css-modules/css-modules/blob/master/docs/history.md) were introduced before tools like Vite became popular and were first implemented in bundlers such as Webpack. Over time, the idea became widely adopted.

Today, most modern build tools — including Vite, support CSS Modules out of the box.

#### ⚠️ Be aware

Inside a CSS Module file, **only use class selectors** for component styling. Other selectors such as:

- Element selectors (`button`, `h1`, `p`)
- ID selectors (`#submit`)
- Attribute selectors (`input[type="text"]`)

Are **not** scoped and are applied globally. If used they can reintroduce the same problems CSS Modules are meant to solve

If you need to style something **without using class selectors**, and it **cannot be global**, then CSS Modules are not the right tool for that job.

At that point, you need a **different styling pattern**.

### 2️⃣ Inline Styles: Style Objects Scoped to Elements

Inline styles are used when styles need to be dynamic, calculated, or guaranteed to stay local to one element.

- Inline styles are applied **directly to an element**
- They never live in a shared CSS space
- They cannot cause naming conflicts

This makes inline styles a great complement to CSS Modules — not a replacement.

>Inline styles in React are written as **JavaScript objects** and passed to the `style` prop.

```jsx
<div style={{ color: "red" }}>Hello</div>
```

Important differences from regular CSS:
- Property names use **camelCase** (`backgroundColor`, not `background-color`)
- Values are usually **strings or numbers**
- Styles live inside your component logic

```jsx
function Alert({ type }) {
  const style = {
    padding: "12px",
    backgroundColor: type === "error" ? "tomato" : "lightgreen",
    color: "white"
  };

  return <div style={style}>Message</div>;
}
```

Why this works well:
- The style depends on `type`
- The logic and styling live together
- No global CSS is involved


### Creating CSS Objects

Creating a CSS object is a cleaner way to write inline styles.

The browser treats these exactly the same as inline styles written directly in JSX.

```jsx
function Box() {
  const boxStyle = {
    color: "red",
    padding: "8px"
  };

  return <div style={boxStyle}>Hello</div>;
}
```

Both examples render something like:

```html
<div style="color: red; padding: 8px;">
```

There is no difference in:
- Scope
- Collision behavior
- How styles are applied

The only difference is code organization and readability.

### Creating CSS Objects in External Files

You can also define CSS objects in a separate JavaScript file and import them into your components.

This is useful for reusing inline styles across multiple components while keeping JSX cleaner.

```js
// styles.js
export const boxStyle = {
  padding: "12px",
  backgroundColor: "tomato",
  color: "white"
};
```

```jsx
// Box.jsx
import { boxStyle } from "./styles";

function Box() {
  return <div style={boxStyle}>Hello</div>;
}
```

Even though the styles live in a separate file:
- They are still applied via the `style` prop
- The browser still treats them as **inline styles**
- They are scoped automatically to the element

There is no change in behavior compared to inline styles written directly in the component.

### Common Use Cases for Inline Styles

#### Dynamic Values:

```jsx
<div style={{ width: `${progress}%` }} />
```

Good for:
- Progress bars
- Dynamic sizing
- Inline calculations

#### State-Driven Styles:

```jsx
<button
  style={{
    backgroundColor: isActive ? "blue" : "gray"
  }}
>
  Toggle
</button>
```

Useful when styles depend on user interaction.

#### One-Off Visual Adjustments

```jsx
<div style={{ marginTop: "8px" }} />
```

Great for:
- Small spacing tweaks
- Layout nudges
- Temporary styles


### 3️⃣ CSS-in-JS in React

CSS-in-JS exists because component-driven applications needed **more flexible** styling.

#### 1. Inline Styles - Limitations

- No `:hover`, `:focus`, or `:active`
- No media queries
- No animations or keyframes
- Styles are tightly coupled to render logic
- Difficult to express complex layouts

Inline styles are great for **dynamic values**, but weak for **real UI design**.

---

#### 2. CSS Modules - Limitations

- Only works with **class selectors**
- Styling logic lives outside JavaScript
- Conditional styling can become verbose
- Styles do not naturally respond to props

CSS Modules fix **global CSS problems**, but still separate styling from component logic.

> What if styles were treated as part of the component itself?

As interfaces became more modular, developers wanted styles to live alongside the components they belonged to instead of being scattered across separate CSS files. CSS-in-JS allows styles to respond directly to component props and state, while still supporting the full power of CSS. 

At the same time, it removes many of the headaches of global styles by automatically scoping rules so they only affect the components they are meant to style.

CSS-in-JS is the practice of writing real CSS syntax inside JavaScript files. This works by using a dedicated library that takes the CSS you write, generates unique class names behind the scenes, and injects the resulting styles into the page at runtime. 


```text
You write this:
----------------
CSS inside JavaScript


Library steps in:
-----------------
1) Generates real CSS
2) Creates unique class names
3) Injects styles into the page


Browser sees:
--------------
.normal-css {
  background: tomato;
}
```

Because the library manages scoping and injection for you, your styles behave like normal CSS but remain tightly bound to the components they belong to.

>React itself has no built-in support for this pattern, which means you must use an external library to make CSS-in-JS work.


You must install an **external library** to use it.

Without a library, CSS-in-JS does not exist.

### Common CSS-in-JS Libraries

Popular libraries include:

- `styled-components`
- `@emotion/react`
- `@emotion/styled`

Each library provides tools that allow CSS to be written inside JavaScript.

### Example 1: Styling Based on Props

```jsx
const Button = styled.button`
  background: ${props => (props.primary ? "tomato" : "gray")};
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
`;
```

```jsx
<Button primary>Primary</Button>
<Button>Secondary</Button>
```

This pattern avoids conditional class names and keeps visual intent close to the component API.

**Common use cases:** buttons, alerts, badges, cards, and variants.

---

### Example 2: Component Variants (Design System Pattern)

```jsx
const Badge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;

  background: ${props => {
    if (props.type === "success") return "green";
    if (props.type === "warning") return "orange";
    return "gray";
  }};
`;
```

```jsx
<Badge type="success">Success</Badge>
<Badge type="warning">Warning</Badge>
<Badge>Default</Badge>
```

One component can support multiple visual states without duplicated CSS.

**Common use cases:** status labels, notifications, tags.

---

### Example 3: Media Queries Inside Components

```jsx
const Card = styled.div`
  padding: 24px;

  @media (max-width: 600px) {
    padding: 12px;
  }
`;
```

Responsive behavior lives with the component instead of being scattered across files.

**Common use cases:** cards, panels, reusable layout components.

---

### Example 4: Shared Styled Components (Composition)

```jsx
const BaseButton = styled.button`
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: bold;
`;

const DangerButton = styled(BaseButton)`
  background: red;
  color: white;
`;
```

```jsx
<DangerButton>Delete</DangerButton>
```

Encourages reuse and consistency without copy-pasting styles.

**Common use cases:** design systems and shared UI libraries.

---

### Example 5: Theming

```jsx
const Button = styled.button`
  background: ${props => props.theme.primary};
  color: ${props => props.theme.text};
`;
```

Themes allow centralized control over colors, spacing, and branding.

**Common use cases:** dark mode, branding requirements, accessibility modes.

> Use CSS-in-JS because your components **demand it**, not because it looks fancy.

For most projects, CSS Modules remain the best default.

### Comparing Common CSS Styling Patterns in React


| Styling Pattern | What It Is | Strengths | Limitations | When to Use |
|---------------|-----------|-----------|-------------|-------------|
| **Inline Style Objects**| Styles written as JavaScript objects and applied directly with the `style` prop | Easy to start, dynamic values, no extra files | No hover or media queries, limited CSS features, tightly coupled to render logic | Use for small, one-off dynamic styles or quick experiments |
| **CSS Modules** | Regular CSS files that are automatically scoped to a component | Familiar CSS, full feature set, no global collisions | Class selectors only, conditional styling can be verbose | Use for most React apps where you want clean, maintainable styling |
| **CSS-in-JS** | Real CSS written inside JavaScript using an external library | Component-scoped styles, prop-based styling, theming support | Extra dependency, more complexity, steeper learning curve | Use for advanced component systems and reusable design patterns |

### 4️⃣ React Component Libraries 

Up to this point, you’ve been **styling your own components**.

Component libraries change the workflow.

Instead of asking:

> “How do I style this button?”

You start asking:

> “Which button component should I use?”

Component libraries let you **assemble interfaces** using pre-built components instead of styling everything from scratch.

### What a Component Library Is

A React component library is a collection of:

- Pre-built React components  
- Already styled and accessible  
- Designed to work together visually  
- Customized using **props**, not CSS files  

Example:

```jsx
<Button size="lg" colorScheme="blue">
  Save
</Button>
```

No CSS file.  
No class names.  
Minimal styling decisions.

### Material UI (MUI)

Material UI (MUI) is one of the most widely used React component libraries and is based on Google's Material Design system. It provides a large, production-ready set of components with strong accessibility defaults and thorough documentation. 

Because of its maturity and adoption, MUI is a common choice for professional React applications where reliability and consistency are important.

The main tradeoff with Material UI is that it comes with a very opinionated visual style out of the box. While this helps teams move quickly, it can feel heavy or restrictive at first, especially for beginners. Deep customization is possible, but it often requires learning MUI's theming system and internal patterns, which adds complexity.

- Official Website: https://mui.com/
- Documentation: https://mui.com/material-ui/getting-started/
- Components Overview: https://mui.com/material-ui/react-button/

### Chakra UI

Chakra UI is a React component library designed to be approachable and beginner-friendly, especially for developers who want to focus on building interfaces without writing much custom CSS. Instead of styling components through CSS files or class names, Chakra UI relies heavily on **props** to control layout, color, spacing, and behavior.

One of Chakra UI’s biggest strengths is how naturally it fits into the React mental model. Styling feels similar to CSS-in-JS, but without needing to write CSS syntax yourself. Built-in theming and dark mode support make it easy to maintain consistent design across an application, even as it grows.


- Official Website: https://chakra-ui.com/
- Getting Started: https://chakra-ui.com/docs/getting-started
- Component Docs: https://chakra-ui.com/docs/components/button

---

### Ant Design

Ant Design is a comprehensive React UI system built with **enterprise and data-heavy applications** in mind. It provides a wide range of advanced, production-ready components that are commonly needed in business software, such as tables, forms, modals, and complex layouts. Because of this, Ant Design is frequently used for internal tools and admin-style interfaces where functionality and consistency are more important than custom visuals.

One of Ant Design’s biggest strengths is how much it gives you out of the box. Many components come with sensible defaults tailored for data-driven workflows, which allows teams to move quickly when building dashboards or management systems. Its widespread adoption in enterprise environments also means the library is well-tested and reliable.

- Official Website: https://ant.design/
- Getting Started: https://ant.design/docs/react/introduce
- Components Overview: https://ant.design/components/overview/

---
### Tailwind UI 
Tailwind UI is **not a traditional React component library**. Instead of giving you pre-packaged components that you import, Tailwind UI provides **pre-built component code** written using Tailwind CSS utility classes. You copy this code directly into your project and modify it as needed.

This approach gives you full control over markup and styling. Unlike component libraries where styles are abstracted behind props, Tailwind UI exposes everything explicitly in the JSX. This makes it a powerful option for teams that want highly customized designs without fighting a library’s defaults.

- Tailwind UI Website: https://tailwindui.com/
- Tailwind CSS Docs: https://tailwindcss.com/docs


#### How Tailwind UI Is Different

- You **own the component code**
- You edit classes directly in JSX
- There is no abstraction layer hiding styles
- Customization is explicit, not indirect

This is very different from libraries like Material UI or Chakra UI.

---

### Example 1: Button Component

```jsx
<button
  className="inline-flex items-center justify-center rounded-md 
             bg-blue-600 px-4 py-2 text-sm font-semibold text-white 
             hover:bg-blue-700 focus:outline-none focus:ring-2 
             focus:ring-blue-500 focus:ring-offset-2"
>
  Save
</button>
```

- You see every styling decision
- Changing spacing, color, or layout is immediate
- No library-specific props to learn

---

### Example 2: Responsive Layout

```jsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  <div className="rounded bg-gray-100 p-4">Card 1</div>
  <div className="rounded bg-gray-100 p-4">Card 2</div>
  <div className="rounded bg-gray-100 p-4">Card 3</div>
</div>
```

### Why this matters
- Responsive behavior is built into the class names
- No media queries to manage manually
- Layout logic is colocated with markup

---

### Example 3: Conditional Styling

```jsx
function Badge({ status }) {
  const baseClasses =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium";

  const statusClasses =
    status === "success"
      ? "bg-green-100 text-green-800"
      : status === "warning"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-800";

  return (
    <span className={`${baseClasses} ${statusClasses}`}>
      {status}
    </span>
  );
}
```

- Full control over logic and styles
- No variant system to learn
- Easy to extend and debug

### Component Libraries vs CSS-in-JS

| CSS-in-JS | Component Libraries |
|----------|-------------------|
| You build components | Components already exist |
| You design styles | Styles are predefined |
| Maximum flexibility | Faster development |
| Higher responsibility | Fewer decisions |

CSS-in-JS is about **designing systems**.  
Component libraries are about **using systems**.

---

### When to Use React Component Libraries

| Scenario / Goal | Should You Use a Component Library? | Why |
|-----------------|--------------------------------------|-----|
| Building an MVP or prototype quickly | ✅ Yes | Pre-built components let you move fast without designing everything from scratch |
| Creating an internal tool or admin dashboard | ✅ Yes | Consistency, accessibility, and data-heavy components are already solved |
| Working on an enterprise or team-based project | ✅ Yes | Shared components reduce design disagreements and improve maintainability |
| You need strong accessibility by default | ✅ Yes | Most libraries bake in ARIA roles and keyboard support |
| You don’t want to write or maintain much CSS | ✅ Yes | Styling is handled through props or predefined patterns |
| Learning CSS fundamentals | ❌ No | Libraries hide important styling concepts beginners should understand |
| Building a highly custom or branded UI | ❌ Usually no | Library defaults can be restrictive and hard to override |
| Creating a small static site | ❌ No | A component library adds unnecessary complexity |
| You want full control over markup and layout | ❌ Depends | Tailwind UI may fit, but traditional libraries may feel limiting |
| You’re still learning React basics | ⚠️ Maybe later | Libraries can obscure how components and styles actually work |

## Next Up: Global State

As React applications grow, managing state with useState alone becomes limiting. Local state works well when data is only needed by a single component, but real applications often require sharing state across many parts of the UI. This leads to problems like **prop drilling**, where state must be passed through multiple layers of components, making code harder to read and maintain. 

Global state solves this by providing a shared source of truth for data such as user authentication, themes, filters, or any information that multiple components rely on.