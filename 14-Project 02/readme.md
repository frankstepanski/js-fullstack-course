# Project 02: Multi-Page Website Using Your Own API (Local Development Only)

## Project Overview
In this project, you’ll build a **multi-page website** that connects to a JSON API you create yourself using **json-server** and a local **db.json** file.

Your website may have multiple pages, but **at least two pages must fetch and display API data** using JavaScript `fetch()`.

This project is focused on **local development only**. You will **not deploy this project** to GitHub Pages or any hosting platform.

Your app should:
- run a local fake API with json-server
- read from `db.json`
- use `fetch()` to request data
- receive and parse JSON responses
- dynamically update the DOM
- style pages with CSS or Bootstrap

> 🎯 **Goal:** Learn how real websites request and display data from APIs instead of hard-coding content, while understanding the difference between local development and deployment.

---

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
4. Install json-server  
   `npm install json-server`  
5. Create a `db.json` file (this is your API database)  
6. Start json-server  
   `json-server --watch db.json`  
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
| 3 | **db.json storage** | All dynamic data must come from db.json. |
| 4 | **DOM updates** | Use `textContent`, `innerHTML`, `appendChild`, etc. |
| 5 | **Responsive layout** | Use CSS Flexbox/Grid for layout. |
| 6 | **GitHub repository** | Full project must be pushed to GitHub. |
| 7 | **Commit history** | At least 15 commits with descriptive messages. |

---

### Optional Technical Features

| # | Optional Requirement | Description |
|---|----------------------|-------------|
| 8 | **POST request** | Submit a review, add an item, or send user input to db.json. |
| 9 | **Bootstrap** | Use Bootstrap for layout or components (optional bonus). |
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

> **Important:** Your API runs locally with json-server. This project is not deployed, so the API and frontend are expected to work together only in your local environment.

## Submission Instructions

Submit a **single document** containing:
- GitHub repository link

Upload under Project Submission.

---

## Project Grading Criteria

| Category | Description |
|-----------|-------------|
| **Functionality** | Do two pages load API data correctly locally? |
| **Responsiveness** | Does the layout adapt to mobile? |
| **Creativity & UX** | Clean, readable, user-friendly design |
| **GitHub Workflow** | Frequent commits with meaningful messages |
| **Documentation** | README explains local setup clearly |
| **API Integration** | Proper json-server + fetch usage |

## Tools and Resources
- json-server docs  
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
- This project is **about learning API integration**, not deployment

> “This is your first full-stack-style project — a real API talking to your front-end, just like professional applications — but running locally.”
