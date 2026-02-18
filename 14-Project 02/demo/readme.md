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
- Using `fetch()` for GET / POST / PUT / DELETE
- Dynamically updating the DOM
- A clearer separation between **frontend** and **backend**

The data is pulled from a local REST API using [`json-server`](https://github.com/typicode/json-server).

## 📁 Project File Structure

```
demo/
├── public/
│   ├── index.html
│   ├── pages/
│   │   ├── menu.html
│   │   ├── specials.html
│   │   ├── order.html
│   │   └── contact.html
│   ├── css/
│   ├── js/
│   └── images/
├── db.json
├── package.json
```

All frontend files live inside the **`public/` folder**.

### Why the `public/` folder is recommended

This structure is intentional and mirrors how real-world web apps are commonly organized.

- The `public/` folder contains **everything the browser is allowed to access directly**
  - HTML pages
  - CSS
  - JavaScript
  - images and other static assets

- `json-server` is configured to:
  - serve all files inside `public/` as static frontend assets
  - serve data from `db.json` as a REST API

Because of this:
- You can load pages like `/index.html` or `/pages/menu.html` directly in the browser
- All `fetch()` calls work correctly because the files are served through a server
- There are no CORS or file-path issues caused by opening files locally

### Real-world parallel

In production apps:
- Frontend build files are often served from a `public`, `dist`, or `build` folder
- Backend APIs live alongside them on the same server

This project uses the same mental model — **one server, one public directory, multiple responsibilities** — without adding unnecessary complexity.


## How the App Runs (Single Server)

Because the `index.html` file lives in the `public/` folder, **`json-server` serves both the frontend and the backend from the same server**.

| What It Serves | Description | Port |
|---------------|------------|------|
| Frontend | Static files (HTML, CSS, JS) from `public/` | `3001` |
| Backend (API) | Simulated REST API from `db.json` | `3001` |

There is **only one server running**:
- `json-server` acts as a **static file server** for the UI  
- and a **REST API** for your data  

This mirrors how many real-world apps work in development and small deployments—one server, two responsibilities.


## 📜 npm Scripts

This project uses **a single npm script** to run both the frontend and backend.

### `package.json`

```json
"scripts": {
  "server": "json-server --watch db.json --port 3001 --static public"
}
```

### What this script does

- **`npm run server`**  
  Starts `json-server`, which handles **both responsibilities**:

  - Serves static frontend files (HTML, CSS, JS) from the `public/` folder  
  - Serves a simulated REST API based on `db.json`

  Everything runs on:
  ```
  http://localhost:3001
  ```

### Why there is only one script

Because `index.html` lives in the `public/` folder and the `--static public` flag is used:

- There is **no separate frontend server**
- There is **no need for `concurrently`**
- `json-server` acts as both:
  - a **static file server**
  - and a **backend API**

This setup keeps local development simple while still reflecting how frontend and backend often live together behind a single server in real-world applications.

## ▶️ How to Run the Project

From the `demo/` directory:

```bash
npm install
npm run server
```

Then open your browser:

- App (Frontend + API): **http://localhost:3001**

> ⚠️ Do not double-click HTML files.  
> All pages must be loaded through the server so `fetch()` requests to the API work correctly.

## API Endpoints Used

Available API routes (from `db.json`):

```
http://localhost:3001/pizzas
http://localhost:3001/specials
http://localhost:3001/contactCards
http://localhost:3001/cart
http://localhost:3001/orders
http://localhost:3001/testimonials
```

Each page only requests the data it needs:

### 🏠 About Page
- `GET /testimonials`

### 🍕 Menu Page
- `GET /pizzas`

### ⭐ Specials Page
- `GET /specials`

### 🛒 Order Page
- `GET /pizzas`
- `POST /orders`
- `PUT /orders/:id`
- `DELETE /orders/:id`

### 📞 Contact Page
- `GET /contactCards`

## Example Fetch Request

```js
fetch("http://localhost:3001/pizzas")
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

## What Comes Next

In a future project, this same application will be rebuilt using **React**.

At that point:
- HTML pages become components
- Routing replaces file-based navigation
- State replaces manual DOM updates

This project exists to make that transition feel natural — not magical.

