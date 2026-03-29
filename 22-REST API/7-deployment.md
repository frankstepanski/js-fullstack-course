
# Deploying a Node / Express REST API

So far you have done two important things:

1. Deployed a frontend React application that runs on the internet.
2. Built a backend REST API with Node and Express that runs locally and connects to your database.

Right now your setup looks like this during development:

```
React Frontend (localhost)
        ↓
Node / Express API (localhost)
        ↓
PostgreSQL Database (Neon cloud)
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

Unlike a React app, which becomes a static website, a Node/Express backend is a running server program.

That server must stay running so it can:

- receive HTTP requests
- process requests
- communicate with the database
- return responses to clients

Instead of running on your machine, the server runs on a **cloud hosting platform**.

Common backend hosting platforms include:

- [Render](https://render.com/)
- [Railway](https://railway.com/)
- [Fly.io](https://fly.io/)
- [DigitalOcean](https://www.digitalocean.com)

Once deployed, your API receives a **public URL**.

Example:

```
https://notes-api.onrender.com
```

This URL becomes the **base address for your REST API**, and your deployed React frontend will communicate with it just like a real production application.

## Before vs After Deployment

### Before Deployment (Development)

```
React (localhost:5173)
        ↓
API (localhost:3000)
        ↓
Database (Neon)
```

### After Deployment (Production)

```
Users
  ↓
React Frontend (Vercel)
  ↓
Node / Express API (Render)
  ↓
PostgreSQL Database (Neon)
```

Notice that after deployment:

- The **frontend runs on a hosting platform**
- The **backend runs on a cloud server**
- Both communicate using **public URLs**

## Development vs Production URLs

When you built your API locally, it likely ran on:

```
http://localhost:3000
```

Your frontend or API client may have called endpoints like:

```
http://localhost:3000/notes
```

When the API is deployed, the server runs on a **cloud host**, so the base URL changes.

Example:

```
https://notes-api.onrender.com/notes
```

> Your API routes **do not change**, only the **host address changes**.

## What Actually Happens During Backend Deployment

When you deploy a Node API using a platform like Render or Railway, the platform typically performs these steps:

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

Unlike React deployment, the platform does not serve static files. Instead it runs your **Node server process continuously**.

## Environment Variables in Backend Deployment

Your backend likely already uses **environment variables** for configuration.

Environment variables store values that may change depending on where your app is running.

| Variable | Purpose | Example |
|--------|--------|--------|
| PORT | The port your server runs on | 3000 |
| DATABASE_URL | Connection string for your database | Neon Postgres connection |
| FRONTEND_URL | The deployed frontend domain allowed by CORS | https://notes-app.vercel.app |

Example values:

```
PORT=3000
DATABASE_URL=your_neon_connection_string
FRONTEND_URL=https://notes-app.vercel.app
```

### Local Development

During development, environment variables are often stored in a file called:

```
.env
```

Example:

```
PORT=3000
DATABASE_URL=your_neon_connection_string
```

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

Local environment setup:

```
.env file
   ↓
Node / Express API
   ↓
Environment Variables Loaded
```

This works because your **local machine can read the `.env` file**.

### Production Deployment

When your backend is deployed to a cloud platform (Render, Railway, etc.), the platform **does not read your `.env` file**.

Instead, environment variables must be configured in the **deployment platform dashboard**.

| Platform | Where Variables Are Set |
|--------|--------|
| Render | Environment settings panel |
| Railway | Variables tab |
| Fly.io | Secrets configuration |

Example production variables:

| Variable | Value |
|--------|--------|
| PORT | 3000 |
| DATABASE_URL | Neon connection string |
| FRONTEND_URL | https://notes-app.vercel.app |

Your code **does not change**.

```js
process.env.DATABASE_URL
```

This allows the same backend code to run in both environments.

### Environment-Based Configuration

Most applications behave differently depending on whether they are running in development or production.

Node applications usually detect this using:

```js
process.env.NODE_ENV
```

Typical values:

| Environment | Value |
|------------|------|
| Development | development |
| Production | production |

Example configuration:

```js
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://notes-app.vercel.app"]
    : ["http://localhost:5173"];
```

This allows the same codebase to automatically adjust behavior depending on where it is running.

## ⚠️ CORS When Deploying

When your application is deployed, the frontend and backend usually run on **different domains**.

| Application Part | URL |
|------------------|-----|
| Frontend (React) | https://notes-app.vercel.app |
| Backend API | https://notes-api.onrender.com |

Because these domains are different, the browser treats them as **different origins**.

Browsers block requests between different origins unless the backend explicitly allows it.

This security rule is called **CORS (Cross-Origin Resource Sharing)**.

### Basic CORS Configuration

Your Express API can allow requests from the deployed frontend like this:

```js
app.use(cors({
  origin: "https://notes-app.vercel.app"
}))
```

### Development vs Production

During development, your frontend probably runs locally:

| Environment | Frontend URL |
|-------------|--------------|
| Development | http://localhost:5173 |
| Production | https://notes-app.vercel.app |

Example development configuration:

```js
app.use(cors({
  origin: "http://localhost:5173"
}))
```

### Supporting Both Environments

Many applications allow both environments.

```js
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://notes-app.vercel.app"
  ]
}))
```

This allows:

- Local development testing
- Production frontend communication

## Step-by-Step: Deploying Your Backend API

Most backend hosting platforms follow a similar process.

### Step 1 — Push Your Backend to GitHub

Your backend code should be committed and pushed to GitHub.

Example project structure:

```
backend/
  server.js
  package.json
  routes/
  controllers/
  services/
```

### Step 2 — Create a Backend Service

Create a new **Web Service** on a hosting platform such as:

- Render
- Railway
- Fly.io

Connect the service to your GitHub repository.

### Step 3 — Configure the Start Command

Your platform needs to know how to start your Node server.

Example:

```
npm install
npm start
```

or

```
node server.js
```

### Step 4 — Add Environment Variables

Configure required variables in the hosting dashboard.

Typical variables:

| Variable | Purpose |
|--------|--------|
| DATABASE_URL | Neon connection string |
| FRONTEND_URL | deployed frontend domain |
| PORT | server port (sometimes provided automatically) |

### Step 5 — Deploy the API

Once deployed, your API will receive a **public URL**.

Example:

```
https://notes-api.onrender.com
```

#### Updating Your Frontend API URL

Your React app must call the **deployed backend API** instead of localhost.

Before:

```
http://localhost:3000/notes
```

After:

```
https://notes-api.onrender.com/notes
```

This is usually handled with a frontend environment variable.

Example:

```
VITE_API_URL=https://notes-api.onrender.com
```

Your frontend code can then use:

```js
const API_URL = import.meta.env.VITE_API_URL;
```

## Final Architecture

After deployment your application should look like this:

```
Users
  ↓
React Frontend (Vercel)
  ↓
Node / Express REST API (Render)
  ↓
PostgreSQL Database (Neon)
```

When all three layers are deployed and connected, you now have a **fully deployed full‑stack application**.
