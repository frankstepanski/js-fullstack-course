# Deploying a React App

Deploying means taking your React project from “it runs on my laptop” to “anyone can visit it on the internet.”

A React app is usually a **static website** after it’s built: it becomes a folder of HTML/CSS/JS files that a hosting service can serve to users. Your users do **not** need Node.js installed—only the server (or hosting platform) needs to serve the built files.

### Development vs Production
- **Development**: you run `npm run dev` (or `npm start`) and React uses a local dev server with hot reloading.
- **Production**: you run a **build** command that creates optimized files for the web.

**Important distinction:**
- **Build-time**: Your code is compiled and bundled successfully.
- **Runtime**: Your app runs in the browser after deployment.

## Build Output

When you run:

```bash
npm run build
```

Vite takes everything you wrote as a developer and turns it into files that browsers can understand efficiently.

Your:
- React components
- JavaScript modules
- CSS files
- Images and fonts

are all **compiled, bundled, and optimized** into the `dist/` folder.

#### Before the Build (Developer Code)

```text
src/
├── components/
├── pages/
├── App.jsx
├── main.jsx
├── styles/
└── package.json
```

This code:
- Uses JSX
- Uses modern JavaScript modules
- Relies on development tooling

Browsers cannot run this directly.

#### After the Build (Browser-Ready Code)

```text
dist/
├── index.html
├── assets/
│   ├── index-abc123.js
│   ├── index-def456.css
│   └── logo-xyz.png
```

This output:
- Converts JSX to plain JavaScript
- Merges and minifies CSS
- Optimizes assets
- Adds hashed filenames for caching

This is what browsers *can* run.

### Only `dist/` Gets Deployed

Servers and hosting platforms only need to serve files that browsers understand:

- HTML
- CSS
- JavaScript
- Images

They do **not** need:
- `src/`
- `node_modules/`
- Vite config files
- Package scripts

That’s why deployment platforms:
- Ignore your source code
- Ignore development dependencies
- Only care about `dist/`

```text
src/   → developer code
dist/  → browser-ready code
```

> **If it’s not in `dist/`, it doesn’t get deployed.**

### Hosting

A hosting platform:
- Uploads or builds your project
- Serves the `dist/` folder
- Gives you a public URL

Common hosts:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages (advanced)

### Your Job
You usually do 4 things:
1. Build the app
2. Upload or connect the build output to a host
3. Configure routing (if needed)
4. Verify and share the URL

### Before You Deploy: Quick Checklist

✅ App runs locally with `npm run dev`  
✅ No console errors  
✅ Code pushed to GitHub  
✅ `npm run build` succeeds  
✅ You know if you’re using React Router  
✅ Environment variables are identified  

## Step-by-Step: Deploying a Vite React App

This guide walks through deploying a React app built with **Vite**, explaining not just *what* to do, but *why* each step matters.

At a high level, deployment always follows this flow:

> **Write code → build the app → host the built files**

### Step 1: Build the App

```bash
npm install
npm run build
```

What this does:
- Installs all project dependencies
- Runs Vite’s production build
- Converts your React app into browser‑ready files

After this step, you should see a new folder:

```text
dist/
```

This folder contains:
- `index.html`
- Compiled JavaScript
- Compiled CSS
- Optimized assets

> **This folder is your actual app.**  
> Everything before this step is developer tooling.

### Step 2: Preview the Production Build (Highly Recommended)

```bash
npm run preview
```

This starts a local server that behaves **exactly like a real deployed site**.

Use this step to confirm:
- Pages load correctly
- React Router routes work
- API calls don’t point to `localhost`
- No console errors appear

Many deployment issues only show up **after the build**, so this step saves a lot of frustration.

### Step 3: Choose a Hosting Option

Now that your app is built, you need a platform that can:
- Store your `dist/` folder
- Serve it over the internet
- Give you a public URL

For beginners, **Vercel** and **Netlify** are the smoothest options.

## Best Beginner Deployment Options

### Option A: Vercel (Best Overall for React)

**Best for:**
- React apps
- Fast setup
- Zero configuration
- Automatic redeploys

**Why beginners like it:**
Vercel detects Vite automatically and “just works” in most cases.

**How it works conceptually:**
```text
GitHub push
   ↓
Vercel builds app
   ↓
Vercel deploys dist/
   ↓
Live URL updates automatically
```

**What you’re really doing:**
1. Push your project to GitHub  
2. Connect GitHub to Vercel  
3. Select your repo  
4. Vercel runs `npm run build`  
5. Vercel serves the `dist/` folder  

No manual uploads required.

---

### Option B: Netlify (Excellent Static Hosting)

**Best for:**
- Static React apps
- Beginner‑friendly dashboards
- Simple redirects and forms

**Two ways to deploy:**

#### 1️⃣ Git‑based (Recommended)
- Connect GitHub
- Netlify builds on every push
- Automatic redeploys

#### 2️⃣ Drag‑and‑Drop
- Run `npm run build`
- Drag the `dist/` folder into Netlify

Great for demos, but does **not** auto‑update on future pushes.

---

### Option C: GitHub Pages (Good for Portfolios)

**Best for:**
- Student portfolios
- Simple demos
- Free hosting on GitHub

**Important note:**
GitHub Pages does **not** build your app for you.

You must:
- Build locally
- Push the `dist/` folder to a special branch

It requires:
- Setting a base path
- Extra React Router configuration

Totally doable, but more setup‑heavy.

---

### Option D: Cloudflare Pages (Fast + Free)

**Best for:**
- Free static hosting
- Global CDN
- Modern infrastructure

**Beginner experience:**
Very similar to Vercel and Netlify:
- Connect GitHub
- Set build command
- Set output directory
- Auto‑deploy on pushes

### How to Choose 

```text
First React app        → Vercel
Static site + forms    → Netlify
Portfolio site         → GitHub Pages
Fast free hosting      → Cloudflare Pages
```

If you’re new to deployment, **Vercel first** is usually the smoothest experience.

## More "Pro" Deployment Options

These deployment options are considered more “pro” not because they are better, but because they offer more control and are commonly used in professional environments. Beginners do not need to use these right away, but understanding them helps you see how React apps are deployed at scale.

### Option E: Firebase Hosting  
**Best for:** apps that already use Firebase Authentication, Firestore, or Firebase Functions

Firebase Hosting is part of Google’s Firebase platform and works especially well when your React app already depends on Firebase services.

**Why teams choose Firebase Hosting**
- Seamless integration with Firebase Authentication
- Easy access to Firestore or Realtime Database
- Built-in support for serverless backend logic
- Suitable for full-stack JavaScript applications

**How it works conceptually**
```text
React build (dist/)
   ↓
Firebase Hosting
   ↓
Firebase Auth / Database / Functions
```

**High-level workflow**
1. Install the Firebase CLI
2. Initialize Firebase Hosting in your project
3. Build your React app
4. Deploy the `dist/` folder

Firebase Hosting gives you strong integration with backend services, but requires more manual configuration than Vercel or Netlify.

---

### Option F: AWS (S3 + CloudFront) 
**Best for:** learning cloud infrastructure, enterprise applications, AWS-based systems

AWS is the most widely used cloud platform in production environments and offers multiple ways to deploy React apps.

This approach provides the most control over infrastructure.

**How it works**
```text
React build (dist/)
   ↓
S3 (static file storage)
   ↓
CloudFront (global CDN)
   ↓
Users worldwide
```

**What this involves**
- Uploading the `dist/` folder to an S3 bucket
- Configuring static website hosting
- Setting up CloudFront for performance and caching
- Managing permissions and routing manually

**Why professionals use it**
- Complete control over hosting behavior
- Extremely scalable
- Common in enterprise environments


---

###  Option G: AWS Amplify

AWS Amplify simplifies deployment while still using AWS infrastructure.

**How it works**
```text
GitHub repository
   ↓
Amplify builds app
   ↓
Amplify deploys dist/
   ↓
Live site + automatic redeploys
```

**Why Amplify is easier**
- GitHub-based workflow
- Automatic builds and deployments
- Built-in CI/CD
- Easier routing setup


### How To Choose

```text
Firebase Hosting → Firebase-first apps
S3 + CloudFront → Maximum control and scale
AWS Amplify     → AWS with modern developer experience
```

## SPA Routing & Environment Variables in React Deployments

By this point, you're already comfortable with how React Router works during development. Your application is a **Single Page Application (SPA)**, meaning it is powered by a single `index.html` file and navigation is handled entirely in the browser. 

During local development (`npm run dev`), Vite's development server makes this experience feel seamless. It always serves `index.html`, no matter which route you visit, and hands full control of routing to React Router. 

This is why routes like `/dashboard` or `/profile` work flawlessly while you’re developing. When it comes time to deploy, however, this convenience is no longer guaranteed — and ensuring your production server behaves the same way becomes an important part of the deployment process.

---

### The React Router 404 Problem 

When your React app is deployed, your hosting provider behaves like a traditional web server. This is a key difference from the development experience and one of the most common sources of confusion for beginners.

Traditional web servers follow a simple rule:

> When a URL is requested, look for a file that matches that path.

So when a user refreshes or directly visits this URL:

```text
https://yoursite.com/dashboard
```

the server looks for a real file called `/dashboard`. Since your deployed React app only contains a single HTML file (`index.html`) and no actual `/dashboard` file, the server responds with:

```text
404 Not Found
```

From the server’s perspective, this response is correct. The issue is that React apps do not work the same way as traditional multi-page websites.

#### Why This Doesn’t Happen During Development

When you run your app locally using:

```bash
npm run dev
```

Vite’s development server automatically:
- Serves `index.html` for every route
- Hands routing control to React Router
- Ignores the actual URL path

This is why refreshing `/dashboard` works perfectly during development. The dev server is designed to hide this complexity so you can focus on building features.

Once deployed, this behavior must be recreated manually using your hosting provider’s configuration.

---

### The Fix: Always Serve `index.html`

To make React Router work correctly in production, your hosting provider needs to be told:

> “If a requested path does not match a real file, return `index.html` instead.”

This ensures:
1. The server always sends `index.html`
2. React loads in the browser
3. React Router reads the current URL
4. The correct component is rendered

This is often referred to as:
- SPA fallback
- History fallback
- Rewrite to `index.html`

Different platforms use different terminology, but the concept is the same.


### How Beginner-Friendly Hosting Platforms Handle This

**Vercel**
- SPA routing works automatically in most cases
- No extra configuration needed for typical React Router setups
- This is one reason Vercel is popular with beginners

**Netlify**
- Requires an explicit redirect rule:
```text
/*  /index.html  200
```
- This tells Netlify to always serve `index.html` for unknown routes

**GitHub Pages**
- Does not support SPA routing by default
- Often requires hash-based routing (`/#/dashboard`)
- Requires extra setup and workarounds
---

### Environment Variables: Development vs Deployment

You use Environment variables 5o allow your React app to change behavior without changing source code. They exist to separate **configuration** from **application logic**. They answer questions about *where* and *how* your app runs, not *what* your app does.

Environment variables are store information like:
- API base URLs
- Public (non-secret) keys
- Feature flags and environment-specific settings

They are **not** meant to:
- Store user data
- Replace React state
- Change frequently while the app is running

Once your app is built, environment variables behave like constants baked into the code.

>Hard-coding these values often works locally but breaks once the app is deployed, especially when moving away from `localhost`.

### Environment Variables in Production

During development, your app might communicate with:

```text
http://localhost:3000
```

In production, however:
- Your backend runs on a different domain
- You may have multiple environments (development, staging, production)
- Sensitive configuration should not be committed to GitHub

Environment variables make your app portable across environments, but only when they are configured correctly for deployment.

### How Vite Handles Environment Variables

Vite enforces a simple rule:

> Only environment variables prefixed with `VITE_` are exposed to your React app.

Example:
```bash
VITE_API_URL=https://api.example.com
```

In your React code:
```js
const apiUrl = import.meta.env.VITE_API_URL;
```

During the build step (`npm run build`), Vite reads these variables and injects their values directly into the built JavaScript files.

Platforms like **Vercel**, **Netlify**, and **Cloudflare Pages** handle environment variables similarly:

- Variables are set in the platform dashboard
- Values are injected during the build step
- The app is redeployed automatically after changes

If environment variables are updated without triggering a new deployment, the app will continue using the old values.

---

### Why Frontend Environment Variables Must Be Public

In frontend React apps:
- Environment variables are injected into JavaScript
- JavaScript is downloaded by the browser
- Anyone can view those values in DevTools

This means:
- API base URLs are safe
- Public API keys are safe
- Database passwords and private keys are **not**

> 🔒 If something must stay secret, it belongs in a backend service, not in your React app.

---

#### `.env` Files Are Development Tools

Locally, you may use files like:

```text
.env
.env.local
.env.development
```

These files:
- Are read by Vite on your machine
- Help with local development
- Are usually ignored by Git

In production:
- Hosting platforms do not read your `.env` files
- You must define environment variables in the platform dashboard
- The platform injects them during the build step

Think of `.env` files as helpers for development, not deployment.

```text
Code       → behavior
Env vars   → configuration
Build step → locks them together
```

Once deployed, changing configuration requires a rebuild.

## Key Takeaways

Now, you should have a clear mental model of what “deploying a React app” actually means. You are not deploying React itself, your components, or your source code — you are deploying the **result of a build**. After `npm run build`, your app is just a folder of static files (`dist/`) that any web server can deliver.

The biggest shift from development to production is understanding that **your development server is gone**. Vite’s dev server hides many details for you — routing always works, environment variables feel dynamic, and errors are easy to spot. In production, those conveniences must be handled explicitly by your hosting platform through build configuration, SPA routing fallbacks, and environment variable setup.

If you remember nothing else, remember this flow:

```text
Write React code
→ Build the app
→ Deploy the dist/ folder
→ Configure routing and environment variables
→ Verify in production
```

Once you understand that flow, deployment stops feeling magical and starts feeling mechanical — and that’s a good thing. Whether you’re using Vercel, Netlify, Cloudflare Pages, or a more advanced platform like AWS or Firebase, the fundamentals stay the same.

From here, the next steps are about **scale and integration**: connecting real backends, adding authentication, introducing CI/CD pipelines, optimizing performance. All of those build directly on the foundation you've just learned.

> **If your app builds, routes correctly after refresh, and loads from a public URL — you’ve successfully deployed a real web application.**
