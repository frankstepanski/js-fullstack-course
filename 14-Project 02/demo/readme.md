# Moonlight Pizza Co. — Dynamic Web App (Project 2)

This project builds on the **original Moonlight Pizza Co. website**, which focused on learning CSS layout, responsive design, and structuring frontend files in a scalable way.

In this **second project**, students take their frontend skills further by simulating a full-stack application. All page content is now dynamic, powered by data fetched from a locally hosted REST API using `json-server`.

---

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
- Running the project **without Live Server**

The data is pulled from a local REST API using [`json-server`](https://github.com/typicode/json-server).

---

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

All frontend files live inside the **`public/` folder**, which is served by a local static server.

---

## 🚫 No Live Server in This Project

This project **does not use the VS Code Live Server extension**.

Instead, it uses:
- a **static file server** for the frontend
- a **mock REST API** for the backend

This setup more closely mirrors how real web applications are structured and deployed.

---

## 🧠 How the App Runs (Frontend + Backend)

The project runs **two servers at the same time**:

| Server | Purpose | Port |
|------|--------|------|
| Frontend Server | Serves HTML / CSS / JS files | `3000` |
| Backend Server | Simulated REST API (`json-server`) | `3001` |

---

## 📜 npm Scripts (Important)

These scripts are already defined in `package.json`:

```json
"scripts": {
  "frontend": "serve public -p 3000",
  "backend": "json-server --watch db.json --port 3001",
  "dev": "concurrently -n frontend,backend -c auto \"npm run frontend\" \"npm run backend\""
}
```

### What each script does

- **`npm run frontend`**  
  Starts a static server that serves files from the `public/` folder.  
  Your site is available at:
  ```
  http://localhost:3000
  ```

- **`npm run backend`**  
  Starts `json-server`.  
  Your API is available at:
  ```
  http://localhost:3001
  ```

- **`npm run dev`**  
  Runs **both servers at the same time**.  
  This is the command you should usually use.

---

## ▶️ How to Run the Project

From the `demo/` directory:

```bash
npm install
npm run dev
```

Then open your browser:

- Frontend: **http://localhost:3000**
- API: **http://localhost:3001**

> ⚠️ Do not double-click HTML files.  
> All pages must be loaded through the frontend server.

---

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

---

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

---

## Helpful Tips

- Always make sure **both servers are running**
- Check the **Network tab** in DevTools if data isn’t loading
- Restart servers if things get stuck:
  ```bash
  Ctrl + C
  npm run dev
  ```

---

## What Comes Next

In a future project, this same application will be rebuilt using **React**.

At that point:
- HTML pages become components
- Routing replaces file-based navigation
- State replaces manual DOM updates

This project exists to make that transition feel natural — not magical.

