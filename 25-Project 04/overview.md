# 💻 Project 04: Full-Stack Forum App (3-Tier Architecture)

### 🧭 Project Overview

This capstone project brings together **everything you’ve learned throughout the bootcamp** — from frontend development to backend APIs, databases, and authentication.

You’ll build a **full-stack forum-style application** that allows users to **register, log in, ask questions, and post answers**.  
The project will follow the principles of **3-Tier Architecture** — separating your app into **data**, **application**, and **presentation** layers.

🎯 **Goal:**  
To demonstrate your ability to design, build, and deploy a full-stack web application with real-world structure and best practices in security, architecture, and user experience.

---

## 🧱 Key Skills Covered
- **Node.js + Express** — backend API development  
- **MongoDB or PostgreSQL** — database design and CRUD operations  
- **React** — building the client-side SPA  
- **JWT Authentication** — secure login and user sessions  
- **REST API Design** — connecting the frontend and backend via JSON  
- **3-Tier Architecture** — clear separation between Data, Application, and Presentation layers  
- **Version Control & Deployment** — managing your codebase and hosting your project  

---

## ⚙️ Architecture Overview

Your app should be structured in **three layers**:

| Tier | Description | Technologies |
|------|--------------|---------------|
| **Data Layer** | Stores all persistent information (users, questions, answers). | PostgreSQL, or MongoDB |
| **Application Layer** | Handles all business logic and API endpoints. | Node.js + Express |
| **Presentation Layer** | Frontend user interface that communicates via JSON. | React, React Router, Redux (optional) |

---

## 📝 Project Theme

Instead of creating a general “ask anything” forum, focus on a **specific theme** for your application.

**Examples:**
- 🐾 **PetLand** — users can ask and answer questions about dogs, cats, and rabbits  
- 💻 **Frontend Forum** — discussions about JavaScript, React, and CSS  
- 🎮 **GameZone** — topics on game development, design, and engines  

Choose a theme that interests you — this will make your project more creative and engaging.

---

## 💡 Core Features

### 🔐 Authentication
- Registration form with input validation and error messages
- Login screen that checks credentials via the API
- Error messages for invalid login attempts
- Successful login redirects to the dashboard

### 🧑‍💻 Forum Functionality
- Logged-in users can:
  - View topics and existing questions
  - Post a new question under a topic
  - Answer existing questions
  - Edit or delete their own posts
- Each question and answer includes the author’s name and timestamp

### 🗄️ Database Layer
- Tables/collections for:
  - Users (with hashed passwords)
  - Questions
  - Answers
  - Topics (optional)
- Include a few sample records or an automatic seed script for demo purposes.

### 🧠 Business Logic (Node/Express API)
- RESTful API endpoints for CRUD operations:
  - `POST /api/register` — create a new user
  - `POST /api/login` — authenticate and return JWT
  - `GET /api/questions` — fetch all questions
  - `POST /api/questions` — create a new question
  - `POST /api/answers/:questionId` — add an answer
- Use **middleware** for authentication and validation

### 🖥️ Frontend (React)
- SPA with multiple views:
  - `/login`
  - `/register`
  - `/dashboard`
  - `/questions/:id`
- Use **React Router** for navigation  
- Display forum data using **fetch()** or **axios** to call your backend API  

---

## 🧩 Technical Requirements

| # | Requirement | Description |
|---|--------------|-------------|
| 1 | **3-Tier Structure** | Data (DB), Application (API), Presentation (UI) are clearly separated. |
| 2 | **User Registration** | Form validation, error handling, password hashing. |
| 3 | **Login & JWT Auth** | Secure token-based authentication with protected routes. |
| 4 | **Forum CRUD** | Users can create, read, update, and delete posts or replies. |
| 5 | **Database Connection** | Persistent storage using MongoDB or MySQL. |
| 6 | **REST API** | All communication between frontend and backend uses JSON. |
| 7 | **Error Handling** | Graceful error messages and HTTP status codes. |
| 8 | **Responsive Design** | Frontend adapts to mobile and desktop layouts. |
| 9 | **Security Best Practices** | Helmet, CORS, environment variables, and bcrypt for passwords. |
| 10 | **Deployment** | Deployed backend and frontend using a hosting service. |

---

## 🧮 Project Deliverables

1. **GitHub Repository** — includes all source code (frontend + backend)  
2. **Database Schema** — SQL or Mongo models with seed/example data  
3. **Hosted API & Frontend URLs** — working deployment links  
4. **Documentation File (Word or PDF)** that includes:
   - GitHub repo link  
   - Hosting link  
   - Installation instructions  
   - Login credentials for testing (demo user)  
5. **README.md** — with:
   - App overview  
   - Tech stack used  
   - Features summary  
   - Instructions for setup and running locally  
   - Ideas for future improvements  

---

## 🧾 Example Future Improvements
- Add search and filtering by topics or tags  
- Add profile pictures and user bios  
- Add upvote/downvote feature  
- Add pagination or infinite scrolling for large forums  
- Integrate real-time updates (Socket.io or WebSockets)  

---

## 🧰 Tools & Resources

- [Node.js Docs](https://nodejs.org/en/docs)  
- [Express Docs](https://expressjs.com/)  
- [MongoDB Docs](https://www.mongodb.com/docs/) or [PostgreSQL Docs](https://www.postgresql.org/docs/)  
- [React Docs](https://react.dev/)  
- [React Router Docs](https://reactrouter.com/)  
- [bcrypt npm package](https://www.npmjs.com/package/bcrypt)  
- [jsonwebtoken npm package](https://www.npmjs.com/package/jsonwebtoken)  
- [Helmet npm package](https://www.npmjs.com/package/helmet)  
- [CORS npm package](https://www.npmjs.com/package/cors)  

---

## 🧮 Project Grading Criteria

| Category | Description |
|-----------|-------------|
| **Functionality** | App performs registration, login, and forum CRUD correctly. |
| **Robustness** | Handles input and API calls without errors. |
| **Creativity & UX** | Interface is clear, organized, and user-friendly. |
| **Code Quality** | Clean, modular, and well-documented code. |
| **GitHub Structure** | Logical folder organization and meaningful commits. |
| **Documentation** | Clear setup instructions and description of the app. |

---

## 🏁 Final Notes

This project is your chance to demonstrate **professional-level full-stack development**.  
You’ll combine everything — databases, authentication, security, APIs, and UI — into a cohesive, working system.

Keep your code clean, validate your inputs, and design with a **real-world mindset**:  
> “If this were live for real users, would it be secure, fast, and easy to use?”
