# Deploying a Node / Express REST API

So far you have done two important things:

1. Deployed a frontend React application that runs on the internet.
2. Built a backend REST API with Node and Express that runs locally and connects to your database.

Right now your setup looks like this during development:

```
React Frontend (localhost:5173)
        ↓
Node / Express API (localhost:3000)
        ↓
Database (Neon — PostgreSQL  OR  MongoDB Atlas — MongoDB)
```

Your frontend can talk to the backend because both are running on your machine.

However, this is **not how real production applications work**.

In real-world applications:

- the **frontend is deployed**
- the **backend API is deployed**
- both communicate through **public URLs**

The next step is to move your backend from:

> **"it runs on my laptop"**

to

> **"applications on the internet can send it requests."**

This process is called **backend deployment**.

## What Changes When We Deploy the Backend

Unlike a React app, which becomes a static website, a Node/Express backend is a **running server program**.

That server must stay running continuously so it can:

- receive HTTP requests
- process requests
- communicate with the database
- return responses to clients

Instead of running on your machine, the server runs on a **cloud hosting platform** that keeps it alive 24/7.

When your backend is deployed, it gets a **public URL** that anyone on the internet can send requests to — just like calling a real API.

Example:

```
https://notes-api.onrender.com
```

This URL becomes the **base address for your REST API**, and your deployed React frontend will communicate with it just like a real production application.

Common backend hosting platforms include:

- [Render](https://render.com/) ← recommended for beginners
- [Railway](https://railway.com/)
- [Fly.io](https://fly.io/)
- [DigitalOcean](https://www.digitalocean.com)

## Before vs After Deployment

### Before Deployment (Development)

```
React (localhost:5173)
        ↓
API (localhost:3000)
        ↓
Database (Neon — PostgreSQL  OR  MongoDB Atlas — MongoDB)
```

### After Deployment (Production)

```
Users
  ↓
React Frontend (Vercel)
  ↓
Node / Express API (Render)
  ↓
Database (Neon — PostgreSQL  OR  MongoDB Atlas — MongoDB)
```

After deployment:
- The **frontend** runs on Vercel
- The **backend** runs on Render
- The **database** runs on Neon (PostgreSQL) or MongoDB Atlas (MongoDB)
- Everything communicates using **public URLs**

## Development vs Production URLs

When you built your API locally it ran on:

```
http://localhost:3000
```

Your frontend called endpoints like:

```
http://localhost:3000/api/notes
```

When the API is deployed on Render, the base URL changes:

```
https://notes-api.onrender.com/api/notes
```

> Your API routes **do not change** — only the **host address changes**.

## What Actually Happens During Deployment

When you deploy to any backend hosting platform, the process generally follows the same pattern:

```
GitHub repository
       ↓
Platform installs dependencies
       ↓
Platform starts Node server
       ↓
Server continues running
       ↓
API becomes publicly accessible
```

Unlike React deployment, the platform does not serve static files. Instead it runs your **Node server process continuously** — keeping it alive so it can respond to requests at any time.

When you deploy a Node API on Render specifically, the platform performs these steps automatically:

```
You push code to GitHub
        ↓
Render detects the change
        ↓
Render installs dependencies (npm install)
        ↓
Render runs your start command (npm start)
        ↓
Your server starts running on Render's servers
        ↓
Render gives your API a public URL
        ↓
API is live and accessible on the internet
```

## Before You Deploy — Checklist

Before pushing your code to GitHub and deploying, make sure these things are in order.

### 1. Your `.env` File Must NOT Be in GitHub

Your `.env` file contains sensitive secrets — database passwords, API keys, JWT secrets. If this file gets pushed to GitHub it is publicly visible to anyone, even if your repo is private.

Check your `.gitignore` file in the root of your project. It must include `.env`:

```
# .gitignore
node_modules/
.env
```

If `.env` is not listed, add it now before committing anything.

```
  .gitignore is correct:           .gitignore is missing .env:

  .gitignore                       .gitignore
  ─────────────                    ─────────────
  node_modules/    ✅              node_modules/    ✅
  .env             ✅              dist/            ✅
  dist/            ✅                               ❌ .env is missing!
```

> **Important:** If you have already accidentally committed your `.env` file to GitHub, your secrets are exposed. You should immediately rotate (regenerate) any passwords or keys that were in it.

### 2. Your `package.json` Must Have a `start` Script

Render needs to know how to start your server. It looks for a `start` script in your `package.json`.

Open your `package.json` and check the `scripts` section:

```json
{
  "name": "my-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

- `start` → used by Render in production to start your server
- `dev` → used by you locally during development (with nodemon for auto-restart)

If you don't have a `start` script, add one now. Make sure the path points to your actual server entry file.

### 3. Your Server Must Listen on `process.env.PORT`

Render assigns a port to your server automatically. Your server must use that port — not a hardcoded one.

```js
// ❌ Don't hardcode the port
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// ✅ Use the environment variable Render provides
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

The `|| 3000` fallback means your server still works locally on port 3000 even when `PORT` is not set.

### 4. Your Code Must Use Environment Variables — Not Hardcoded Values

All sensitive values — database connection strings, JWT secrets, API keys — must come from `process.env`, never hardcoded in your code.

```js
// ❌ Never do this
const pool = new Pool({ connectionString: "postgresql://user:password@host/db" });

// ✅ Always do this
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
```

## Environment Variables in Production

Your backend likely already uses **environment variables** for configuration — values that may change depending on where your app is running.

During local development, environment variables are stored in your `.env` file and loaded automatically when your server starts.

Your backend code reads these values using:

```js
process.env.DATABASE_URL
```

Example database connection:

```js
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

This works because your **local machine can read the `.env` file**.

```
.env file
   ↓
Node / Express API
   ↓
Environment Variables Loaded
   ↓
process.env.DATABASE_URL is available
```

### Production Deployment

When your backend is deployed to Render, the platform **does not read your `.env` file**. Instead, environment variables must be configured in the **Render dashboard**.

```
  Local Development:               Render Production:

  .env file                        Render dashboard
  ─────────────                    ──────────────────
  DATABASE_URL=...   →             DATABASE_URL = ...
  JWT_SECRET=...     →             JWT_SECRET = ...
  FRONTEND_URL=...   →             FRONTEND_URL = ...
       ↓                                  ↓
  process.env.DATABASE_URL         process.env.DATABASE_URL
```

Your code does not change — `process.env.DATABASE_URL` works exactly the same in both environments. The only difference is where the value comes from.

### Common Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection string (Neon) | `postgresql://user:pass@host/db` |
| `MONGO_URI` | MongoDB connection string (Atlas) | `mongodb+srv://user:pass@cluster/db` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `a-long-random-string` |
| `FRONTEND_URL` | Your deployed frontend URL (for CORS) | `https://notes-app.vercel.app` |
| `PORT` | Server port (Render sets this automatically) | `3000` |
| `NODE_ENV` | Environment name | `production` |

### `NODE_ENV` — Detecting the Environment

Most applications behave differently in development vs production. Node applications detect this using:

```js
process.env.NODE_ENV
```

| Environment | Value |
|------------|-------|
| Local development | `development` |
| Render deployment | `production` |

Example — configuring CORS differently per environment:

```js
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL]
    : ["http://localhost:5173"];

app.use(cors({ origin: allowedOrigins }));
```

This means you don't need two separate codebases — the same code automatically adjusts based on where it's running.

## CORS — Updating for Deployment

You already configured CORS in the security doc. When you deploy, the key change is that your frontend and backend now run on **different domains**, so your CORS origin must point to your deployed frontend URL — not localhost.

Update your CORS configuration to allow both local development and production:

```js
const allowedOrigins = [
  "http://localhost:5173",              // local development
  process.env.FRONTEND_URL             // deployed frontend (set in Render dashboard)
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

Then in your Render environment variables, set:

```
FRONTEND_URL=https://notes-app.vercel.app
```

This means you never need to change your code when switching between environments — just update the environment variable.

## Step-by-Step: Deploying on Render

Render is the recommended platform for deploying your backend. It has a free tier, works directly with GitHub, and is the simplest option for Node/Express APIs.

### Step 1 — Make Sure Your Code Is on GitHub

Commit and push your latest backend code to GitHub. Make sure:
- `.env` is in `.gitignore` ✅
- `package.json` has a `start` script ✅
- Server uses `process.env.PORT` ✅

### Step 2 — Create a Render Account

Go to [https://render.com](https://render.com) and sign up using your GitHub account.

### Step 3 — Create a New Web Service

In the Render dashboard:

1. Click **New +** → **Web Service**
2. Connect your GitHub account if you haven't already
3. Find your backend repository and click **Connect**

### Step 4 — Configure the Service

Render will detect your project automatically. Confirm or fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | Your API name (e.g. `notes-api`) |
| **Region** | Choose the closest to you |
| **Branch** | `main` (or your default branch) |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

### Step 5 — Add Environment Variables

Before deploying, scroll down to the **Environment** section and add your variables:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Neon connection string |
| `JWT_SECRET` | Your JWT secret key |
| `FRONTEND_URL` | Your deployed Vercel frontend URL |
| `NODE_ENV` | `production` |

> Do not add `PORT` — Render sets this automatically.

### Step 6 — Deploy

Click **Create Web Service**. Render will:

1. Pull your code from GitHub
2. Run `npm install`
3. Run `npm start`
4. Assign your API a public URL

You can watch the deployment logs in real time. A successful deploy ends with something like:

```
==> Your service is live 🎉
https://notes-api.onrender.com
```

### Step 7 — Update Your Frontend

Your React frontend still calls `http://localhost:3000`. Update it to call your deployed API instead.

In your frontend project, update the environment variable:

```
# .env (frontend)
VITE_API_URL=https://notes-api.onrender.com
```

Then use it in your frontend code:

```js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Example fetch
const response = await fetch(`${API_URL}/api/notes`);
```

Redeploy your frontend on Vercel after making this change.

## Checking Logs and Debugging

When something goes wrong on Render — and it will, especially on the first deploy — the logs tell you what happened.

In the Render dashboard, open your service and click **Logs**. Common things to look for:

| What You See in Logs | What It Means | How to Fix |
|---------------------|---------------|------------|
| `Cannot find module '...'` | Missing dependency | Check `package.json`, run `npm install` locally |
| `DATABASE_URL is not defined` | Missing environment variable | Add it in the Render Environment panel |
| `MongooseError: connection failed` | Wrong MongoDB URI | Check `MONGO_URI` in Render environment variables |
| `password authentication failed` | Wrong DB credentials | Check `DATABASE_URL` in Render environment variables |
| Server starts then immediately exits | Unhandled error on startup | Read the full error message in the logs |

```
  Render Logs panel:

  [2024-01-01] npm install ✅
  [2024-01-01] npm start
  [2024-01-01] Connected to PostgreSQL ✅
  [2024-01-01] Server running on port 10000 ✅
  [2024-01-01] ==> Your service is live 🎉
```

> **Tip:** If your deploy fails, read the full log from top to bottom. The error is almost always clearly stated — missing env variable, wrong file path, or a missing dependency.

## PostgreSQL vs MongoDB — What Changes at Deployment

Both databases work the same way in production. The only difference is the connection string variable name and where it comes from.

| | PostgreSQL (Neon) | MongoDB (Atlas) |
|---|---|---|
| **Connection variable** | `DATABASE_URL` | `MONGO_URI` |
| **Where hosted** | Neon dashboard | MongoDB Atlas |
| **Already cloud-hosted?** | ✅ Yes — Neon is cloud only | ✅ Yes — Atlas is cloud only |
| **Any changes needed?** | Just add `DATABASE_URL` to Render | Just add `MONGO_URI` to Render |
| **Connection string format** | `postgresql://user:pass@host/db` | `mongodb+srv://user:pass@cluster/db` |

Both Neon and MongoDB Atlas are already running in the cloud — you were connecting to them from your local machine during development. When you deploy to Render, your server connects to the same databases using the same connection strings. Nothing changes in the database itself.

## Final Architecture

After deployment your full application looks like this:

```
Users (anywhere in the world)
        ↓
  React Frontend
  (Vercel — static hosting)
        ↓  HTTPS requests to deployed API URL
  Node / Express REST API
  (Render — running Node process)
        ↓
  Database
  (Neon — PostgreSQL  OR  MongoDB Atlas — MongoDB)
```

All three layers are now running in the cloud, connected by public URLs, and accessible from anywhere in the world.

### Your Deployed URLs

| Part | Platform | Example URL |
|------|----------|------------|
| Frontend | Vercel | `https://notes-app.vercel.app` |
| Backend API | Render | `https://notes-api.onrender.com` |
| Database | Neon / Atlas | Connection string (not a public URL) |

When all three layers are deployed and connected, you now have a **fully deployed full-stack application**.

## Deployment Checklist

Use this before every deployment to make sure nothing is missed:

- [ ] `.env` is listed in `.gitignore`
- [ ] No secrets are hardcoded in your code
- [ ] `package.json` has a `start` script
- [ ] Server uses `process.env.PORT || 3000`
- [ ] All environment variables are added to Render dashboard
- [ ] `NODE_ENV` is set to `production` in Render
- [ ] CORS is configured to allow your deployed frontend URL
- [ ] Frontend environment variable points to deployed API URL
- [ ] Frontend redeployed after updating API URL
