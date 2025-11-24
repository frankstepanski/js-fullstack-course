# 💻 Project 02: Giphy Search Engine 

### 🧭 Project Overview

In this project, you’ll bring your JavaScript skills to life by creating a **searchable web app** that connects to a live API — specifically, the **Giphy API**, or another public API of your choice.  

Your app will:
- Allow users to **enter and submit a search keyword**
- Use JavaScript to make a **fetch request** to the API
- **Receive and parse** the JSON response
- **Display images dynamically** on the page
- Use a **custom CSS grid layout** for visuals
- Be **responsive**, ensuring a smooth experience on both desktop and mobile devices  

🎯 **Goal:**  
To integrate **HTML**, **CSS**, and **JavaScript** in a real-world setting — while learning how to read API documentation, handle asynchronous data, and build interactive front-end functionality.


## 🧱 Key Skills Covered
- **HTML/CSS** — structure and style your page  
- **JavaScript** — fetch and manipulate live API data  
- **Responsive Design** — mobile-first and desktop layouts  
- **Git & GitHub** — version control and collaboration  
- **APIs & JSON** — asynchronous programming and data handling  

## ⚙️ Workflow Requirements

### 📝 Planning Phase (Before Coding)

#### 1️⃣ User Stories
Create at least **three user stories** describing what a user can do and why.

**Example:**
> As a user, I want to search for GIFs by keyword so I can find funny images to share with friends.

#### 2️⃣ Wireframes
Create **wireframes for both desktop and mobile views**.  
Your wireframes should include:
- Input/search form  
- Search button  
- Image grid or results area  
- Navigation bar or menu (even if links are placeholders)  

Wireframes can be hand-drawn or created digitally using a free tool like [draw.io](https://app.diagrams.net/).

---

### 💻 Development Phase

1. **Create a GitHub repository** on [GitHub.com](https://github.com)  
2. **Clone** the repository to your local machine before coding  
3. **Obtain an API key** from [Giphy Developers](https://developers.giphy.com/)  
4. Review the **Giphy API documentation**, especially the **Search Endpoint**  
5. Make frequent **Git commits** with descriptive messages, such as:
   - `"add search form and input handler"`
   - `"fetch GIFs from API and display on page"`
   - `"update CSS grid for responsive layout"`

> 💡 *Tip: Your commit history should tell the story of how your project evolved.*

---

## 🧩 Technical Requirements

| # | Requirement | Description |
|---|--------------|-------------|
| 1 | **Single Page App** | Only one `.html` page, but it should have multiple nav links (even if they don’t go anywhere). |
| 2 | **Input & Search Button** | Include an input field (type="search") and a submit button. |
| 3 | **API Request** | When the user submits a search, use **fetch()** to query the Giphy API with the search term. |
| 4 | **Dynamic Results** | Iterate over the response data and append each GIF image to the screen dynamically. |
| 5 | **File Structure** | Project should include `index.html`, `style.css` (and optionally `style.scss`), and `main.js`. |
| 6 | **CSS Grid** | Use CSS Flexbox or Grid to display images in a responsive layout. |
| 7 | **Google Font** | Use a new Google Font for your site title — something you haven’t used before. |
| 8 | **Flex Layouts** | Use Flexbox to align items in the header and input areas side by side. |
| 9 | **Responsive Design** | Include a media query for mobile (320px and below). Images and navigation should stack vertically. |
| 10 | **Optional (Extra Credit)** | Use a CSS preprocessor like **SASS** to write your styles (`style.scss` → `style.css`). |

---

## 📱 Responsive Design Requirements

### Desktop View
- The site’s name and navigation appear aligned to opposite sides of the header.  
- The search field and submit button appear side by side.  
- The GIF results display in multiple rows and columns using your custom grid classes.

### Mobile View (320px and below)
- The site title and navigation stack vertically.  
- Navigation links stack vertically.  
- Images appear in a single column layout.  

## 🧮 Example File Structure

```
/project-folder
│
├── index.html
├── /css
│   ├── style.css
│   └── style.scss  (optional)
├── /js
│   └── main.js
└── /images
```

## 📦 Deliverables

1. 🧠 **User Stories** (minimum 3)  
2. 🧾 **Wireframes** — one for each view (desktop & mobile)  
3. 💻 **Source Code** — hosted in a public GitHub repository  
4. 📘 **README.md** file (in the root folder) including:
   - Your **name**
   - **Overview/description** of the project
   - **How to use** it (what it does, how it works)
   - **Technologies used** (HTML, CSS, JS, API)
   - **Ideas for future improvement** (minimum of 3 ideas)
5. 🧩 **GitHub Commit History**
   - At least **15 commits**
   - Clear, descriptive messages
6. 🌐 **Hosted Website**
   - Use **GitHub Pages** to deploy your site  

> Submit your GitHub repo link and live hosting link in **one Word document**, then upload it under the **Project Submission** section of your course portal.

## 🧮 Project Grading Criteria

| Category | Description |
|-----------|--------------|
| **Functionality** | Does the app fetch data and display results correctly? |
| **Responsiveness** | Does it adapt to both desktop and mobile? |
| **Creativity & UX** | Is the UI appealing and intuitive? |
| **Code Quality** | Is your HTML, CSS, and JS clean and readable? |
| **GitHub Usage** | Frequent, descriptive commits? Clear repo structure? |
| **Documentation** | Does your README explain the project well? |

## 🧰 Tools and Resources

- [Giphy API Docs](https://developers.giphy.com/docs/api/)  
- [GitHub Pages Guide](https://pages.github.com/)  
- [Draw.io Wireframes](https://app.diagrams.net/)  
- [W3C HTML Validator](https://validator.w3.org/)  
- [Google Fonts](https://fonts.google.com/)  
- [JSON Formatter (Chrome Extension)](https://chrome.google.com/webstore/detail/json-formatter/)  

## 🏁 Final Notes

- You can use **Giphy** or another API (like The Cat API, Pokémon API, or OpenWeather).  
- The **functionality** must be comparable to the Giphy example (search, display results, responsive layout).  
- You will be evaluated on both **workflow** (planning, commits, documentation) and **technical implementation** (functionality, responsiveness, API use).  
- Remember: this project isn’t just about building a page — it’s about demonstrating that you can **research, problem-solve, and integrate real-world APIs** into your work.

> 💬 “This project shows that you’re not just coding — you’re thinking like a developer. Learn to read documentation, debug, and bring ideas to life with real data!”
