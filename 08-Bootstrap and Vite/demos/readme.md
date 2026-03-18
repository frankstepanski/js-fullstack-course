# Bootstrap + Vite Project

A beginner-friendly guide for understanding how this project is structured, how Vite works behind the scenes, where to put your files, and why your **images folder belongs in the `public/` directory**.

## 📁 Project Structure Overview

```
project/
├── public/
│   └── images/
│       └── pizza-hero.jpg
│
├── src/
│   ├── main.js
│   └── style.css
│
├── index.html
└── vite.config.js   (optional)
```

### What Goes Where?

| Folder | Purpose |
|--------|---------|
| **public/** | Static assets served as-is. Browser can access them directly. Great for images, favicons, logos, fonts. |
| **src/** | Your JavaScript and CSS that Vite processes, bundles, and optimizes. |
| **index.html** | Main HTML file. Loaded by Vite. |
| **node_modules/** | Auto-generated dependencies — don’t edit manually. |

## 🚀 What Vite Does

Vite is a **modern frontend tooling system** that makes development fast and deployment smooth.

You can think of it as:

### **A super-fast dev server + a bundler for making final production files**

### 🔥 1. During Development (`npm run dev`)

Vite:

- Starts a local web server  
- Loads your app instantly (no bundling first)  
- Automatically reloads the page when you save  
- Allows ES module imports like:

```js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

And it Just Works™.

### 📦 2. For Production (`npm run build`)

Vite:

- bundles your JS and CSS  
- optimizes images  
- removes unused code  
- minifies files  
- outputs clean static files to `/dist`  

These final files are what you deploy to GitHub Pages, Vercel, Netlify, etc.

### Why Images Should Be in the `public/` Folder

Vite treats files **in two different ways**, and beginners often get stuck here. This fixes it.

#### 1️⃣ Files inside `/src`

These files are **processed by Vite**.

That means:

- Paths get rewritten  
- File names change on build  
- Images CAN’T be referenced directly in CSS like this:

```
background-image: url("/images/pizza-hero.jpg");
```

It will **fail**, because Vite expects imported images:

```js
import hero from "./images/pizza-hero.jpg";
```

This is confusing for beginners.

#### 2️⃣ Files inside `/public`

Files here are:

- Served **exactly as-is**  
- NOT processed or renamed  
- Available directly by URL:

```
/images/pizza-hero.jpg
```

So this simple CSS works in ALL environments:

```css
header {
  background-image: url("/images/pizza-hero.jpg");
}
```

## How Vite Serves Files


```
project/
│
├── public/                 <-- static files
│   └── images/
│       └── pizza.jpg   --> available at /images/pizza.jpg
│
└── src/                    <-- processed by Vite
    ├── main.js
    └── style.css
```

Browser sees:

```
https://your-site.com/images/pizza.jpg
```

regardless of whether you're in dev mode or production.
