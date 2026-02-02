# Moonlight Pizza Co. — React Web App (Project 03)

This project rebuilds **Moonlight Pizza Co. Project 02** using **React** while keeping the **same UI, same API, and same data**.

The goal of this project is **not** to add new features — it’s to understand how a real-world vanilla JavaScript app translates into a modern React architecture.

> If Project 02 taught you *how the browser works*, this project teaches you *how teams actually build frontend apps*.

## What Stayed the Same

This React version intentionally preserves everything that already worked:

- Same visual design (100% UI parity)
- Same responsive behavior (mobile-first)
- Same REST API
- Same endpoints
- Same data flow
- Same user experience

The backend **does not change**.

We are still using [`json-server`](https://github.com/typicode/json-server) as a mock REST API.

## What Changed (High-Level)

| Vanilla JS (Project 02) | React (Project 03) |
|------------------------|-------------------|
| Multiple HTML files | One HTML file |
| File-based navigation | Client-side routing |
| Manual DOM updates | State-driven rendering |
| Global variables | React Context |
| `querySelector` / `innerHTML` | JSX |
| Script tags | ES module imports |
| Event listeners | JSX event handlers |

## Key Conceptual Shift

**Vanilla JS**  
> "Find elements → update them manually"

**React**  
> "Describe what the UI should look like for a given state"

You no longer *tell* the DOM what to do.  
You *declare* what the UI should look like — React handles the updates.

## 🧱 Tech Stack

- Vite + React
- React Router
- React Context
- styled-components
- json-server (unchanged)

## 📁 Project Structure (React)

```
moonlight-pizza-react/
├── public/
│   └── images/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Specials.jsx
│   │   ├── Order.jsx
│   │   └── Contact.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── styles/
│   │   └── GlobalStyles.js
│   ├── App.jsx
│   └── main.jsx
├── db.json
├── package.json
```

## HTML Pages → React Components

### Before (Vanilla JS)

- `index.html`
- `menu.html`
- `specials.html`
- `order.html`
- `contact.html`

### Now (React)

Each page is a **React component**:

| Page | Component |
|------|-----------|
| Home | `Home.jsx` |
| Menu | `Menu.jsx` |
| Specials | `Specials.jsx` |
| Order | `Order.jsx` |
| Contact | `Contact.jsx` |
All pages render inside a **single HTML file** (`index.html`), which React controls.

## Navigation → React Router

### Before

```html
<a href="menu.html">Menu</a>
```

### Now

```jsx
<Link to="/menu">Menu</Link>
```

Routes are defined once in the app:

```jsx
<Route path="/menu" element={<Menu />} />
```

Navigation happens **without reloading the page**.

## CSS → styled-components

### Before

- Global CSS files loaded with `<link>`
- Styles applied by class names

### Now

- Styles live next to components
- Components encapsulate structure + styles
- Visual output remains **identical**

```js
import styled from "styled-components";

const Card = styled.article`
  background: white;
  padding: 1rem;
`;
```

A `GlobalStyles` file injects the original CSS rules so spacing, fonts, and breakpoints match exactly.

## DOM Manipulation → State

### Before

```js
container.innerHTML += pizzaHTML;
```

### Now

```jsx
{pizzas.map((pizza) => (
  <PizzaCard key={pizza.id} {...pizza} />
))}
```

React updates the DOM automatically whenever state changes.

## Global Variables → React Context

Shared state (cart / order data) is handled with **React Context** instead of global variables.

```jsx
<CartProvider>
  <App />
</CartProvider>
```

This allows:

- Shared state across pages
- Predictable data flow
- No manual syncing
- Cleaner architecture

## 🧠 How the App Runs (Frontend + Backend)

This project still runs **two servers**, just like Project 02.

| Server | Purpose | Port |
|-------|--------|------|
| Frontend (Vite) | React app | `5173` |
| Backend | json-server API | `3001` |

## 📜 npm Scripts

```json
"scripts": {
  "dev": "vite",
  "server": "json-server --watch db.json --port 3001",
  "dev:all": "concurrently \"npm run dev\" \"npm run server\""
}
```

### Script Breakdown

- **`npm run dev`**  
  Starts the React dev server  
  `http://localhost:5173`

- **`npm run server`**  
  Starts the API  
  `http://localhost:3001`

- **`npm run dev:all`**  
  Runs both at once (recommended)

## ▶️ Running the Project

```bash
npm install
npm run dev:all
```

Open in browser:

- Frontend → http://localhost:5173
- API → http://localhost:3001

## API Endpoints (Unchanged)

```
http://localhost:3001/pizzas
http://localhost:3001/specials
http://localhost:3001/contactCards
http://localhost:3001/cart
http://localhost:3001/orders
http://localhost:3001/testimonials
```

Each page fetches **only the data it needs**.

## Example Fetch in React

```js
useEffect(() => {
  fetch("http://localhost:3001/pizzas")
    .then((res) => res.json())
    .then(setPizzas)
    .catch(console.error);
}, []);
```

## Why This Project Exists

This project is the **bridge**:

- From static pages → component architecture
- From scripts → applications
- From DOM manipulation → state-driven UI
- From beginner projects → professional frontend patterns

Nothing magical happened — React simply organizes what you already know.

## What Comes Next

In future projects, you will:

- Build new features directly in React
- Replace `json-server` with a real backend
- Add authentication and persistence
- Deploy frontend and backend separately

By then, React should feel **familiar**, not confusing.