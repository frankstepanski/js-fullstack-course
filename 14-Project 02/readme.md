# Project 02: Multi-Page Website Using an API 

## Project Overview
In this project, you'll build a **multi-page website** that connects to an API and displays real data using JavaScript.

🔹 **Recommended approach:**  
Use json-server with a local `db.json` file to create your own API during local development.

🔹 **Alternative option:**  
If you find an appropriate third-party API, you may use it instead of json-server for this project.
A POST request is **optional**.

> ⚠️ **Important:** While a third-party API is allowed in **Project 02**, **json-server will be required in Project 03**, so using it now is strongly recommended to prepare you for what's next.

Your website may have multiple pages, but **at least two pages must fetch and display API data** using JavaScript `fetch()`.

This project is focused on **local development only**. You will **not deploy this project** to GitHub Pages or any hosting platform.

Your app should:
- fetch data from an API (json-server **recommended**)
- use `fetch()` to request data
- receive and parse JSON responses
- dynamically update the DOM
- style pages with CSS or Bootstrap
- run locally on your machine

> 🎯 **Goal:** Learn how real websites request and display data from APIs instead of hard-coding content, while understanding how frontend and backend pieces communicate.

## Key Skills Covered
- JSON APIs  
- json-server (recommended)  
- REST conventions (GET + optional POST)  
- fetch & async JavaScript  
- DOM manipulation  
- responsive layout  
- multi-page architecture  
- Git & GitHub  

## Workflow Requirements

### 1️⃣ User Stories
Write at least **three user stories** describing what users want to do with your site.

**Example:**  
As a user, I want to view menu items so I can decide what to order.

---

### 2️⃣ Wireframes
Create wireframes for **at least two pages** that use API data.

Wireframes should show:
- sections that display dynamic data
- layout structure
- buttons or actions
- navigation between pages

Wireframes may be hand-drawn or digital.

## Development Steps

Before coding:

1. Create a GitHub repository  
2. Create a local git repository  
3. Add the remote to the GitHub repository  

### If using **json-server (recommended)**:
4. Install json-server  
   ```bash
   npm install json-server
   ```
5. Create a `db.json` file  
6. Start json-server  
   ```bash
   json-server --watch db.json
   ```

### If using a **third-party API**:
- Ensure the API supports **GET requests**
- Keep authentication simple (or none)
- API must return usable JSON data

7. Create multiple HTML pages  
8. At least **two different pages** must fetch and display API data  
9. Commit your work frequently and push to GitHub  

> 🚫 **Do NOT deploy this project.**  
> This project is designed to run locally only.

## Technical Requirements

| # | Requirement | Description |
|---|-------------|-------------|
| 1 | **Multi-page site** | Must include multiple HTML pages linked together. |
| 2 | **Two API pages** | At least two **different** pages must GET API data. |
| 3 | **API source** | Use **json-server (recommended)** or an approved third-party API. |
| 4 | **DOM updates** | Use `textContent`, `innerHTML`, `appendChild`, etc. |
| 5 | **Responsive layout** | Use CSS Flexbox/Grid for layout. |
| 6 | **GitHub repository** | Full project must be pushed to GitHub. |
| 7 | **Commit history** | At least 15 commits with descriptive messages. |

---

### Optional Technical Features

| # | Optional Requirement | Description |
|---|----------------------|-------------|
| 8 | **POST request** | Submit a review, add an item, or send user input to an API. |
| 9 | **Bootstrap** | Use Bootstrap for layout or components. |
| 10 | **Local images** | Store images inside project folders. |
| 11 | **Vite** | Use Vite as your local dev server and build tool. |
| 12 | **Tailwind CSS** | Use Tailwind CSS for styling instead of plain CSS or Bootstrap. |

> 💡 **Vite + Tailwind:** If you're comfortable with Vite and Tailwind from class, you're welcome to use them here. Note that Vite requires a build step to use Tailwind properly — if your config gives you trouble, plain CSS or Bootstrap are perfectly fine for this project. These tools will be revisited in future projects.

## Required JSON Data (If Using json-server)

If you use **json-server**, your `db.json` must contain at least one array of objects—such as:
- `menu`
- `products`
- `cards`
- `abilities`
- `reviews`

Each API-driven page should display data from at least one array.

> **Note:** Using json-server in this project will make **Project 03 significantly easier**, where json-server will be **required**.

## Submission Instructions

Submit a **single document** containing:
- GitHub repository link

Upload under Project Submission.

## Project Grading Criteria

| Category | Description |
|-----------|-------------|
| **Functionality** | Do two pages load API data correctly? |
| **Responsiveness** | Does the layout adapt to mobile? |
| **Creativity & UX** | Clean, readable, user-friendly design |
| **GitHub Workflow** | Frequent commits with meaningful messages |
| **Documentation** | README explains setup clearly |
| **API Integration** | Proper `fetch()` usage and data handling |

## Tools and Resources
- json-server docs  
- Google Fonts  
- Draw.io  
- W3C HTML Validator  
- JSON Formatter  
- [Vite docs](https://vitejs.dev/) *(optional)*  
- [Tailwind CSS docs](https://tailwindcss.com/) *(optional)*  

## Final Notes
- **json-server is strongly recommended**
- GET requests are required
- POST requests are optional
- Project 03 **will require json-server**
- Don't hard-code repeated lists
- This project is about **learning API integration**
- Vite and Tailwind are **optional** — use them if you're comfortable, but don't let tooling setup get in the way of the core assignment

> "This is your first real step toward full-stack development — understanding how data flows from an API into a user interface."
