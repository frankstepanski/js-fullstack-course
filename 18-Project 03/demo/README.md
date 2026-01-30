# Moonlight Pizza Co. — React Web App (Project 3)

This project is a **React-based rebuild** of the Moonlight Pizza Co. application previously created using **vanilla HTML, CSS, and JavaScript**.

In **Project 2**, students simulated a full-stack application using static HTML pages, custom JavaScript files, and data fetched from a REST API powered by `json-server`.

In **Project 3**, we keep the **same API, same data, and same features** — but rebuild the frontend using **React**, the most common UI library used in modern web applications.

This project focuses on **how React fundamentally changes the way we structure, reason about, and scale frontend applications**.

## What Changed from the Vanilla JS Version?

### 🔙 Project 2 (Vanilla JavaScript)

Previously, the app relied on:

- Multiple HTML pages (`menu.html`, `order.html`, etc.)
- Manual DOM manipulation (`document.createElement`, `innerHTML`)
- Page-specific JavaScript files
- Careful coordination between:
  - HTML structure
  - CSS files
  - JavaScript logic
- Fetch calls tied directly to specific pages

This approach works — and is **important to understand** — but it becomes difficult to scale as applications grow.

### 🔁 Project 3 (React)

In this version:

- The entire UI is rendered from **JavaScript**
- Pages are replaced with **React components**
- UI updates are driven by **state**, not manual DOM updates
- Data fetching is handled inside components using hooks
- Layout and logic are co-located for better maintainability

Instead of asking *“How do I change this part of the DOM?”*, React encourages you to think:

> “Given this state, what should the UI look like?”

## What’s New in This Version?

Compared to the vanilla JS project, this React version introduces:

- Component-based architecture
- Reusable UI components (MenuItem, PizzaCard, CartItem, etc.)
- Declarative rendering (React decides how the DOM updates)
- Centralized application state
- Cleaner separation of **data → state → UI**
- A modern development environment using **Vite**

The backend API remains the same and is still powered by `json-server`.

## 📁 Project File Structure (React)

```
moonlight-pizza/
├── src/
│   ├── components/
│   │   ├── MenuList.jsx
│   │   ├── PizzaCard.jsx
│   │   ├── Cart.jsx
│   │   └── Header.jsx
│   ├── pages/
│   │   ├── Menu.jsx
│   │   ├── Specials.jsx
│   │   ├── Order.jsx
│   │   └── Contact.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
│       ├── base.css
│       └── layout.css
├── db.json
├── index.html
└── package.json
```

### How This Differs from Vanilla JS

| Vanilla JS                    | React                              |
|--------------------------------|------------------------------------|
| Multiple HTML files            | Single HTML entry point            |
| Page-specific JS files         | Reusable components                |
| Manual DOM manipulation        | Declarative rendering              |
| Tight coupling to HTML         | UI driven by state                 |
| Hard to share logic            | Easy logic reuse via components    |

## Routing: Pages vs Components

In Project 2, navigation happened through **separate HTML files**.

In React:

- Pages are components
- Navigation is handled inside the app (often with React Router)
- No full page reloads
- State can persist between views

This creates a smoother user experience and simplifies data sharing.

## API + Frontend (Same Backend, New Frontend)

Just like Project 2, this project simulates a full-stack app by running **two servers**:

| Server Type     | Purpose                    | How to Start        |
|-----------------|----------------------------|---------------------|
| **JSON Server** | Simulated REST API backend | `npm run server`    |
| **Vite Dev**    | React frontend             | `npm run dev`       |

The API endpoints remain unchanged.

### API Endpoints Used

```
http://localhost:3000/pizzas
http://localhost:3000/specials
http://localhost:3000/contactCards
http://localhost:3000/cart
http://localhost:3000/orders
http://localhost:3000/testimonials
```

React components fetch only the data they need.

## Example: Fetching Data in React

```js
useEffect(() => {
  fetch("http://localhost:3000/pizzas")
    .then(res => res.json())
    .then(setPizzas)
    .catch(console.error);
}, []);
```

Key differences from vanilla JS:

- Runs when the component mounts
- Updates state
- Automatically re-renders the UI
- No manual DOM updates required

## Why React Is an Upgrade (Conceptually)

React doesn’t replace JavaScript — it **organizes it**.

### Advantages Over Vanilla JS

- Predictable UI updates
- Easier mental model for complex UIs
- Less fragile DOM code
- Better reuse of logic and layout
- Industry-standard tooling and patterns
- Scales well as applications grow

### Important Note

Understanding **vanilla JavaScript first** is critical.

React makes more sense *because* you’ve already experienced:

- Manual DOM updates
- Shared state between pages
- Repeated logic
- UI bugs caused by timing issues

## How to Run This Project

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Start the API Server

```bash
npm run server
```

Runs at: http://localhost:3000

### 3️⃣ Start the React App

```bash
npm run dev
```

Runs at: http://localhost:5173

## What This Project Is Teaching You

This project is **not about memorizing React syntax**.

It’s about learning:

- How modern frontend apps are structured
- How state drives UI
- How components replace static pages
- How APIs integrate with UI frameworks
- How real production apps are built
