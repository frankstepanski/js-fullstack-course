# Project 03: React App Using an API (json-server)

## Project Overview

In this project, you will build a **React application** that connects to an API and displays real data.

This project moves beyond static HTML and vanilla JavaScript into a **component-based React architecture**.

🔹 You will use **json-server** to create your own API  
🔹 Your React app will connect to that API using `fetch()`  
🔹 You will work with both **GET and POST requests**

> ⚠️ This project introduces the foundation of full-stack development — separating your frontend (React) and backend (API).

## Key Skills Covered

- React fundamentals  
- React Router  
- useState (local + global state)  
- useEffect  
- API integration (GET + POST)  
- json-server  
- component-based architecture  
- event-driven programming  
- frontend ↔ backend communication  
- Git & GitHub  

## Architecture Overview

Your application separates concerns into two layers:

| Layer | Description | Technologies |
|-------|-------------|--------------|
| **Presentation Layer** | User interface that interacts with the API | React |
| **Application Layer** | Serves data via json-server | json-server |

The request flow looks like this:

```
Frontend (React)
        ↓
json-server API
        ↓
db.json (data)
```

## Core CRUD Features

Your React application must:

- connect to a **json-server API**
- perform **GET requests** to retrieve data
- perform **POST requests** to send data (at minimum)
- use **React Router** with at least **3 page components**
- manage **state globally** (shared across the app)
- manage **local state** inside at least one component
- use **useEffect** to:
  - initialize components with API data
- use **event handlers** to trigger API calls (such as POST)

> 🎯 **Goal:** Learn how real React applications interact with APIs and manage state across components.

## Development Focus

### 1️⃣ User Stories
Write at least **three user stories** describing what users can do in your app.

**Example:**  
As a user, I want to view menu items so I can decide what to order.

---

### 2️⃣ Wireframes
Create wireframes for **at least three pages**.

Wireframes should show:
- layout structure
- where API data will be displayed
- user interactions (buttons, forms)
- navigation between pages

## Backend Architecture Requirements

### Frontend Setup

1. Create a GitHub repository  
2. Create a `client` folder
3. Build your React app (using Vite) in the root of `client` folder  
4. Set up your project structure  

>When using Vite, use `.` as project name so scaffolded project folder is created in `client` folder

5. Create a `.env` file

---

### Backend Setup (json-server)

6. Create a `server` folder
7. Navigate to your `server` folder  
8. Run `npm init` to create your Node package.json file
9. Install json-server  

```bash
npm install json-server@0.17.4
```

10. Create a `db.json` file  
11. Create a `server.js` file  

```
import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("JSON Server running");
});
```

12. Update your package.json file:

```
 "type": "module",
 "scripts": {
    "start": "node server.js"
  },
```

12. Start your server:

```bash
npm start
```

## Database Seeding

Your `db.json` acts as the database for this project. You should populate it with initial data before starting development so your app has records to display and test against.

### Required JSON Data

Your `db.json` should contain structured data such as:

- `pizzas`
- `orders`
- `cart`
- `specials`
- `reviews`

Your app must:
- read from multiple resources (GET)
- write to at least one resource (POST)

## Technical Requirements

| # | Requirement | Description |
|---|-------------|-------------|
| 1 | **React App** | Must be built using React (Vite). |
| 2 | **React Router** | At least 3 page components using routing. |
| 3 | **GET Requests** | Fetch and display API data. |
| 4 | **POST Request** | Send data to the API. |
| 5 | **useEffect** | Used for loading initial data. |
| 6 | **State Management** | Global + local state required. |
| 7 | **Event Handling** | Trigger API calls via user interaction. |
| 8 | **json-server API** | Required backend for this project. |
| 9 | **GitHub repository** | Full project pushed to GitHub. |
| 10 | **Commit history** | At least 15 meaningful commits. |

## Deployment

While full deployment is not required for this project, your app should be runnable locally with both the React frontend and json-server backend running simultaneously.

When ready to deploy in future projects:

| Component | Platform |
|-----------|----------|
| Frontend | Vercel or Netlify |
| Backend (json-server) | Render or Railway |

## Project Deliverables

| Category | Description |
|-----------|-------------|
| **Functionality** | Do GET and POST requests work correctly? |
| **React Structure** | Proper use of components, routing, and state |
| **API Integration** | Clean and correct fetch logic |
| **State Management** | Proper use of global and local state |
| **User Experience** | Clean, readable, usable UI |
| **GitHub Workflow** | Frequent commits with good messages |
| **Documentation** | README clearly explains setup |

## Final Notes

- json-server is **required**
- GET and POST are **both required**
- Do not hardcode data — use the API
- Focus on understanding **data flow in React**

> "This is where frontend development becomes real — your UI is now powered by live data."
