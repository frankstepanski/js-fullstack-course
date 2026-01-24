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
- The same concept of a **mock API** using json-server
- A **single-page application (SPA)** with multiple views

> 🎯 **Goal:** Build a React application with multiple routes that can **read and create data from an API**, using clean components, state management, and professional UI structure.

---

## Key Skills Covered
- React components and props
- State management with `useState`
- Controlled forms
- React Router (multi-view SPA)
- Fetching data from an API (GET + POST required)
- Component organization and reuse
- Git & GitHub workflow

---

## How This Builds on Project 02

| Project 02 | Project 03 |
|---|---|
| Multi-page HTML site | Multi-view SPA with React Router |
| DOM manipulation | React rendering + components |
| Manual state | React state (`useState`) |
| GET optional POST | GET + POST required |
| Basic styling | Component-based styling |

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
- form areas (if applicable)
- buttons or actions

Wireframes may be hand-drawn or digital.

---

### 3️⃣ Component Planning (Recommended)
Before coding, list your planned components. You need **12+ total components**.

Examples:
- Page components (routes)
- Layout components (Nav, Footer)
- UI components (Card, Button, Input)
- Feature components (ItemList, ItemDetails, CreateItemForm)

---

## Development Steps

1. Create a GitHub repository  
2. Create a local git repository and connect it to GitHub  
3. Create a React app using Vite  
4. Install dependencies (React Router, json-server)  
5. Create a `db.json` file  
6. Start your API with json-server  
7. Build your React routes/views  
8. Implement API integration (GET + POST)  
9. Style your app and make it responsive  
10. Deploy your app using Vercel  

---

## Technical Requirements

| # | Requirement | Description |
|---|---|---|
| 1 | React app (Vite) | Project must be created with Vite |
| 2 | React Router | Navigation without page reloads |
| 3 | 3+ routes | Example: `/`, `/items`, `/create` |
| 4 | 12+ components | Must be unique components |
| 5 | json-server API | Use `db.json` as your data source |
| 6 | GET request | Load and display API data |
| 7 | POST request | Create new data via a form |
| 8 | useState | Local state management |
| 9 | Controlled forms | Inputs use `value` + `onChange` |
| 10 | Responsive layout | Mobile + desktop friendly |
| 11 | Clean structure | Organized folders and files |
| 12 | GitHub workflow | Meaningful commit history |

---

### Optional Technical Features (Bonus)

| # | Feature | Description |
|---|---|---|
| 13 | PUT / PATCH | Edit existing items |
| 14 | DELETE | Remove items from the API |
| 15 | useReducer / Context | Advanced state management |
| 16 | Loading & error states | Handle fetch states gracefully |
| 17 | Search / filter | Improve list usability |
| 18 | UI component library | You may use a **lightweight UI or CSS utility library** such as **React Bootstrap**, **Bulma**, or **Tailwind CSS** to help with layout, spacing, and **responsiveness**. These tools should **support** your components—not replace them. You should still demonstrate understanding of your own component structure, styling decisions, and responsive behavior. |

---

## Required API Data

Your `db.json` must include at least **one array of objects**, such as:
- events
- recipes
- jobs
- habits
- notes
- inventory
- reviews

Example structure:

```json
{
  "id": 1,
  "title": "Example Item",
  "description": "Some details here"
}
```

> Note: The API runs locally with json-server. Your deployed site hosts the frontend only.

## Deliverables

- User Stories (minimum 3)
- Wireframes (minimum 2 routes/views)
- GitHub repository link
- README.md including:
  - project name and overview
  - how to run the React app
  - how to run json-server
  - technologies used
  - future improvements
- Commit history (15+ commits)
- Deployed site link (Vercel)

## Final Notes
- Keep your scope small and finish a working MVP
- Avoid hard-coding repeated lists — if it’s data, it should come from the API
- Focus on routing, state, components, and clear data flow
- Treat this like your first professional project
