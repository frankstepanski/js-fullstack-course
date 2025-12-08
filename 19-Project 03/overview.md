# 💻 Project 03: React To-Do App

### 🧭 Project Overview

In this project, you’ll build your first **multi-view React application** — a fully functional **To-Do List Manager** with a contact page.  
This app will allow users to create, update, and delete to-do items and manage simple contact form data, all within a **single-page React application**.

You’ll use:
- **React** for building components and managing state  
- **React Router** for navigation between pages  
- (Optional) **Redux** for state management as your app grows  

🎯 **Goal:**  
To demonstrate your understanding of **components**, **state**, **events**, **React Router**, and **controlled forms** — while practicing the workflow of building, organizing, and deploying a real React project.

---

## 🧱 Key Skills Covered
- **React Components** — structure your UI with reusable elements  
- **State & Events** — manage dynamic data and user interaction  
- **React Router** — create multiple views in a single-page app  
- **Controlled Forms** — handle form data with React state  
- **Git & GitHub** — use version control effectively  
- **Optional:** **Redux** — understand global state management  

---

## ⚙️ Workflow Requirements

### 📝 Planning Phase (Before Coding)

#### 1️⃣ User Stories
Write at least **three user stories** that describe how users will interact with your app.

**Example:**
> As a user, I want to add and delete tasks so I can manage my daily to-do list.

#### 2️⃣ Wireframes
Create wireframes for **each view** of your app — `/todos` and `/contact`.  
Each wireframe should include:
- Navigation bar  
- To-Do list layout  
- Contact form layout  

You can draw these on paper or use [draw.io](https://app.diagrams.net/).

#### 3️⃣ State Tree
Sketch out your app’s **state structure** before coding.  
Example:
```js
{
  todos: [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: true }
  ],
  filter: "all"
}
```

#### 4️⃣ Component List
Write out the components you plan to build and categorize them as:
- **Container components** (handle logic/state)
- **Presentational components** (display UI)

Example:
- `TodoApp` (container)
- `TodoList`, `TodoItem`, `TodoForm` (presentational)
- `ContactForm` (controlled form)

---

### 💻 Development Phase

1. **Create a new GitHub repository** (before you start coding)  
2. **Clone** it to your local machine  
3. Use **Vite** or **Create React App** to scaffold your React project  
4. Install dependencies (`npm install react-router-dom`)  
5. Make **frequent commits** with clear messages such as:
   - `"add TodoList component"`
   - `"implement filtering logic"`
   - `"add Contact form controlled component"`

> 💡 *Each commit should represent one logical change — think “save points” in your progress.*

---

## 🧩 Technical Requirements

| # | Requirement | Description |
|---|--------------|-------------|
| 1 | **React App** | Built using Create React App or Vite. |
| 2 | **Routes** | Must include at least two routes: `/todos` and `/contact`. |
| 3 | **Todo View** | Displays the todo list and form for adding new tasks. |
| 4 | **Add Todos** | Form input allows new todos to be added dynamically. |
| 5 | **Update Todos** | Users can mark todos as complete/incomplete (e.g., strike-through). |
| 6 | **Delete Todos** | Each todo can be removed individually. |
| 7 | **Filter Todos** | Buttons or links allow filtering by “All,” “Completed,” or “Active.” |
| 8 | **Contact View** | Controlled form with first name, last name, email, and comment fields. |
| 9 | **Custom CSS** | Use at least 10 custom CSS rules across components. |
| 10 | **Navigation Bar** | Persistent horizontal navbar for switching between `/todos` and `/contact`. |
| 11 | **Side-by-Side Layout** | At least one section should display content side by side (e.g., todo form and list). |
| 12 | **State Updates** | All changes (add, delete, toggle) should update React’s internal state immediately. |
| 13 | **Optional Bonus** | Integrate Redux for global state management. |

---

## 📱 Responsive Design Requirements

- App should adjust for **desktop and mobile**.  
- The layout should remain readable and accessible at smaller screen widths.  
- Consider stacking the navbar or side-by-side elements vertically on small screens.

---

## 📦 Deliverables

1. 🧠 **User Stories** (at least 3)  
2. 🧾 **Wireframes** — one for each app view  
3. 🧩 **State Tree**  
4. 🧱 **Component List** (container + presentational)  
5. 💻 **Source Code** — hosted in your GitHub repo  
6. 📘 **README.md** file that includes:
   - Your **name**
   - **Project description** and goals
   - **How to use the app**
   - **Technologies used** (React, CSS, React Router)
   - **Ideas for future improvement** (at least 3)
7. 🧩 **GitHub Commit History**
   - Minimum of **15 commits**
   - Descriptive commit messages
8. 🌐 **Hosting**
   - Use **GitHub Pages** for deployment (via [gh-pages](https://www.npmjs.com/package/gh-pages))

> Submit your GitHub repo link and live hosting link in **one Word document** under the **Project Submission** section.

---

## 🧮 Project Grading Criteria

| Category | Description |
|-----------|--------------|
| **Functionality** | App performs all CRUD operations correctly. |
| **Robustness** | App handles input and updates state without errors. |
| **Creativity & UX** | Interface is appealing and user-friendly. |
| **Code Quality** | Clean, organized, and readable React code. |
| **GitHub Structure** | Consistent commits, logical folder organization. |
| **Documentation** | Clear README with instructions and reflection. |

---

## 🧰 Tools and Resources

- [React Docs](https://react.dev/)  
- [React Router Docs](https://reactrouter.com/en/main)  
- [Redux Toolkit](https://redux-toolkit.js.org/) (optional)  
- [Vite Guide](https://vitejs.dev/guide/)  
- [Draw.io Wireframes](https://app.diagrams.net/)  
- [GitHub Pages Deployment](https://pages.github.com/)  
- [W3C HTML Validator](https://validator.w3.org/)

---

## 🏁 Final Notes

- This project helps you **apply everything learned so far** — components, state, props, effects, and routing.  
- Keep your design simple and your code modular.  
- You’ll be graded not just on functionality but also **workflow and documentation**.  
- Don’t rush — plan your app’s structure before coding.

> 💬 “This project marks your step from static websites to dynamic web applications — built, managed, and deployed like a professional React developer.”  
