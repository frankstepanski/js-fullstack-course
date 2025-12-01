# What Does Vite Do?  

Vite (pronounced **“veet”**) is a **build tool and dev server** that helps you write modern JavaScript, CSS, and HTML — and then turns it into something the browser can actually run efficiently.

## 1. Why Do We Need a Tool Like Vite?

When you first learn web development, you might start with:

```text
index.html
styles.css
script.js
```

You add a `<script>` tag and a `<link>` tag and everything works. 🎉

But modern apps often need more:

- Multiple JS files using `import` and `export`
- Code split across components
- Third-party packages from `node_modules`
- Modern syntax (ES modules, sometimes TypeScript)
- CSS imported inside JavaScript
- Optimized files for fast loading in production

The **browser alone** doesn’t know how to:

- Load files directly from `node_modules`
- Understand bare imports like `import "bootstrap/dist/css/bootstrap.min.css"`
- Automatically optimize and bundle everything

That’s where **Vite** comes in.

## 2. Vite Has Two Big Jobs

Vite really does **two main things**:

1. Runs a **dev server** for local development  
2. Produces a **production build** ready to deploy

Let’s break those down.

### **Job #1 – Dev Server (For Local Development)**

When you run:

```bash
npm run dev
```

Vite starts a **local dev server**, usually at:

```text
http://localhost:5173/
```

This dev server:

- Serves your `index.html`
- Processes your JavaScript and CSS imports
- Resolves files from `src/` and `node_modules/`
- Provides **HMR (Hot Module Replacement)**

#### Understanding ES Module Imports

In modern JavaScript, you might write:

```js
// main.js
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

The browser **cannot** understand these imports on its own, especially the ones that don’t start with `./` or `../`.

These:

```js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

are called **bare module specifiers** (because they don’t start with a path).  
The browser doesn’t know where `bootstrap` lives — but Vite does.

Vite:

- Finds `bootstrap` in `node_modules`
- Rewrites the paths to actual files
- Serves them in a way the browser understands

So, thanks to Vite, you can write clean modern imports without worrying about where the files physically live.

#### Hot Module Replacement (HMR)

Without Vite, you’d have to:

- Save a file  
- Manually refresh the browser  
- Scroll back to where you were  

With Vite’s dev server and HMR:

- You save a file  
- The browser automatically updates  
- Only the changed modules reload (not always the whole page)

This makes the feedback loop **fast** and helps you iterate quickly.

#### Dev vs. Production Code

In dev mode, Vite focuses on:

- Speed  
- Fast rebuilds  
- Quick reloads  

The code is **not yet optimized** for deployment — just convenient for editing and testing.

The optimization happens in the **build step**.

### **Job #2 – Production Build (For Deployment)**

When you run:

```bash
npm run build
```

Vite creates a **production-ready version** of your app in a folder called `dist/`.

Example:

```text
dist/
  index.html
  assets/
    main-abc123.js
    style-def456.css
```

#### What Happens During the Build?

Vite (under the hood, using Rollup):

- Reads your source files in `src/`
- Follows your imports (`import` / `export`)
- Bundles JavaScript into fewer files
- Extracts and bundles CSS
- Minifies the code (removes spaces, shortens names)
- Removes dead/unreachable code (tree-shaking)
- Renames files with hashes (e.g. `main-abc123.js`) for cache-busting

The result is:

- Smaller files  
- Fewer HTTP requests  
- Faster load times  
- Code that works reliably across browsers  

#### What You Deploy

You **do not** deploy your entire project (with `src`, `node_modules`, etc.).

You deploy **only** what’s inside `dist/`.

For example, to deploy to GitHub Pages, Netlify, or another static host, you upload the `dist/` folder contents.

## 3. What Problems Does Vite Solve Compared to “Just HTML & JS”?

### Without Vite (or a bundler):

- You can’t directly use imports from `node_modules`  
- You have to manually manage `<script>` tags in the correct order  
- Large apps become messy with many scripts and CSS files  
- No automatic bundling or minification  
- No dev server with hot reload  
- More manual work for production builds  

### With Vite:

- You can write modern JS with imports and exports  
- You can import from `node_modules` with simple statements  
- You get a fast dev server  
- You get automatic bundling, minification, and optimizations  
- You get an easy build step for deployment  

## 4. Where Does Vite Fit in a Fullstack or Frontend Workflow?

Vite is typically used for the **frontend** part of your app. For example:

- React app  
- Vue app  
- Vanilla JS SPA  
- Component-based UI  

It can be used in:

- **Frontend-only projects**, deployed as static files  
- **Fullstack projects**, where the backend is an API (Node/Express, Django, Rails, etc.) and the Vite-built frontend talks to it  

In both cases, the job of Vite is the same:

> Take your modern frontend code and output browser-ready assets.

## 5. Deploying a Vite App

A Vite project builds into a folder called **dist/** using:

```bash
npm run build
```

That folder contains your *production-ready* HTML, CSS, and JavaScript.

You can deploy this to:
- **GitHub Pages** (great for static websites & portfolios)
- **Vercel** (great for modern frontend apps, very easy CI/CD)

### Deploying to GitHub Pages

#### Step 1: Build Your App Locally

```bash
npm run build
```

You should now see:

```
dist/
  index.html
  assets/
```

#### Step 2: Push Your App to GitHub

```bash
git init
git add .
git commit -m "Initial Vite app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

#### Step 3: Set the Vite Base Path (Only for Project Pages)

If deployed to:

```
https://USERNAME.github.io/REPO-NAME/
```

You MUST update `vite.config.js`:

```js
import { defineConfig } from "vite";

export default defineConfig({
  base: "/REPO-NAME/",
});
```

If deployed to a **user site** (like `USERNAME.github.io`), you don't need this.

Rebuild after updating:

```bash
npm run build
```

#### Step 4: Enable GitHub Pages

Go to:

**Repo → Settings → Pages → Build and Deployment**

Choose:

- **Source:** GitHub Actions (recommended)  
  or  
- **Deploy from branch**: choose the branch/folder containing your built files.

GitHub Pages will build or publish the site.

#### Step 5: Visit Your Site

Your site will appear here:

```
https://USERNAME.github.io/REPO-NAME/
```

If it looks broken:
- Double-check `base` in `vite.config.js`
- Make sure GitHub Pages points to the right folder

--- 

### Deploying to Vercel

Vercel is the easiest way to deploy a Vite app.

#### Step 1: Build Locally

```bash
npm install
npm run build
```

#### Step 2: Push Your Code to GitHub

```bash
git add .
git commit -m "Deploying to Vercel"
git push
```

#### Step 3: Connect Repo to Vercel

1. Go to https://vercel.com  
2. Click **New Project**  
3. Choose your GitHub repo  
4. Vercel auto-detects **Vite**

Check these settings:

- **Framework Preset:** Vite  
- **Build Command:** `npm run build`  
- **Output Directory:** `dist`  

Click **Deploy**

#### Step 4: Your Site is Live 🎉

You'll get:

```
https://your-project-name.vercel.app/
```

Every time you push to your GitHub repo, Vercel **automatically redeploys**.

### Which Should You Choose?

### GitHub Pages
✔ Simple  
✔ Great for static sites  
✔ Good for portfolios  
✔ Free forever  

### Vercel
✔ Easiest CI/CD workflow  
✔ Automatic deployments  
✔ Runs great with modern frontend setups  
✔ Perfect for frameworks like React, Vue, Svelte, etc.  

Both are excellent—students should try **both** to build confidence.
