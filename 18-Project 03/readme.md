# Project 03: Multi-View React CRUD Application

## Project Overview
In this project, you’ll rebuild (or re-imagine) your Project 02 app using React.

Project 02 was built with:
- HTML, CSS, vanilla JavaScript
- DOM manipulation
- `fetch()` requests to a `json-server` API

Project 03 replaces those ideas with:
- **React components** instead of manual DOM updates
- **React Router** instead of multiple HTML pages
- A **mock REST API** built with json-server
- A **single-page application (SPA)** with multiple views

Unlike Project 02, this project introduces a **split deployment model**:
- The **frontend React app** is deployed to **Vercel**
- The **backend API (json-server)** is deployed to a **separate cloud service**

> 🎯 **Goal:** Build and deploy a real-world-style application where the frontend and backend are hosted separately, communicating over HTTP just like production systems.

## Key Skills Covered
- React components and props
- State management with `useState`
- Controlled forms
- React Router (multi-view SPA)
- Fetching data from a remote API (GET + POST required)
- Environment variables
- Frontend / backend separation
- Git & GitHub workflow

## How This Builds on Project 02

| Project 02 | Project 03 |
|---|---|
| Local-only app | Deployed frontend + deployed API |
| Multi-page HTML | React SPA with routing |
| DOM manipulation | React rendering |
| Local json-server | Hosted API |
| No deployment | Real deployment workflow |

---

## Workflow Requirements

### 1️⃣ User Stories
Write at least **three user stories** describing how users interact with your app.

**Example:**  
As a user, I want to add a new event so I can keep track of upcoming plans.

---

### 2️⃣ Wireframes
Create wireframes for **at least two routes/views**.

Wireframes should show:
- navigation between views
- sections that display dynamic data
- form areas
- buttons or actions

---

### 3️⃣ Component Planning (Recommended)
Before coding, list your planned components. You need **12+ total components**.

Examples:
- Page components (routes)
- Layout components (Nav, Footer)
- UI components (Card, Button, Input)
- Feature components (ItemList, ItemDetails, CreateItemForm)

## Development Steps

1. Create a GitHub repository  
2. Create a local git repository and connect it to GitHub  
3. Create a React app using Vite  
4. Install dependencies (React Router, json-server)  
5. Create a `db.json` file  
6. Build and test your API locally with json-server  
7. Build your React routes/views  
8. Implement API integration (GET + POST)  
9. Replace localhost API URLs with environment variables  
10. Deploy backend API  
11. Deploy frontend app to Vercel  


## Deployment Architecture

```
[ Browser ]
     |
     v
[ Vercel (React Frontend) ]
     |
     v
[ Hosted json-server API ]
```


## Backend API Deployment (json-server)

You must deploy your json-server API to **one** of the following services.

### Option A: Render (Recommended)

**Steps:**

1. Create a new GitHub repo (or folder) for your API
2. Add:
   - `db.json`
   - `package.json`
   - `server.js`
3. Install dependencies:
   ```bash
   npm install json-server
   ```
4. Create `server.js`:
   ```js
   const jsonServer = require("json-server");
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
5. Push to GitHub
6. On Render:
   - New → Web Service
   - Connect repo
   - Build command: `npm install`
   - Start command: `node server.js`
7. Copy your live API URL

---

### Option B: Railway

**Steps:**

1. Push your json-server project to GitHub
2. Create a new Railway project
3. Connect your GitHub repo
4. Set start command:
   ```bash
   node server.js
   ```
5. Railway will expose a public API URL

---

### Option C: Fly.io (Advanced / Optional)

**Steps (high-level):**
1. Install Fly CLI
2. Run `fly launch`
3. Configure port exposure
4. Deploy with `fly deploy`

⚠️ Fly.io is optional and recommended only for advanced students.


## Frontend Deployment (Vercel)

**Steps:**

1. Push your React app to GitHub
2. Create an environment variable:
   ```bash
   VITE_API_URL=https://your-api-url.com
   ```
3. Update API calls:
   ```js
   fetch(`${import.meta.env.VITE_API_URL}/items`)
   ```
4. Commit changes
5. On Vercel:
   - New Project → Import GitHub repo
   - Framework: Vite
   - Add environment variable in Vercel dashboard
6. Deploy


## Technical Requirements

| # | Requirement | Description |
|---|---|---|
| 1 | React app (Vite) | Project must be created with Vite |
| 2 | React Router | Navigation without page reloads |
| 3 | 3+ routes | Example: `/`, `/items`, `/create` |
| 4 | 12+ components | Must be unique components |
| 5 | Hosted API | json-server deployed remotely |
| 6 | GET request | Load and display API data |
| 7 | POST request | Create new data via a form |
| 8 | useState | Local state management |
| 9 | Controlled forms | Inputs use `value` + `onChange` |
| 10 | Environment vars | No hard-coded API URLs |
| 11 | Responsive layout | Mobile + desktop friendly |
| 12 | GitHub workflow | Meaningful commit history |

---

### Optional Technical Features (Bonus)

| # | Feature | Description |
|---|---|---|
| 13 | PUT / PATCH | Edit existing items |
| 14 | DELETE | Remove items |
| 15 | useReducer / Context | Advanced state |
| 16 | Loading & error states | UX improvements |
| 17 | Search / filter | Better usability |
| 18 | UI library | Bootstrap, Bulma, or Tailwind to assist with layout and responsiveness (must support—not replace—your components) |

## Deliverables

- User Stories
- Wireframes
- GitHub repo(s) for frontend and API
- README.md with deployment instructions
- Commit history (15+ commits)
- Live frontend URL (Vercel)
- Live API URL

## How This Prepares You for the Final Project

This deployment setup is **intentional** and mirrors what you will do for your **final project**.

For the final project:
- You will **replace json-server**
- You will build your **own backend API**
- You will connect that API to a **real database**
- You will deploy the frontend and backend **separately**, just like in this project

Project 03 removes one major variable by **giving you the API logic for free** (via json-server), while still requiring you to:
- deploy a backend service
- manage environment variables
- connect a deployed frontend to a deployed API
- debug real deployment issues

Doing this now means the final project won’t feel like a brand-new process — you’ll already be comfortable with the extra steps and tooling.

## Final Notes
- This project mirrors **real-world frontend/backend separation**
- API must be reachable from the deployed frontend
- Use environment variables for configuration
- Keep scope reasonable and prioritize a working MVP
- This is your first **true deployed full-stack-style app**