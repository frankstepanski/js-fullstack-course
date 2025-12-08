# Project 02: Multi-Page Website Using Your Own API

## Project Overview
In this project, you’ll build a **multi-page website** that connects to a JSON API you create yourself using **json-server** and a local **db.json** file.

Your website may have multiple pages, but **at least two pages must fetch and display API data** using JavaScript `fetch()`.

Your app should:
- run a local fake API with json-server
- read from `db.json`
- use `fetch()` to request data
- receive and parse JSON responses
- dynamically update the DOM
- style pages with CSS or Bootstrap

> 🎯 **Goal:** Learn how real websites request and display data from APIs instead of hard-coding content.

## Key Skills Covered

- JSON APIs
- json-server
- fetch & async JavaScript
- DOM manipulation
- responsive layout
- multi-page architecture
- REST conventions (GET + optional POST)
- Git & GitHub

## Workflow Requirements

These relate to planning and workflow—not just code.

### 1️⃣ User Stories
Write at least **three user stories** describing what users want to do with your site.

**Example:**  
> As a user, I want to view menu items so I can decide what to order.

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
2. Clone it locally  
3. Install json-server globally  
   `npm install -g json-server`
4. Create a `db.json`
5. Start json-server  
   `json-server --watch db.json`
6. Create multiple HTML pages
7. At least **two different pages** must fetch and display data

## Technical Requirements

Your website must include:

| # | Requirement | Description |
|---|-------------|-------------|
| 1 | **Multi-page site** | Must include multiple HTML pages linked together. |
| 2 | **Two API pages** | At least two **different** pages must GET API data. |
| 3 | **db.json storage** | All dynamic data must come from db.json. |
| 4 | **DOM updates** | Use textContent, innerHTML, appendChild, etc. |
| 5 | **Responsive layout** | Use CSS Flexbox/Grid for layout. |
| 6 | **GitHub repository** | Full project must be pushed to GitHub. |
| 7 | **Commit history** | At least 15 commits with descriptive messages. |

---

### Optional Technical Features

| # | Optional Requirement | Description |
|---|----------------------|-------------|
| 8 | **POST request** | Submit a review, add an item, or send user input to db.json. |
| 9 | **Bootstrap** | Use layout or components; optional bonus. |
| 10 | **Local images** | Store images inside project folders. |

---

## Required JSON Data

`db.json` must contain at least one array of objects—such as:

- `menu`
- `products`
- `cards`
- `abilities`
- `reviews`

Each API-driven page should display data from at least one of these arrays.

## Deliverables

Your submission must include:

- 🧠 User Stories (minimum 3)
- 🧾 Wireframes for at least two API pages
- 💻 Source Code in GitHub
- 📘 README.md including:
  - name
  - project overview
  - how to run json-server
  - technologies used
  - ideas for future improvements
- 🧩 Commit history (15+)
- 🌐 Hosted website (GitHub Pages front-end)

> Note: Your API only runs locally—GitHub Pages only hosts the front-end.

## Submission Instructions

Submit a **single document** containing:
- GitHub repository link
- GitHub Pages link

Upload under Project Submission.

## Project Grading Criteria

| Category | Description |
|-----------|-------------|
| **Functionality** | Do two pages load API data correctly? |
| **Responsiveness** | Does the layout adapt to mobile? |
| **Creativity & UX** | Clean, readable, user-friendly design |
| **GitHub Workflow** | Frequent commits with meaningful messages |
| **Documentation** | README explains setup & usage |
| **API Integration** | Proper json-server + fetch usage |

---

## Tools and Resources

- json-server docs
- GitHub Pages
- Google Fonts
- Draw.io
- W3C HTML Validator
- JSON Formatter

## Final Notes

- API must come from json-server
- Two pages must GET data
- One optional POST
- All dynamic data must come from db.json
- Don’t hard-code repeated lists

> “This is your first full-stack style project — a real API talking to your front-end, just like professional applications.”
