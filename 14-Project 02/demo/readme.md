# Moonlight Pizza Co. — Dynamic Web App (Project 2)

This project builds on the **original Moonlight Pizza Co. website**, which focused on learning CSS layout, responsive design, and structuring frontend files in a scalable way.

In this **second project**, students take their frontend skills further by simulating a full-stack application. All page content is now dynamic, powered by data fetched from a locally hosted REST API using `json-server`.


## What’s New in This Version?

Unlike Project 1, which primarily focused on:

- UX design and planning
- File structure and organization
- Responsive layout using CSS Flexbox and Grid
- Mobile-first CSS

This version now introduces:

- Fetching external data from a REST API
- Using `fetch()` for GET/POST/PATCH/DELETE
- Dynamically updating the DOM
- A better separation of concerns between content, logic, and layout

The data is pulled from a local REST API using [`json-server`](https://github.com/typicode/json-server).


## 📁 Project File Structure

```
moonlight-pizza/
├── index.html                 
├── pages/                     
│   ├── menu.html
│   ├── specials.html
│   ├── order.html
│   ├── contact.html
├── css/                       
│   ├── base.css
│   ├── layout.css
│   ├── menu.css
│   ├── specials.css
├── js/                        
│   ├── menu.js
│   ├── specials.js
│   └── order.js
├── db.json                    
```


## File Linking Paths Explained

### ✅ Relative Paths (Recommended)

These depend on the location of the current file.

#### `css/base.css` or `js/about.js`
- ✅ These are **relative paths** (equivalent to `./css/base.css`)
- They start from the folder the current HTML file is in.
- This shorthand works fine and is commonly used.

#### `./folder/file`
- Means: **"Start in the current folder"**
- Use when the resource is in a subfolder of the current file.
- ✅ Example:
  ```html
  <link href="./css/base.css" rel="stylesheet" />
  ```

#### `../folder/file`
- Means: **"Go up one level, then into folder"**
- Use when the resource is **one folder above** your current file.
- ✅ Example from `pages/menu.html`:
  ```html
  <script src="../js/menu.js"></script>
  ```

---

### 🚫 Absolute Paths (`/css/style.css`)

These start from the root of the domain.

#### `/folder/file`
- Means: **"Start from the root of the server"**
- ❌ Will break in:
  - Local file viewing
  - GitHub Pages if the site is in a subfolder (like `/demo/`)
- ✅ Safe only when:
  - You have a custom domain and root hosting
  - You are using a frontend framework (React/Vite/Next.js)

- ⚠️ Example:
  ```html
  <link href="/css/base.css" rel="stylesheet" />
  ```

## API + Frontend Simulation

To simulate a full‑stack application, this project runs **two servers at the same time**:

| Server Type     | Purpose                                | How to Start                                                |
|-----------------|----------------------------------------|--------------------------------------------------------------|
| **JSON Server** | Simulated REST API backend             | `"server": "json-server --watch db.json --port 3000"`       |
| **Live Server** | Serves HTML/CSS/JS frontend files      | Run using the **Live Server** extension in VS Code          |

The application uses **JSON Server** as a fake backend so each page can request data—just like a real web app.  
Each page retrieves **different API routes**, depending on what content it needs.


### API Endpoints Used

These are the routes available from the JSON Server:

```
http://localhost:3000/pizzas
http://localhost:3000/specials
http://localhost:3000/contactCards
http://localhost:3000/cart
http://localhost:3000/orders
http://localhost:3000/testimonials
```

Different HTML pages fetch different kinds of data:

#### **🏠 About Page (`about.html`)**
Uses:
- `GET /testimonials` → Show randomly rotating customer reviews  

#### **🍕 Menu Page (`menu.html`)**
Uses:
- `GET /pizzas` → Load the full menu list  

#### **⭐ Specials Page (`specials.html`)**
Uses:
- `GET /specials` → Retrieve all current specials  

#### **🛒 Order Online Page (`order.html`)**
Uses:
- `GET /pizzas` → So users can choose items to order  
- `POST /orders` → When submitting the order  
- `PUT /orders/:id` and `DELETE /orders/:id` → To update or delete a pizza order in their cart  

#### **📞 Contact Page (`contact.html`)**
Uses:
- `GET /contactCards` → Shows address, phone, email, quick info cards  

Each page makes **only the API calls it needs**, which mirrors real production apps.

### Example API Request

```js
fetch("http://localhost:3000/pizzas")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch pizzas");
    }
    return res.json();
  })
  .then((data) => {
    console.log("Menu data:", data);
  })
  .catch((err) => console.error("API error:", err));
```

### Supported HTTP Methods

Some pages use **advanced CRUD behavior**:

- **GET** → Retrieve data (menu, specials, testimonials, etc.)
- **POST** → Add new items (e.g., submit a pizza order)
- **PUT** → Update existing data (e.g., change cart quantities)
- **DELETE** → Remove data (e.g., delete a pizza cart item)

This setup allows for **real full‑stack behaviors** without needing to write backend code yet.

## How to Run This Project

You’ll run **two local servers**:

### 1️⃣ API Server (JSON Server)

Install `json-server` and run it from the root directory:

```bash
npm install
npm run server
```

This serves your API at: [http://localhost:3000](http://localhost:3000)

### 2️⃣ Frontend Server (Live Server)

Use the **Live Server** extension in VS Code to open the root `index.html`.

> ⚠️ Don’t open the HTML file by double-clicking — it must be served with Live Server for fetch requests to work!


## Helpful Tips for JSON Server and Fetch API

Here are a few useful pointers as you work with JSON Server and dynamic fetch requests:

### 1️⃣ View the Full API in the Browser
Once you run `npm run server`, you can visit:  
👉 `http://localhost:3000`  
This shows all available routes based on the keys in `db.json`.

### 2️⃣ Routes Come from `db.json` Keys
JSON Server automatically generates endpoints like `/pizzas`, `/specials`, etc., based on the top-level keys in your `db.json` file.

### 3️⃣ Use DevTools to Debug Fetch Requests
Open your browser's **Network tab** to:
- See if a request was made successfully
- Check the status code (e.g., `200`, `404`, etc.)
- View the returned JSON data
- Spot any CORS or path errors

### 4️⃣ Always Check `res.ok`
When using `fetch()`, checking `res.ok` ensures your app doesn’t break silently on a failed request:
```js
if (!res.ok) throw new Error("Something went wrong");
```

### 5️⃣ Live Server Must Be Running
Your HTML files should be viewed through **Live Server**, not by opening them directly (double-clicking won’t work for `fetch()`).

### 6️⃣ Restart If Stuck
If JSON Server seems frozen or unresponsive:
```bash
Ctrl + C  # to stop the server
npm run server  # to start it again
```
## What Comes Next

Once this project is complete, students can optionally rebuild the frontend using **React**.

This mirrors how most modern web apps are built — React replaces static HTML files with **JavaScript-driven views** powered by state, props, and APIs.

- 🔁 Reusable UI components
- 📦 Easier to manage dynamic behavior across multiple pages
- 🔍 Clean separation of data, logic, and presentation
- 💥 More modern and scalable than static HTML + JS files

You’ll revisit this same pizza site soon using React — building each page as a **component**, fetching data with `useEffect()`, and managing state with hooks.