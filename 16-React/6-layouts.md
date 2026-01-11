# Reusable Layouts


Most websites repeat the same structure across many pages — headers, navigation, footers, and sidebars.

Before React, developers copied HTML between pages or relied on server-side templates.

React introduced **component-based reuse**, and React Router added **route-aware layouts** that align UI structure with navigation.

Before learning layouts in React, it’s important to understand that **reusable layouts are not a React idea** — they’ve existed in web development long before React.

Reusable layouts exist to solve one simple problem:

> **“How do we define shared structure once, and swap out the content inside it?”**


## What Is a Reusable Layout? (Framework‑Agnostic)

A reusable layout is **shared page structure** that stays the same while the main content changes.

Common layout pieces:
- Header / navigation
- Footer
- Sidebar
- Page containers

Why layouts matter:
- Avoid copy‑pasting HTML
- Keep UI consistent
- Reduce bugs
- Make global updates easy

This concept exists in many systems:
- Server-side templates (partials, includes)
- CMS themes
- Backend frameworks
- Component-based frontend frameworks

React simply gives us a **clean, predictable way** to model this idea using components.

## How React Thinks About Layouts

In React, layouts are just **components that wrap other components**.

Instead of thinking:
> “This HTML file contains everything”

You start thinking:
> “This layout defines the frame, and pages fill in the middle”

Conceptually, it looks like this:

```
Layout
 ├── Header
 ├── Navigation
 ├── Page Content (changes)
 └── Footer
```


## Option 1: Reusable Layouts with `children` + Basic React Router

This approach combines:
- **React composition** (a `Layout` component that wraps content using `children`)
- **Basic React Router routing** (so URLs like `/`, `/menu`, `/contact` show different “pages”)

It’s a very common “first step” before learning router-based layouts with `<Outlet />`.



### What does `children` mean?

In React, `children` is whatever you put between a component’s opening and closing tags.

Example:

```jsx
<Layout>
  <h1>Hello</h1>
  <p>This is inside Layout</p>
</Layout>
```

Inside `Layout`, `children` becomes:

- `<h1>Hello</h1>`
- `<p>This is inside Layout</p>`

So `Layout` can decide **where** to place that content.


```text
<Layout>
  children (your page content)
</Layout>

renders as:

HEADER
MAIN: (children go here)
FOOTER
```
---

### Step 1 — Create a Layout Component

**Layout.jsx**

```jsx
import React from "react";

function Header() {
  return (
    <header style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <h1 style={{ margin: 0 }}>Moonlight Pizza</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ padding: 12, borderTop: "1px solid #ddd", marginTop: 24 }}>
      <small>© 2025 Moonlight Pizza</small>
    </footer>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ padding: 12 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
```

✅ What this gives you:
- A shared header/footer
- A consistent page structure
- One place to update your layout later

### Step 2 — Create “Pages” That Use the Layout

**pages/Home.jsx**

```jsx
import React from "react";
import Layout from "../Layout";

export default function Home() {
  return (
    <Layout>
      <h2>Home</h2>
      <p>Welcome to Moonlight Pizza 🍕</p>
    </Layout>
  );
}
```

**pages/Menu.jsx**

```jsx
import React from "react";
import Layout from "../Layout";

export default function Menu() {
  return (
    <Layout>
      <h2>Menu</h2>
      <ul>
        <li>Margherita</li>
        <li>Pepperoni</li>
        <li>Veggie</li>
      </ul>
    </Layout>
  );
}
```

**pages/Contact.jsx**

```jsx
import React from "react";
import Layout from "../Layout";

export default function Contact() {
  return (
    <Layout>
      <h2>Contact</h2>
      <p>Email: hello@moonlight.pizza</p>
    </Layout>
  );
}
```

### Step 3 — Add Basic Routing (URLs show different pages)

Here’s a basic Router setup using **Element Router style**.

**main.jsx**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";

function NavBar() {
  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #eee" }}>
      <Link to="/">Home</Link>{" | "}
      <Link to="/menu">Menu</Link>{" | "}
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
```

###  What's Rendering on Each URL?

#### When the user visits `/`

```text
<BrowserRouter>
  <NavBar />
  <Routes>
    <Home />
      <Layout>
        <Header />
        (Home content)
        <Footer />
      </Layout>
</BrowserRouter>
```

#### When the user visits `/menu`

```text
<BrowserRouter>
  <NavBar />
  <Routes>
    <Menu />
      <Layout>
        <Header />
        (Menu content)
        <Footer />
      </Layout>
</BrowserRouter>
```

### Limitations

This approach works, but it has real downsides in bigger apps:

#### 1) **Repetition in every page**
Every page must do:

```jsx
return <Layout>...</Layout>
```

If you have 20 pages, you repeat this 20 times.

Now the page has no header/footer and looks “broken”.

#### 2) **Nested layouts get messy**
If you later want a special layout inside `/menu/*`, you can end up with:

```jsx
<Layout>
  <MenuLayout>
    ...
  </MenuLayout>
</Layout>
```

It works, but can become hard to manage.

#### 3) Router features don’t connect to the layout
React Router’s more advanced features (like:
- nested routes with `<Outlet />`
- loaders
- actions
- error boundaries
) are much cleaner when the layout is managed by the router.

---

### When to use this option

Use **children-based layouts + basic routing** when:
- You’re learning React fundamentals
- You have a small app
- You want the simplest "layout wrapper" pattern
- You’re not ready for nested routing layouts yet

## Option 2: Reusable Layouts Using React Router Layout Routes (`<Outlet />`)

This option uses **React Router** to manage reusable layouts **based on the URL**.

Instead of each page manually wrapping itself in `<Layout>{children}</Layout>`, you define a **layout route** once, and React Router automatically renders:

- the shared layout (header/footer/sidebar)
- plus the correct page *inside* the layout

This is **routing-based layout composition**.

You create a `Layout` component that contains shared UI, and you place an **`<Outlet />`** where child routes should appear.

```jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>Header / Nav</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}
```

✅ Key idea:  
`<Outlet />` is a **placeholder** that React Router fills with the matching child page.

---

### Mental model

> “The route decides the layout. The URL picks the page. Router inserts the page into the layout.”

### Visual 
```
URL: /menu
   ↓
Router matches:
  Layout route ("/")
  └─ child route ("menu")
   ↓
Render:
<Layout>
  <Outlet> ← becomes <MenuPage />
</Layout>
```

### Another way to see it

```
+------------------------------+
|           Layout             |
|  Header / Nav / Footer       |
|                              |
|   +----------------------+   |
|   |      <Outlet />      |   |
|   |  (Child page here)   |   |
|   +----------------------+   |
+------------------------------+
```

### How It Works Behind the Scenes

React Router does a few things when you click a `<Link>` or type a URL:

1. **Reads the browser URL** (like `/menu`)
2. **Finds the route that matches** that URL
3. If the route is nested, it matches **a parent + a child**
4. React Router renders:
   - the **parent route element** first (your layout)
   - then it renders the **child route element**
5. The child element is placed into `<Outlet />`

### Why this is powerful

Because the layout is attached to the route tree, you get:

- **shared layout automatically**
- **nested layouts** cleanly
- optional advanced features (depending on router type):
  - **loaders** (fetch before render)
  - **actions** (form submissions)
  - **error boundaries** (route-level errors)

---


### Step 1 - Create Your Pages

Example files:

```
src/pages/Home.jsx
src/pages/Menu.jsx
src/pages/Contact.jsx
```

Example page:

```jsx
// src/pages/Menu.jsx
export default function Menu() {
  return <h2>Menu Page</h2>;
}
```

### Step 2 Create the Layout Component

```jsx
// src/Layout.jsx
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <h1>Moonlight Pizza</h1>
        <nav>
          <Link to="/">Home</Link>{" | "}
          <Link to="/menu">Menu</Link>{" | "}
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <hr />

      {/* Child routes render here */}
      <main>
        <Outlet />
      </main>

      <hr />

      <footer>© 2025 Moonlight Pizza</footer>
    </>
  );
}
```

### Step 3 - Create Your Router With Nested Routes

This example uses the **Data Router style** (v6.4+ / v7 style), because it’s the modern approach and powers loaders/actions.

```jsx
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Contact from "./pages/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,          // parent layout route
    children: [
      { index: true, element: <Home /> },       // "/"
      { path: "menu", element: <Menu /> },      // "/menu"
      { path: "contact", element: <Contact /> } // "/contact"
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

✅ Notice:
- The **Layout** is the parent route at `/`
- Every page underneath it renders **inside `<Outlet />`**

### Step 4 - Confirm It Works (What You Should See)

When you visit:

- `/` → Layout + Home in the Outlet
- `/menu` → Layout + Menu in the Outlet
- `/contact` → Layout + Contact in the Outlet

Visual:

```
Visit /menu
┌───────────────────────────────┐
│ Header / Nav (Layout)         │
├───────────────────────────────┤
│ Menu Page (Child in Outlet)   │
├───────────────────────────────┤
│ Footer (Layout)               │
└───────────────────────────────┘
```

## What's Next: Nested Layouts in React Router

After learning the **two ways to create reusable layouts** — using `children` composition and router-based layouts with `<Outlet />` — the next major concept is **nested layouts**.

Nested layouts are how real-world applications scale their UI and routing logic without duplication or confusion.


Most real applications do **not** use a single layout everywhere.

Examples we've talked about already:
- Public site layout (header + footer)
- Dashboard layout (sidebar + content)
- Settings pages with sub-navigation
- Admin sections that look different from public pages

This leads to a natural question:

> How do we reuse layouts *inside other layouts*?

Nested layouts solve this problem.

### Layouts Form a Tree

Instead of one flat layout, modern apps use a **layout hierarchy**.

```
<AppLayout>
 ├── Home
 ├── Menu
 └── <DashboardLayout>
      ├── DashboardHome
      ├── Orders
      └── Settings
```

This structure mirrors URLs:

```
/                → Home
/menu            → Menu
/dashboard        → Dashboard Home
/dashboard/orders
/dashboard/settings
```

Each layout owns:
- Its shared UI
- Its navigation
- A place where child content appears

### How React Router Handles Nested Layouts

React Router’s **Data Router** was designed for this.

Key ideas:
- Routes are defined as a tree
- Layouts live at branch routes
- Pages live at leaf routes
- `<Outlet />` is where child routes render

Mental model:

> Routes form the structure.  
> Layouts define shared UI.  
> `<Outlet />` is the window for child pages.

## Nested Layout Example

### App Layout (Top Level)

```jsx
function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
```

### Dashboard Layout (Nested)

```jsx
function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

### Router Configuration

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "orders", element: <Orders /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);
```

```
URL changes
   ↓
Parent layout renders
   ↓
Nested layout renders
   ↓
Child route renders into <Outlet />
```

Only the content inside `<Outlet />` changes — everything else stays mounted.

---

### Strength of Nested Layouts

Nested layouts help you:
- Avoid repeating headers, navs, and sidebars
- Match UI structure to URL structure
- Scale apps without refactoring later
- Understand how real dashboards are built

This is the foundation for:
- Admin panels
- Authenticated areas
- Multi-step flows
- Large React applications

### Decision Guide

| Use Case | Best Tool |
|--------|----------|
| Simple reusable UI | `children` composition |
| Shared page structure | Router layouts |
| Multiple layout sections | Nested layouts |
| Real-world app architecture | Data Router + `<Outlet />` |


## What's Next: Protected Routes

At first, you learned basic **routing** in how to show different components for different URLs, so your app can behave like it has multiple pages without reloading. 

Once you're comfortable with that, the next step is avoiding repetition by building **reusable layouts** — shared pieces like headers, navigation bars, and footers that appear across many pages.

From there, layouts become more closely tied to routing itself.
Instead of manually wrapping every page, you let the router control which layout appears for which section of the app. 

This then naturally lead into **nested routes**, where pages can live inside other pages, such as a menu section with sub-pages for pizzas, drinks, or specials. At this point, you’re no longer just switching pages — you’re designing an application structure.

Once you understand how pages and layouts fit together, the next real-world question appears almost automatically: should everyone be allowed to see every page?

In real applications, the answer is almost always no.

Some pages are meant only for logged-in users, administrators, or users with special permissions. This is where **protected routes** come in, and why they are a natural next step after layouts and nested routing.

### Protected Routes

>At its core, a protected route is simply a route with a gate in front of it.

Before React Router shows the page, your app checks whether the user meets certain requirements. If the requirement passes, the page is displayed. If it fails, the user is redirected somewhere else or shown a fallback screen.

The most common requirement is authentication — whether the user is logged in or not — but protected routes are not limited to that. They can also be used to enforce roles, permissions, onboarding steps, feature flags, or any other rule your application needs.

Protected routes help transform your app from a collection of pages into a controlled, real-world experience.

### Example Scenario

Imagine a pizza app:

- `/` → Home (public)  
- `/menu` → Menu (public)  
- `/order` → Order (public)  
- `/account` → Account (protected)  
- `/admin` → Admin dashboard (protected)  

Only logged-in users should see `/account`.  
Only admins should see `/admin`.

Protected routes enforce those rules.

### Implementing Protected Routes 

A protected route is just a regular route that checks a condition before rendering. That condition usually lives inside a wrapper component.

### Step 1 - A Simple Auth Check

```js
export const auth = {
  isLoggedIn: false,
  role: "user",
};
```


### Step 2 - Create a Route Guard

```jsx
import { Navigate } from "react-router-dom";
import { auth } from "./auth";

export function RequireAuth({ children }) {
  if (!auth.isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
```

### Step 3 - Protect a Single Route

```jsx
<Route
  path="/account"
  element={
    <RequireAuth>
      <Account />
    </RequireAuth>
  }
/>
```

### Step 4 - Protecting Admin Routes

```jsx
export function RequireAdmin({ children }) {
  if (!auth.isLoggedIn) return <Navigate to="/" replace />;
  if (auth.role !== "admin") return <Navigate to="/account" replace />;
  return children;
}
```

```jsx
<Route
  path="/admin"
  element={
    <RequireAdmin>
      <AdminDashboard />
    </RequireAdmin>
  }
/>
```

## What's Next: Protected Layouts in React Router

Protected layouts are the **next evolution of protected routes**.

Instead of protecting one page at a time, a protected layout lets you protect an **entire section of your app** with a single rule. This mirrors how real applications work — dashboards, admin areas, and account sections all share the same access requirements.

As apps grow, routing usually progresses like this:

1. Show different pages for different URLs  
2. Share UI with layouts (header, nav, footer)  
3. Nest routes to create sections  
4. **Protect entire sections with layouts**

Protected layouts answer the question:

> “Everything under this URL requires permission — how do we enforce that cleanly?”

Instead of repeating checks on every page, the router enforces access **once**, at the layout level.


```
/account
 ├── overview
 ├── orders
 └── settings
```

If `/account` is protected, **everything inside it is protected automatically**.

### The Core Idea

A protected layout is just:

- A **layout component**
- Wrapped by an **authentication check**
- With child routes rendered via `<Outlet />`

### Step 1 - Create an Auth Guard

```jsx
import { Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
  const isLoggedIn = true; // replace with real auth logic

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

This component:
- Checks a condition
- Either allows access or redirects

### Step 2 - Create the Layout

```jsx
import { Outlet } from "react-router-dom";

export function AccountLayout() {
  return (
    <div>
      <h2>Account</h2>
      <Outlet />
    </div>
  );
}
```

This layout:
- Renders shared UI
- Provides a placeholder for child routes

### Step 3 - Protect the Layout in the Router

```jsx
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "account",
    element: (
      <RequireAuth>
        <AccountLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <AccountOverview /> },
      { path: "orders", element: <Orders /> },
      { path: "settings", element: <Settings /> }
    ]
  }
]);
```

Now:
- `/account`
- `/account/orders`
- `/account/settings`

are **all protected automatically**.

### What Happens When a User Visits `/account/orders`

```
User types /account/orders
        ↓
Router matches /account
        ↓
RequireAuth runs
        ↓
Allowed? → YES → AccountLayout renders
        ↓
<Outlet /> renders Orders page
```

If the user is NOT logged in:

```
RequireAuth → Redirect to /login
```

### Why This Pattern Scales

Without protected layouts:
- Auth checks are duplicated
- Pages become cluttered
- Rules are easy to forget

With protected layouts:
- One rule protects many pages
- Pages stay focused on UI
- Access logic is centralized

## What’s Next: Role-Based Access with React Router

At this stage, your application already understands how to behave like a real multi-page app. It can show different screens for different URLs, reuse layouts across multiple pages, and restrict entire sections of the app to users who are logged in. Once those pieces are in place, a new question naturally comes up: even if someone is logged in, should they really have access to everything?

In real applications, the answer is almost always no. Not all users are equal. Some users are administrators, some are staff, and others are regular customers. Role-based access is the next step that allows your app to reflect these real-world differences. Instead of just asking "is this user logged in?", your app begins asking "what is this user allowed to do?"

To understand this shift, it helps to think about the difference between identity and permission. 

**Authentication** answers the question of who the user is — whether the app recognizes them and knows they are logged in. **Authorization**, on the other hand, answers what that user is allowed to see or interact with. Protected routes and layouts focus on authentication, while role-based access builds on top of them to handle authorization.

This progression is intentional and mirrors how real systems are designed. 

- You start by defining pages, then introduce shared layouts to avoid repetition. 
- From there, layouts become tied to routes, routes become nested, and access is restricted to logged-in users. 
- Role-based access is simply the next layer added to those existing gates. 

>Instead of saying "only logged-in users can enter this section," you now say "only admins can enter here" or "only staff can manage this page."

By layering role-based rules on top of protected layouts, your app becomes more realistic, more secure, and easier to reason about as it grows. You’re no longer just controlling navigation — you’re modeling real permissions and responsibilities inside your application, just like production-level software does.

### Common Real-World Examples

Role-based access is everywhere:

- Admin dashboards
- Internal tools
- Order management systems
- Content moderation panels
- Company-only portals

Example routes:

- `/account` → any logged-in user
- `/admin` → admins only
- `/staff/orders` → staff only

Think of routing like a building:

```
Front Door (Public)
   ↓
Security Desk (Authentication)
   ↓
Badge Scanner (Role Check)
   ↓
Allowed Room (Page renders)
```

Role-based access is the **badge scanner**.

---

### Role-Based Guard Component

This component acts like a **security guard** in front of certain pages.

Before React Router is allowed to show the page, this component checks:
1. Is the user logged in?
2. Does the user have the right role?

If either check fails, the user is redirected somewhere else.

### The Guard Component

```jsx
import { Navigate } from "react-router-dom";

function RequireRole({ user, allowedRoles, children }) {
  // If no user exists, they are not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but does not have permission
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Access granted
  return children;
}
```

### Understanding the Props

#### user
Represents the currently logged-in user.

```js
const user = {
  id: 1,
  name: "Alex",
  role: "admin"
};
```

If `user` is `null`, no one is logged in.

#### allowedRoles
An array defining which roles are allowed to view this section.

```js
["admin"]
```

#### children
The UI being protected. If checks pass, this content is rendered.

### Using Role-Based Access with Layouts

```jsx
{
  path: "admin",
  element: (
    <RequireRole user={user} allowedRoles={["admin"]}>
      <AdminLayout />
    </RequireRole>
  ),
  children: [
    { index: true, element: <AdminDashboard /> },
    { path: "users", element: <UserManagement /> },
    { path: "reports", element: <Reports /> }
  ]
}
```

### How This Works

1. User navigates to `/admin`
2. React Router matches the route
3. `<RequireRole />` runs before rendering
4. User role is checked
5. Access is granted or denied
6. If granted, layout and child routes render

```
/admin
 └── RequireRole (admin only)
      └── AdminLayout
           ├── Dashboard
           ├── Users
           └── Reports
```

#### Why This Pattern Matters

- Centralizes permission logic
- Prevents duplication
- Keeps pages focused on UI
- Scales cleanly for real applications


## What’s Next:  Authentication Flows Explained

Before we wrap up this section, it’s important to zoom out and look at the bigger picture.

Up to this point, you've learned how to show different pages using routes, share layouts across sections of an app, and block access to certain pages. However, all of those protections rely on a single foundational question: who is the current user?

**Authentication** exists to answer that question. 

Without authentication, the app has no concept of identity—it cannot tell whether someone is a guest, a logged-in user, or an administrator. Protected routes and layouts only work because authentication provides a reliable way to identify the user before deciding what should be shown.

In other words, authentication is the foundation that allows routing rules and layout protections to function in a meaningful way.

### Authentication vs Authorization

As we talked about in **Role-Based Access with React Router**, authentication and authorization are closely related, but they solve different problems.

Authentication is about identity. It answers the question, “Who are you?” When a user logs in successfully, the application knows who they are and can store information about them, such as their name or role. The result of authentication is usually a user object—or no user at all if the person is not logged in.

Authorization is about rules. It answers the question, “What are you allowed to do?” Once the app knows who the user is, it can decide which pages they can access, which actions they can perform, or which sections of the app should be hidden from them.

>You cannot enforce authorization rules unless authentication happens first. Authentication provides identity; authorization builds on that identity to control access.

---

### A Simple Authentication Flow (Conceptual)

Here’s the most common flow in almost every web app:

```
User opens app
     ↓
App checks: Is the user logged in?
     ↓
No ──▶ Show public pages / login page
Yes
     ↓
Store user info in app memory
     ↓
Protected routes & layouts now work
```

Once a user is authenticated, everything else builds on top of that.

### Login Flow (Step by Step)

1. User fills out a login form
2. User clicks **Log In**
3. App sends credentials to a server (or fake API)
4. Server verifies credentials
5. Server responds with user data
6. App stores the user in memory (state/context)
7. App unlocks protected routes

Visually:

```
Login Form → Verify Credentials → Set User → Unlock App
```

### Where Does the Logged-In User Live?

In React apps, the authenticated user usually lives in:

- React state
- React Context (most common)
- Sometimes browser storage 

Conceptually:

```
<App>
 └── AuthProvider
      ├── user
      ├── login()
      └── logout()
```

### Logout Flow

Logging out is simpler but just as important:

1. User clicks **Log Out**
2. App clears the stored user
3. Protected routes immediately lock again
4. User is redirected to a public page

```
User clicks logout → Clear user → Redirect → Access removed
```

---

### Sessions

A **session** means:
> “The app remembers who you are between page views.”

For now:
- The session lives in React memory
- Refreshing the page usually clears it

Later, sessions can be persisted using cookies or storage.

### How Authentication Powers Protected Routes

Protected routes usually check one thing:

```js
if (!user) {
  redirectToLogin();
}
```

Protected layouts do the same — but for **entire sections**.

Role-based access adds one more check:

```js
if (user.role !== "admin") {
  blockAccess();
}
```

Everything depends on authentication first.

### Why Authentication Is a Foundation Topic

Authentication:
- Powers protected routes
- Enables role-based access
- Controls layouts and sections
- Makes apps feel real and secure

Without it, everything else is just UI.

>Authentication is the backbone — everything else builds on top of it.

## What to Learn Next on Your Own

At this point, you’ve learned how layouts, routing, protected routes, and access rules fit together.
To become a proficient developer, there are a few closely related topics worth exploring next. These build directly on what you’ve already learned and show how real applications manage users over time.

Some important areas to continue learning include:

- **Authentication context in React**
How apps store and share the current user’s login state across the entire component tree.

- **Redirect-after-login flows**
Sending users back to the page they originally tried to access after logging in.

- **Persisting sessions**
Keeping users logged in across page refreshes using tools like localStorage, cookies, or server sessions.

- **Handling loading and auth states**
Showing spinners, skeletons, or placeholders while authentication status is being checked.

## Key Takeaways

- Modern React apps are structured around **routes**, not separate HTML pages, allowing different components to appear based on the URL without reloading the browser.

- Reusable layouts prevent duplication by sharing common UI like headers, navigation, and footers across multiple pages.

- Layouts can be created in two main ways:
  - Using children props for simple UI composition.
  - Using React Router layouts with `<Outlet />` to tie layouts directly to routes.

- Router-based layouts scale better because the router controls both page structure and navigation, keeping layout logic centralized and predictable.

- **Nested routes** allow pages to exist inside other pages, making it easier to model real application sections like dashboards, menus, or settings areas.

- **Protected routes** add access control by checking conditions before a page is rendered, commonly used for authentication (logged-in vs logged-out users).

- **Protected layouts** extend this idea by guarding entire sections of an app at once, ensuring all nested routes follow the same access rules.

- Role-based access builds on protected layouts by adding authorization rules, allowing different users (admin, staff, user) to see different parts of the app.

- **Authentication** answers who the user is, while **authorization** defines what the user is allowed to access—both are required for real-world applications.

- Together, layouts, nested routing, protected routes, and role-based access form the foundation of scalable, secure React application architecture.

## Next Up: Styling

Styling in React is different from traditional HTML, CSS, and JavaScript websites because your entire app is bundled together and runs as a single-page application, which means all imported 

**CSS is global by default.**

When using a tool like Vite, any .css file you import applies to the entire app, making it easy to accidentally override styles or create class name conflicts as the project grows. 

Because of this, React apps typically separate global styles (such as resets, fonts, and design tokens) from component-level styles, which live alongside the components they style. To manage this, developers use patterns like CSS Modules (which scope styles to a component), inline style objects for dynamic values, utility-first frameworks like Tailwind, or CSS-in-JS libraries that bind styles directly to components. 

Larger projects often rely on component libraries that bundle styling, accessibility, and behavior together. Overall, React styling shifts the mindset from page-based CSS to component-based styling, focusing on predictability, reuse, and long-term maintainability rather than just visual appearance.