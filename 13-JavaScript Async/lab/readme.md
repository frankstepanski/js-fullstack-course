# JavaScript Async + APIs Practice Lab  

:tada: Tonight’s Live Async JavaScript Lab!  

👉 **Every Friday live session will include a small hands-on lab exercise!**  

You’ve already learned:  
- how JavaScript runs code  
- how functions work  
- how to update the DOM  
- how to use events to make pages interactive  

We'll take your existing Restaurant Menu or Personal Trading Card page **OR create a brand‑new page**, and load real data using the **Fetch API**, then dynamically update the DOM using JavaScript.

You should NOT rebuild everything — just fetch some JSON data and render it to the screen.

## 🎨 What We’re Doing

You have **two options** tonight:

### Option 1 — Use JSON‑Server to create your own REST API
- install `json-server`
- build your own local API (db.json)
- fetch your own data and display it

Perfect if you want to add dynamic data to:
- Restaurant Menu
- Personal Trading Card

### Option 2 — Use any free public API
Find a public API and build a simple new page.
- fetch data using GET
- display results in the DOM

Examples:
- Pokémon API  
- Star Wars API  
- Animals API  
- Rick & Morty API  
- ANY free REST API  

## You’ll practice:
- Fetch API (GET request)
- using async/await or .then()
- JSON parsing
- updating DOM elements dynamically
- printing data on screen without refreshing
- error handling basics

### 1️⃣ Build (or Pick) an API

### If using JSON‑Server:
```bash
npm install json-server
json-server --watch db.json
```

Example db.json:
```json
{ "pizzas": [ { "name": "Pepperoni" } ] }
```

### 2️⃣ Make a GET request

Using `fetch()`:
```js
fetch("http://localhost:3000/pizzas")
  .then(res => res.json())
  .then(data => console.log(data));
```

Or async/await:
```js
const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
const data = await res.json();
```

### 3️⃣ Render Results in the DOM

Use DOM methods:
- textContent  
- innerHTML  
- classList  
- createElement  
- appendChild  

Display:
- pizza names
- character details
- API data items  
- images
- stats  

Whatever your API gives you!

### 4️⃣ Dynamically Update the DOM

Examples:
- show top 3 pizzas
- show Pokemon name and picture
- show random Star Wars character
- reveal API facts on button click

Think: “my webpage is now pulling live data!”

### 5️⃣ BONUS (Optional)

Try making:
- POST request
- DELETE request

Examples:
- add a new pizza
- remove a character
- delete from list
- add a favorite item

Using:
```js
fetch(url, { method: "POST" })
```

## ✨ Optional Extra Flair

- loading state (“loading…”)
- show an error message
- retry if failed
- random item from API
- button that fetches new results
- switch between API endpoints

## ❗ Keep This Small

You are NOT building a giant app!

Just:
- one GET request
- display something clearly in the DOM
- one small dynamic element


## ✅ Lab Requirements

To complete this lab, your project should include:

- a fetch GET request
- converted JSON data
- at least one DOM update from API data
- visible results on the page
- styled or formatted display (even basic text is fine)

Optional but encouraged:
- POST or DELETE request

---

Same deal as before — build individually during class, and I’ll invite a few folks to share what your page does now using real API data!
