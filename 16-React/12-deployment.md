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
✅ API configuration is set up properly  

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
- Converts your React app into browser-ready files

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
- Beginner-friendly dashboards
- Simple redirects and forms

**Two ways to deploy:**

#### 1️⃣ Git-based (Recommended)
- Connect GitHub
- Netlify builds on every push
- Automatic redeploys

#### 2️⃣ Drag-and-Drop
- Run `npm run build`
- Drag the `dist/` folder into Netlify

Great for demos, but does **not** auto-update on future pushes.

---

### Option C: Cloudflare Pages (Fast + Free)

**Best for:**
- Free static hosting
- Global CDN
- Modern infrastructure

**Beginner experience:**
Very similar to Vercel and Netlify:
- Connect GitHub
- Set build command
- Set output directory
- Auto-deploy on pushes

### How to Choose 

```text
First React app        → Vercel
Static site + forms    → Netlify
Fast hosting           → Cloudflare Pages
```

If you’re new to deployment, **Vercel first** is usually the smoothest experience.

## More "Pro" Deployment Options

These deployment options are considered more “pro” not because they are better, but because they offer more control and are commonly used in professional environments. Beginners do not need to use these right away, but understanding them helps you see how React apps are deployed at scale.

### Option D: Firebase Hosting  
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

### Option E: AWS (S3 + CloudFront) 
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

## SPA Routing in React Deployments

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

## Environment Variables in Deployment

When you deploy your React app, the cloud hosting platform does **not** automatically take your local `.env` files and use them for you.

That means:

- the `.env` files on your computer stay on your computer
- your hosting provider needs its **own copy** of the environment variable values
- you usually enter those values manually in the cloud dashboard

So if your app needs something like:

```text
VITE_API_URL=https://api.myapp.com
```

you must usually go into your hosting platform dashboard and re-create that variable there.

### Why This Matters

If the cloud platform does not have the correct environment variable values, your deployed app may:

- fail to load correctly
- call the wrong API
- still point to `localhost`
- miss public keys or feature flag settings
- behave differently from your local version

This is one of the most common reasons an app works locally but breaks after deployment.

### What You Usually Do in Practice

A common workflow looks like this:

1. Create your environment variables locally  
2. Test the app on your machine  
3. Open your cloud hosting dashboard  
4. Re-create the required production variables there  
5. Trigger a new deployment  
6. Test the live app again  

### Example

Locally, you might have this in:

#### `.env.development`

```env
VITE_API_URL=http://localhost:3000
VITE_SHOW_DEBUG=true
```

But in your cloud hosting platform, you would add production values such as:

```text
VITE_API_URL=https://api.myapp.com
VITE_SHOW_DEBUG=false
```

Your React code stays the same:

```js
const apiUrl = import.meta.env.VITE_API_URL;
const showDebug = import.meta.env.VITE_SHOW_DEBUG === "true";
```

The difference is that your cloud provider must supply the production values during deployment.

### Final Mental Model

```text
local .env files
→ used on your machine

cloud dashboard env variables
→ used when the app is built and deployed online
```

So the key idea is:

> Creating `.env` files locally is only part of the setup. For deployment to work correctly, you usually must re-create those environment variable values in your cloud hosting dashboard too.



## Key Takeaways

Now, you should have a clear mental model of what “deploying a React app” actually means. You are not deploying React itself, your components, or your source code — you are deploying the **result of a build**. After `npm run build`, your app is just a folder of static files (`dist/`) that any web server can deliver.

The biggest shift from development to production is understanding that **your development server is gone**. Vite’s dev server hides many details for you — routing always works, errors are easy to spot, and everything feels automatic. In production, those conveniences must be handled explicitly by your hosting platform through build configuration and SPA routing fallbacks.

If you remember nothing else, remember this flow:

```text
Write React code
→ Build the app
→ Deploy the dist/ folder
→ Configure routing
→ Verify in production
```

Once you understand that flow, deployment stops feeling magical and starts feeling mechanical — and that’s a good thing. Whether you’re using Vercel, Netlify, Cloudflare Pages, or a more advanced platform like AWS or Firebase, the fundamentals stay the same.

From here, the next steps are about **scale and integration**: connecting real backends, adding authentication, introducing CI/CD pipelines, optimizing performance. All of those build directly on the foundation you've just learned.

> **If your app builds, routes correctly after refresh, and loads from a public URL — you’ve successfully deployed a real web application.**