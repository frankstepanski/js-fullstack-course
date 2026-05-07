# Understanding Node

## Prerequisites: Node Installation

You've already installed Node to use it with React — so you're likely good to go. Run this quick check to confirm:

```bash
node -v    # e.g. v22.12.0
npm -v     # e.g. 11.6.4
```

If both print version numbers, you're set. For this module, **Node 18+** is recommended (needed for the built-in `fetch()` used in examples).

**Need to install or update?** Use the version manager for your OS:

| OS | Tool | Link |
|---|---|---|
| macOS / Linux | nvm | [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm) |
| Windows | nvm-windows | [github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows) |

> ⚠️ These are two separate projects — `nvm` will not work on Windows. Windows users should also use **PowerShell or Command Prompt**, not Git Bash, when running nvm-windows commands.

## Running Node Code

You've already run Node scripts before — this is just a quick reminder:

```bash
node app.js       # runs a file directly
node              # opens the interactive REPL (type .exit or Ctrl+C twice to quit)
```

No browser, no HTML — just your script and terminal output. The REPL is handy for quickly testing a snippet without creating a file.

## npm and package.json

You've used npm and package.json already with React — the same concepts apply here. Quick recap:

| Command | What it does |
|---|---|
| `npm init -y` | Creates a `package.json` in the current folder |
| `npm install <package>` | Installs a package and saves it to `dependencies` |
| `npm install <package> --save-dev` | Installs a dev-only tool (e.g. `nodemon`) to `devDependencies` |
| `npm install` | Installs all dependencies listed in `package.json` (e.g. after cloning a repo) |
| `npm run <script>` | Runs a script defined in the `scripts` section of `package.json` |

`package.json` tracks your project's name, version, scripts, and dependencies. `node_modules/` should always be in `.gitignore` — anyone cloning your project can restore it with `npm install`.

## What is Node?

Node (often called "Node.js") is a **runtime** — a platform that lets you run JavaScript **outside the browser**.

Originally, JavaScript could only run **inside** a web browser (like Chrome or Firefox) to make web pages interactive. Then around 2009, Ryan Dahl created Node.js by taking **Google's V8 JavaScript engine** (the thing Chrome uses to run JS) and wrapping it so JavaScript could run on a computer or a server — **not just in the browser**.

So you can think of Node as:

> "JavaScript, but now it can do server stuff."

That means JavaScript can now:
- read/write files
- listen for HTTP requests
- talk to databases
- run background jobs
- power APIs

All with the same language you already know.

## Backstory of Node

Before **Node.js**, JavaScript lived entirely inside the browser. It was used for:
- Adding interactivity to web pages (buttons, forms, dropdowns)
- Manipulating the **DOM** (Document Object Model)
- Responding to user actions like clicks or scrolls

That meant developers used **different languages** for each part of a web app:
- JavaScript for the **frontend**
- PHP, Ruby, Python, Java, or .NET for the **backend**

### The Problem

This created a big gap between frontend and backend development:
- Developers had to switch languages, tools, and even mental models between the client and server sides.
- Code couldn't easily be shared between browser and server.
- Collaboration slowed down because frontend and backend teams spoke "different languages."

### The Idea That Changed Everything

In 2009, **Ryan Dahl** had a breakthrough idea:  
> "What if we could run JavaScript outside the browser — on the server?"

He built **Node.js** using Google Chrome's **V8 JavaScript engine**, the same engine that powers Chrome's lightning-fast JS execution.  
This meant JavaScript could now:
- Read and write files on the server  
- Handle HTTP requests and responses  
- Communicate with databases  
- Perform asynchronous tasks efficiently — all without blocking other work  

### The Result

Node effectively **unified web development**:
- One language for both **frontend and backend**  
- Shared code and libraries between browser and server  
- Simpler workflows and faster development cycles  

This allowed teams to use JavaScript for the entire web stack — which drastically reduced friction between developers working on the frontend and those building the backend.

## What You Already Know (From Frontend)

You've already built frontend apps using **JavaScript** and likely **React**.  
In those apps you've:

- Called **APIs** using `fetch()`.
- Worked with **Promises** and **async/await**.
- Used `useEffect` in React to load data.
- Updated the **DOM** with the results.

So you already know the **client side** of the story:
- **Client** = the browser = asks for data
- **Server** = machine somewhere = sends data back

Node is how we build that **server** part with JavaScript.

## What Does the Server Do?

When we talk about the **server**, we're referring to the part of an application that runs behind the scenes — the engine that powers everything users see and interact with in the browser.

While the browser (the **client**) handles displaying pages, forms, and buttons, the **server** handles all the logic, data processing, and communication with other systems.  
In short: the **browser asks**, and the **server responds**.

```
  Browser (Client)               Server (Node.js)
  ─────────────────              ──────────────────────────
  User clicks "Login"
        │
        │  POST /api/login ──────────►  Receives request
        │  (username + password)        Checks credentials
        │                               Queries database
        │                               Hashes & validates
        │◄─────────────── 200 OK ──────  Sends back token
        │  (session token)
  Stores token, redirects
```

Every time you use a web app — logging in, loading a feed, submitting a form — a request travels to a server and a response comes back. Node is what handles that server side.

### 1. Authenticating Users

One of the most important jobs of a server is managing **user authentication** — verifying who someone is.

Examples include:
- Logging in users with a username and password.
- Validating tokens or cookies to maintain secure sessions.
- Handling OAuth or third-party logins (e.g., "Login with Google").
- Hashing passwords before storing them in a database (for security).

The server ensures that sensitive information (like passwords or access tokens) is never exposed to the browser. Instead, the browser only receives a confirmation or a secure session token.

### 2. Running Scheduled or Background Tasks

Servers often perform **automated jobs** that don't involve direct user interaction. These tasks might include:

- Sending daily or weekly email notifications.  
- Cleaning up unused data or expired sessions.  
- Backing up databases or syncing data between systems.  
- Running cron jobs or maintenance scripts at specific times.

Because Node.js supports asynchronous operations, it's especially good at scheduling and executing background tasks without blocking other processes.

### 3. Providing APIs 

Servers act as **data providers** through APIs. A REST API allows clients (like browsers, mobile apps, or other servers) to access resources through endpoints.

Example endpoints might include:
- `GET /api/users` → get a list of users  
- `POST /api/login` → authenticate a user  
- `GET /api/products` → retrieve all products  

When a request hits an endpoint:
1. The server receives the request.
2. It runs the necessary logic (fetch data, apply filters, validate permissions).
3. It sends back a **response**, usually in **JSON** format.

This separation of concerns makes modern web apps modular — the frontend just consumes the data, while the backend manages it.

### 4. Talking to Databases

A huge part of the server's job is communicating with databases to store and retrieve information.  
Common databases include:
- **MongoDB** (NoSQL document database)
- **PostgreSQL** and **MySQL** (relational databases)
- **Redis** (for caching or temporary storage)

Servers send database queries — for example, "find all users where `active = true`" — and send the results back to the client.  
This keeps the data centralized, secure, and consistent across all users.

### 5. Securing Data and Enforcing Rules

Servers protect sensitive operations that the client should never handle directly, such as:
- Validating user permissions (e.g., only admins can delete data).  
- Hiding API keys or environment variables.  
- Preventing unauthorized users from accessing restricted endpoints.  
- Filtering or sanitizing data before saving it to prevent SQL injection or XSS attacks.

The browser can make requests, but the server decides **what** data can be seen and **by whom**.

## What Is a Module in Node?

In Node.js, a **module** is a reusable piece of code that can be imported and used in other files.  
Modules help keep code organized, easier to maintain, and more readable — just like how functions keep code DRY (Don't Repeat Yourself).

Everything in Node is modular.  

There are three main kinds of modules:

1. **Core modules** – Built into Node (e.g., `fs`, `os`, `path`, `http`).
2. **Local modules** – Custom modules you create yourself.
3. **Third-party modules** – Installed from npm (e.g., `express`, `dotenv`, `chalk`).

> 📦 **Throughout this section, all examples use ES Module syntax (`import`/`export`)** — the same syntax you already use in React. To enable this in Node, make sure your `package.json` includes:
> ```json
> {
>   "type": "module"
> }
> ```
> This tells Node to treat all `.js` files in your project as ES Modules. You only need to add this once per project.

---

### The Three Types of Modules — In Depth

#### 1. Core Modules

Core modules are **built directly into Node.js** — you don't install anything, they just exist. Think of them as Node's standard library.

Some common ones you'll use regularly:

| Module | What it does |
|--------|--------------|
| `fs` | Read and write files on the server |
| `path` | Work with file paths in a cross-platform way |
| `http` | Create HTTP servers |
| `os` | Get info about the operating system |
| `crypto` | Hashing, encryption, and security |

You import them the same way you'd import anything else — Node just knows they're built-in:

```js
import fs from "fs/promises";
import path from "path";
```

There's no install step, no `package.json` entry, no `node_modules` folder. They ship with Node itself.

---

#### 2. Local Modules

Local modules are **files you create yourself** — your own reusable code that you split across files to keep things organized.

For example, instead of writing all your database logic, route handlers, and utility functions in one giant file, you split them:

```
project/
├── app.js
├── utils/
│   └── formatDate.js
├── models/
│   └── user.js
└── routes/
    └── auth.js
```

Each of those files is a local module. You import them using a **relative path** (a path that starts with `./` or `../`):

```js
import { formatDate } from "./utils/formatDate.js";
import { User } from "./models/user.js";
```

The `./` is what tells Node: "look for this file locally, not in node_modules." Note that with ES Modules in Node, you need to include the `.js` file extension in your import path.

---

#### 3. Third-Party Modules

Third-party modules are packages **built by other developers** and published to the npm registry. You install them with `npm install`, and they get saved into your `node_modules` folder.

```bash
npm install express
npm install dotenv
npm install chalk
```

Once installed, you import them **without** a `./` — just the package name:

```js
import express from "express";
import dotenv from "dotenv";
```

Node knows that if there's no `./`, it should look inside `node_modules` for the package.

---

### This Is the Same Pattern You Already Know from the Frontend

If any of this feels familiar — it should. **The module system in Node maps almost exactly to what you've already been doing in React.** The concepts are identical; only the terminology and tools shift slightly.

Here's a side-by-side comparison:

| Concept | Frontend (React) | Backend (Node.js) |
|---|---|---|
| **Built-in language features** | Browser APIs (e.g., `document`, `fetch`, `localStorage`) | Core modules (e.g., `fs`, `path`, `http`) |
| **Files you create yourself** | `.js` / `.jsx` components and utility files | Local modules (`.js` files you write) |
| **Code from the community** | npm packages (`react`, `axios`, `lodash`) | npm packages (`express`, `dotenv`, `chalk`) |
| **How you install third-party code** | `npm install` | `npm install` |
| **How you import third-party code** | `import axios from "axios"` | `import express from "express"` |
| **How you import your own files** | `import MyComponent from "./MyComponent"` | `import { utils } from "./utils.js"` |
| **Where packages live** | `node_modules/` | `node_modules/` |
| **What tracks dependencies** | `package.json` | `package.json` |

#### Third-Party Modules ↔ npm Packages (Frontend)

On the frontend, when you want to use a library someone else built — say, `axios` for HTTP requests or `date-fns` for formatting dates — you run:

```bash
npm install axios
```

Then in your React file:

```js
import axios from "axios";
```

On the backend in Node, it's the same idea — install a package, import it, use it. A common example is `express`, the package you'll use to build APIs:

```bash
npm install express
```

```js
import express from "express";
```

Same registry. Same install command. Same `node_modules` folder. Same syntax. The difference is just what the package *does* — `axios` manipulates HTTP requests in the browser, `express` creates a web server on the backend.

#### Local Modules ↔ Your Own `.js` Files (Frontend)

On the frontend, you create components and utilities all the time:

```js
// utils/formatCurrency.js
export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}
```

```js
// SomeComponent.jsx
import { formatCurrency } from "./utils/formatCurrency";
```

In Node, it's the same idea — you break your code into files and import them where you need them:

```js
// utils/formatCurrency.js
export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}
```

```js
// app.js
import { formatCurrency } from "./utils/formatCurrency.js";
```

Same pattern, same syntax. The only Node-specific detail is the `.js` extension in the import path — ES Modules in Node require it.

#### The Key Difference: What the Code Can *Do*

The module system works the same way on both sides. The difference is in what the modules have access to:

- **Frontend modules** run in the browser — they can touch the DOM, read `localStorage`, respond to click events, but they cannot access the file system or make direct database calls.
- **Node modules** run on the server — they can read and write files, open network connections, query databases, but there's no DOM, no `window` object, no browser APIs.

> Think of it this way: **the import/export system is the same road. The vehicles (browser vs. Node APIs) are different.**

---

### Node Modules vs Browser JavaScript Files

Before Node, you wrote JavaScript to run in the browser — typically by linking a `.js` file in an HTML page:

```html
<script src="main.js"></script>
```

In that setup:

- All scripts share the same global scope (`window` object).
- If two files define the same variable, one can accidentally overwrite the other.
- Code runs only after the page loads in the browser.
- You can't access local files, your file system, or create servers — for security reasons.

---

### How Node.js Changes This

In Node:

- Each file is its own module — it has its own private scope.
- Nothing is shared automatically; you must explicitly export or import values.
- Code runs directly in the Node runtime, not in the browser.
- You can read and write files, connect to databases, or start web servers.

In the browser, your code interacts with the **DOM**.  
In Node, your code interacts with the **system** and the **network**.

---

### A Note on CommonJS (the Old Way)

You may come across older Node.js code or tutorials that use `require()` and `module.exports`. This is called **CommonJS**, and it's the original module system Node shipped with:

```js
const fs = require("fs");
module.exports = { ... };
```

You don't need to write this — but it's worth recognising when you see it. **We'll be using ES Modules (`import`/`export`) throughout this course**, which is the modern standard and the same syntax you already know from React.

### Creating a Simple Custom Module

Here's what a local module looks like with ES Module syntax:

#### Step 1: Create a file called `mathUtils.js`
```js
// mathUtils.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

#### Step 2: Import and use it in another file
```js
// app.js
import { add, subtract } from "./mathUtils.js";

console.log(add(5, 3));      // 8
console.log(subtract(10, 4)); // 6
```

When you use `import`, Node finds that file, runs it, and gives you back whatever was exported.

---

### ES Modules — Setup and Syntax

**ES Modules (ECMAScript Modules)** are the official JavaScript standard for organizing and sharing code between files. They were introduced in the **ES6 (ECMAScript 2015)** specification and are the native way to handle modules in both browsers and modern Node.js.

They use `import` and `export` keywords — the same syntax you already know from React.

### Enabling ES Modules in Node

To use ES Modules in a Node project, add `"type": "module"` to your `package.json`:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module"
}
```

That's it. Once this is set, every `.js` file in your project is treated as an ES Module and you can use `import`/`export` freely.

> ⚠️ **Don't forget the `.js` extension** when importing local files in Node. Unlike on the frontend (where bundlers like Vite handle this for you), Node requires the full filename:
> ```js
> import { add } from "./mathUtils.js";  // ✅ correct
> import { add } from "./mathUtils";     // ❌ will throw an error
> ```

### Why ES Modules?

Here's why ES Modules are the right choice for modern Node development:

- ✅ **Standardized:** ES Modules are part of the JavaScript language spec — same syntax in the browser and in Node.
- 🧩 **Familiar:** It's the exact same `import`/`export` syntax you already write in React.
- ⚙️ **Static Analysis:** Editors and tools can detect imports before runtime, giving you better autocomplete and error catching.
- 🚀 **Future-Proof:** All modern frameworks (React, Vite, Next.js, Svelte, Astro) are built around ES Modules.

### Quick Comparison

| Feature | CommonJS (`require`) — legacy | ES Modules (`import/export`) — use this |
|----------|----------------------|------------------------------|
| Introduced In | Node.js (2009) | ECMAScript 2015 (ES6) |
| Syntax | `const x = require('x')` | `import x from 'x'` |
| Exports | `module.exports = {}` | `export` / `export default` |
| Works in Browser | ❌ No | ✅ Yes |
| Same as React syntax | ❌ No | ✅ Yes |
| Recommended | ❌ Legacy codebases only | ✅ All new projects |

## Reading and Writing Files

One of the most powerful things Node can do that the **browser never could** is read and write files directly on your computer or server. This is one of the first places where Node starts to feel meaningfully different from frontend JavaScript.

### Why Would You Read or Write Files?

On the backend, files are everywhere. Here are real situations you'll encounter:

| Scenario | What's happening |
|---|---|
| Saving a user's uploaded profile picture | Writing a file to the server |
| Loading app configuration on startup | Reading a `.json` or `.env` file |
| Generating a PDF or CSV report | Creating and writing a new file |
| Logging errors to a file | Appending text to a log file |
| Reading a template to send an email | Reading an HTML file from disk |
| Storing data without a database | Reading and writing a JSON file |

You can't do any of this from the browser — it would be a massive security risk if any website could just read files off your computer. But on the server, **you're in control**, so Node gives you full access.

---

### The `fs` Module

File reading and writing in Node is handled by the **`fs` module** (short for "file system"). This is one of Node's built-in core modules — no install needed.

```js
const fs = require("fs");
```

Or with ES Modules:

```js
import fs from "fs/promises";
```

There are two ways to use `fs`:

| Style | How it works | When to use it |
|---|---|---|
| `fs` (callback style) | Old-school — passes a function that runs when done | Older codebases |
| `fs.promises` | Returns a Promise — works with `async/await` | Modern Node — use this |

> 💡 **Stick with `fs.promises`** — it works with `async/await` just like `fetch()` does, so the pattern will feel familiar.

---

### This Is an Asynchronous Operation

Reading and writing files takes time. Your code has to reach out to the hard drive, wait for it to respond, and get the data back. This is slow compared to just running JavaScript in memory.

If Node stopped and waited every time it touched a file, your entire server would freeze for every other user while one file was being read. That's obviously bad.

So **file operations in Node are asynchronous** — Node kicks off the file read or write, then keeps doing other work until the file is ready. This is the exact same idea as calling a `fetch()` API and waiting for the response.

```
Your Code                          Hard Drive
──────────                         ──────────
"Hey, read notes.txt"  ──────────► starts reading...
                                   ...
(Node keeps running other code)    ...
                                   ...
◄──────────────────── "Here's the data!"
"Got it, now I'll use it"
```

This is why file operations use **Promises** and `async/await` — same as `fetch()`.

---

### Reading a File

Let's say you have a file called `notes.txt` with some text in it. Here's how you read it:

```js
// read.js
import fs from "fs/promises";

async function readNote() {
  try {
    const content = await fs.readFile("notes.txt", "utf8");
    console.log("Here's what's in the file:");
    console.log(content);
  } catch (error) {
    console.error("Couldn't read the file:", error.message);
  }
}

readNote();
```

Run it:

```bash
node read.js
```

A few things to notice:

- `await fs.readFile(...)` — just like `await fetch(...)`, this pauses *that function* until the file is ready, without blocking the rest of Node.
- `"utf8"` — this tells Node to give you back a readable string instead of raw binary data. Always include this when reading text files.
- The `try/catch` handles errors — for example, if the file doesn't exist.

---

### Writing a File

Writing a file is just as simple:

```js
// write.js
import fs from "fs/promises";

async function saveNote() {
  const note = "Don't forget to build something cool with Node.";

  try {
    await fs.writeFile("notes.txt", note, "utf8");
    console.log("Note saved!");
  } catch (error) {
    console.error("Couldn't save the file:", error.message);
  }
}

saveNote();
```

> ⚠️ `writeFile` **replaces** the file completely if it already exists. If you want to **add** to an existing file without overwriting it, use `appendFile` instead (see below).

---

### Appending to a File

If you want to keep adding content to a file (like writing to a log), use `appendFile`:

```js
// append.js
import fs from "fs/promises";

async function addLog() {
  const entry = `[${new Date().toISOString()}] Server started\n`;

  try {
    await fs.appendFile("server.log", entry, "utf8");
    console.log("Log entry added.");
  } catch (error) {
    console.error("Couldn't write to log:", error.message);
  }
}

addLog();
```

Each time you run this, a new line gets added to `server.log` — the old content stays.

---

### Read, Modify, Write — A Real Pattern

A very common real-world task: read a JSON file, update it, and save it back. This is essentially a tiny database using a file:

```js
// update-data.js
import fs from "fs/promises";

async function addUser(newUser) {
  try {
    // 1. Read the existing file
    const raw = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(raw); // turn the string into a JS array

    // 2. Make your change
    users.push(newUser);

    // 3. Write it back
    await fs.writeFile("users.json", JSON.stringify(users, null, 2), "utf8");
    console.log("User added!");
  } catch (error) {
    console.error("Something went wrong:", error.message);
  }
}

addUser({ id: 3, name: "Maya" });
```

This pattern — **read → parse → modify → write** — shows up constantly in real backend code.

---

### Quick Reference

| Task | Method | Overwrites? |
|---|---|---|
| Read a file | `fs.readFile("file.txt", "utf8")` | — |
| Create or overwrite a file | `fs.writeFile("file.txt", data, "utf8")` | ✅ Yes |
| Add to the end of a file | `fs.appendFile("file.txt", data, "utf8")` | ❌ No |
| Delete a file | `fs.unlink("file.txt")` | ✅ Deletes it |
| Check if a file exists | `fs.access("file.txt")` | — |

All of these return Promises — wrap them in `async/await` with a `try/catch` and you're good to go.

---

> 💡 **Coming up:** Once you start building APIs with Express, you'll use this same `fs` knowledge to read config files, write logs, and handle uploaded files on the server.

---

## Scheduled and Background Tasks

So far, everything you've written in Node runs once and stops — you run the file, it does something, it exits. But real backend applications often need to do things **automatically, on a timer**, without anyone pressing a button.

That's what scheduled and background tasks are for.

---

### What Are Background Tasks?

A **background task** is code that runs on its own schedule — not triggered by a user clicking something, but by time. Think of it like setting an alarm: you set it once, and it goes off whenever you told it to.

Here are real examples of this in production apps:

| Task | How often |
|---|---|
| Send a "weekly digest" email to users | Every Monday at 9am |
| Clean up expired login sessions | Every night at midnight |
| Back up the database | Every day at 3am |
| Check an external API for new data | Every 5 minutes |
| Generate a usage report | First day of every month |
| Delete log entries older than 30 days | Every Sunday |

None of these need a user. They just need Node to be running, and a schedule to follow.

---

### Two Ways to Schedule Tasks in Node

```
┌─────────────────────────────────────────────────────┐
│             Scheduling in Node.js                   │
│                                                     │
│   Built-in (no install)      Third-party (npm)      │
│   ─────────────────────      ───────────────────    │
│   setTimeout()               node-cron              │
│   setInterval()              node-schedule          │
│                              agenda                 │
│                                                     │
│   Good for: simple delays    Good for: real         │
│   and repeating loops        clock-based schedules  │
│   ("every 5 seconds")        ("every Mon at 9am")   │
└─────────────────────────────────────────────────────┘
```

You already know `setTimeout` and `setInterval` from the frontend — they work exactly the same in Node. For anything more precise (like "run this every Tuesday at 2pm"), you'll reach for a package like `node-cron`.

---

### Example 1: Repeating Tasks with `setInterval`

`setInterval` runs a function repeatedly on a fixed delay. This is the simplest kind of background task — a **heartbeat**.

```js
// heartbeat.js

let count = 0;

console.log("Server started. Heartbeat running...");

setInterval(() => {
  count++;
  const now = new Date().toLocaleTimeString();
  console.log(`[${now}] ❤️  Heartbeat #${count} — server is alive`);
}, 3000); // runs every 3 seconds
```

Run it:

```bash
node heartbeat.js
```

You'll see something like:

```
Server started. Heartbeat running...
[10:04:01 AM] ❤️  Heartbeat #1 — server is alive
[10:04:04 AM] ❤️  Heartbeat #2 — server is alive
[10:04:07 AM] ❤️  Heartbeat #3 — server is alive
```

It keeps going until you press `Ctrl + C` to stop it.

> 💡 Real servers use heartbeats to confirm they're still running. Monitoring tools ping the server every few seconds — if the heartbeat stops, an alert fires.

---

### Example 2: One-Time Delayed Task with `setTimeout`

`setTimeout` runs something **once**, after a delay. Useful for "do this thing shortly after something else happens."

```js
// welcome-email.js

function sendWelcomeEmail(username) {
  console.log(`📧 Sending welcome email to ${username}...`);
  // In a real app, you'd call your email service here
}

function onUserSignUp(username) {
  console.log(`✅ ${username} just signed up!`);

  // Wait 5 seconds, then send the welcome email
  // (simulating a slight delay so the signup completes first)
  setTimeout(() => {
    sendWelcomeEmail(username);
  }, 5000);

  console.log("Signup complete. Welcome email will be sent shortly.");
}

onUserSignUp("Maya");
```

Output:

```
✅ Maya just signed up!
Signup complete. Welcome email will be sent shortly.
📧 Sending welcome email to Maya...   ← appears 5 seconds later
```

Notice that **"Signup complete"** prints before the email sends — Node didn't stop and wait. It scheduled the email and kept going. That's async in action.

---

### Example 3: Cron Jobs with `node-cron`

`setInterval` is great for "every X milliseconds" — but what about "every day at midnight" or "every Monday at 9am"? For that, you need **cron syntax**, and the `node-cron` package makes it easy.

First, install it:

```bash
npm install node-cron
```

#### Understanding Cron Syntax

Cron uses a short string of 5 values to describe a schedule. It looks cryptic at first, but once you understand the positions it becomes readable:

```
┌─────────────── minute       (0–59)
│   ┌─────────── hour         (0–23)
│   │   ┌─────── day of month (1–31)
│   │   │   ┌─── month        (1–12)
│   │   │   │   ┌─ day of week (0–6, Sunday = 0)
│   │   │   │   │
*   *   *   *   *
```

A `*` means "every" — so `* * * * *` means "every minute of every hour of every day."

Here are some common examples:

| Cron string | When it runs |
|---|---|
| `* * * * *` | Every minute |
| `*/5 * * * *` | Every 5 minutes |
| `0 * * * *` | Every hour, on the hour |
| `0 9 * * *` | Every day at 9:00am |
| `0 0 * * *` | Every day at midnight |
| `0 9 * * 1` | Every Monday at 9:00am |
| `0 3 * * 0` | Every Sunday at 3:00am |
| `0 0 1 * *` | First day of every month at midnight |

#### Basic Example: Run a task every minute

```js
// cron-basic.js
import cron from "node-cron";

console.log("Scheduler started...");

cron.schedule("* * * * *", () => {
  const now = new Date().toLocaleTimeString();
  console.log(`[${now}] 🔄 Running scheduled task...`);
});
```

```bash
node cron-basic.js
```

This will print a message every minute, on the minute, for as long as Node is running.

#### Real Example: Daily cleanup at midnight

```js
// cleanup.js
import cron from "node-cron";
import fs from "fs/promises";

// Runs every day at midnight: "0 0 * * *"
cron.schedule("0 0 * * *", async () => {
  console.log("🧹 Running nightly cleanup...");

  try {
    // Clear the contents of the log file
    await fs.writeFile("server.log", "", "utf8");
    console.log("✅ Log file cleared.");
  } catch (error) {
    console.error("❌ Cleanup failed:", error.message);
  }
});

console.log("Cleanup job scheduled. Runs every night at midnight.");
```

This combines everything from the last two sections — a scheduled task that uses `fs` to work with a file. Notice it uses `async` in the callback because `fs.writeFile` is async.

---

### Example 4: Putting It All Together — Log Rotation

Here's a more complete real-world example: a **log rotation** script. Every Sunday at 3am it reads the current log file, saves it as an archive with today's date, then clears the main log so it starts fresh.

```js
// log-rotation.js
import cron from "node-cron";
import fs from "fs/promises";

async function rotateLogs() {
  const timestamp = new Date().toISOString().split("T")[0]; // e.g. "2025-04-14"
  const archiveName = `logs/archive-${timestamp}.log`;

  try {
    // 1. Read the current log
    const currentLog = await fs.readFile("server.log", "utf8");

    if (!currentLog.trim()) {
      console.log("📋 Log is empty — nothing to archive.");
      return;
    }

    // 2. Save it as an archive
    await fs.writeFile(archiveName, currentLog, "utf8");
    console.log(`📦 Log archived as ${archiveName}`);

    // 3. Clear the main log file
    await fs.writeFile("server.log", "", "utf8");
    console.log("✅ Main log cleared. Fresh start.");

  } catch (error) {
    console.error("❌ Log rotation failed:", error.message);
  }
}

// Every Sunday at 3:00am
cron.schedule("0 3 * * 0", rotateLogs);

console.log("📅 Log rotation scheduled for every Sunday at 3am.");
```

Here's what happens each Sunday at 3am:

```
📅 Log rotation scheduled for every Sunday at 3am.

── Sunday 3:00am ──────────────────────────────────────
📦 Log archived as logs/archive-2025-04-13.log
✅ Main log cleared. Fresh start.
```

---

### Quick Reference

| Tool | Install needed? | Best for |
|---|---|---|
| `setTimeout` | ❌ Built-in | Run something once after a delay |
| `setInterval` | ❌ Built-in | Repeat something every X milliseconds |
| `node-cron` | ✅ `npm install node-cron` | Clock-based schedules ("every Monday at 9am") |

---

> 💡 **Keep in mind:** Scheduled tasks only run while your Node process is running. If your server restarts, the tasks restart too — which is usually fine. For very large-scale apps, dedicated job queue tools like **Bull** or **Agenda** give you more control, but `node-cron` is the right starting point for most projects.

---

## Asynchronous Operations in Node 

When you're building frontend applications, you've already used `fetch()` to call APIs and update the DOM.  
That model works because the browser manages things like CORS, cookies, and rendering.

But in **Node**, you're not limited to the browser's sandbox — you can perform asynchronous operations at the system level:
- Read or write files  
- Make API requests to any domain  
- Query databases  
- Listen for network connections  
- Stream large files or data in real-time  

Node gives you full control of how asynchronous work happens — with no browser restrictions.

### Example: Fetching Data in Node vs Browser

Let's say you want to get the current weather for a city using the **Open-Meteo API**.  
Here's how you might do that in both environments.

#### 🖥️ In the Browser
```js
fetch("https://api.open-meteo.com/v1/forecast?latitude=40.7&longitude=-74.0&current_weather=true")
  .then(res => res.json())
  .then(data => console.log("Temperature:", data.current_weather.temperature))
  .catch(err => console.error(err));
```

The browser automatically handles:
- Networking (no setup needed)
- CORS policies
- JSON parsing
- Rendering results to the UI  

#### 💻 In Node (Command Line)
Starting from Node 18, `fetch()` is available globally (no need for an extra library).  
You can use it the same way, but with system-level control — no DOM, no window, no rendering.

Create a file called **weather.js**:

```js
// weather.js
const city = "New York";

async function getWeather() {
  try {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=40.7&longitude=-74.0&current_weather=true");
    const data = await response.json();
    console.log(`🌤️ Current temperature in ${city}: ${data.current_weather.temperature}°C`);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

getWeather();
```

Then run it in your terminal:
```bash
node weather.js
```

Unlike the browser version:
- There's **no DOM**, so you just log results to the console.
- You can use environment variables, file storage, or even write the results to a database.  
- You can integrate this with CRON jobs or other Node services — something browsers can't do.

Using `fetch()` is just one small example of how Node handles asynchronous behavior.  
Node's event-driven model means almost every task — from file reads to network requests — is handled **without blocking the main thread**.


Each example builds on the same idea: **Node can wait for slow operations (I/O, user input, or network calls) without stopping everything else.**

### Example: Reading and Writing to Files

Node can also do file I/O asynchronously. This is a big difference from browser JavaScript, which can't freely read and write files.

Let's make a tiny script that:

1. Asks the user for a note  
2. Saves it to a file (async write)  
3. Reads the file back (async read)  
4. Prints the contents  

> **Note:** This example uses ES Module syntax (`import`). Make sure your `package.json` includes `"type": "module"` before running it, or Node will throw a syntax error.

```js
// save-note.js
// Demonstrates async file write + read, triggered by user input

import readline from "readline";
import fs from "fs/promises"; // gives us Promise-based file methods

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Write a note to save: ", async (note) => {
  try {
    // ASYNCHRONOUS: write the note to a file
    await fs.writeFile("note.txt", note, "utf8");
    console.log("✅ Note saved to note.txt");

    // ASYNCHRONOUS: read the note back
    const contents = await fs.readFile("note.txt", "utf8");
    console.log("📄 File contents:", contents);
  } catch (err) {
    console.error("File error:", err.message);
  } finally {
    rl.close();
  }
});
```

In these examples, async happens when Node is waiting on something **outside of JavaScript**:

- waiting for the user to type  
- waiting for the network  
- waiting for the file system  

Node hands those jobs off to the underlying system (via the **event loop** and **libuv**) and then calls you back when it's ready — using **events** or **Promises**.

> **What is libuv?**  
> libuv is a C library bundled with Node that handles all the low-level, non-blocking I/O work — like reading files, making network requests, and managing timers. When Node needs to do something slow (like read a file from disk), it passes that task to libuv, which runs it in the background using the operating system. When the task finishes, libuv notifies the event loop, which then runs your callback or resolves your Promise. You never interact with libuv directly — it's just what makes Node's async model work under the hood.

You don't always have to create your own Promise with `new Promise(...)` — most of Node's APIs are already async for you.

Node.js has an event-driven, non-blocking I/O model that allows it to handle multiple operations simultaneously — like reading files, listening for user input, or waiting for HTTP responses — without freezing the main thread.

### How the Event Loop Works

The **event loop** is the engine that makes Node's async behavior possible. Here's the simplified picture:

```
   Your Code (JS)
        │
        │  starts async task (e.g. read a file)
        ▼
  ┌─────────────┐       ┌──────────────────────┐
  │  Event Loop │◄──────│  libuv / OS           │
  │             │       │  (does the slow work) │
  │  - timers   │       │  - file system        │
  │  - I/O      │       │  - network            │
  │  - callbacks│       │  - timers             │
  └─────────────┘       └──────────────────────┘
        │
        │  task done → runs your callback / resolves Promise
        ▼
   Your Code continues
```

The key insight: **Node never actually waits.** It hands off the slow work, keeps going, and comes back when the result is ready. That's why Node can handle thousands of simultaneous connections on a single thread.

The table below summarizes the most common types of asynchronous operations handled by Node, how they work, and where you might use them in real-world applications.

---

| **Type of Asynchronous Operation** | **Description** | **Node Mechanism** | **Common Use Case** |
|-----------------------------------|-----------------|--------------------|---------------------|
| **File System (I/O)** | Reading or writing files without blocking other tasks. | Non-blocking I/O via **libuv thread pool** | Reading config files, saving uploads |
| **Network Requests (HTTP)** | Making external API calls asynchronously. | **Event loop + async I/O** | Calling REST APIs, fetching data |
| **User Input (stdin / readline)** | Handling real-time user input from the terminal. | **Event emitters** | Command-line tools, interactive prompts |
| **Timers** | Scheduling code to run later without freezing the program. | **Timer phase of the event loop** | Scheduled jobs, timeouts, retries |
| **Streams** | Processing data in chunks asynchronously. | **Event-driven streams API** | Reading large files, handling network streams |
| **Server Requests** | Handling incoming requests asynchronously in a web server. | **Event emitters** | Building REST APIs, web servers |
| **Database Queries** | Executing queries without freezing the main thread. | **Async I/O through database drivers** | Reading/writing persistent data |

---

### Key Takeaways

- **Everything that waits** — files, network, user input, or timers — is asynchronous in Node.  
- Node's **event loop** and **libuv** handle most async operations under the hood.  
- You don't need to manually create Promises — most modern Node APIs are already Promise-based.  
- Understanding these patterns helps you write faster, non-blocking, and scalable applications.

---

✅ **In short:** Node's biggest strength is handling multiple tasks efficiently — from APIs to file systems — all without blocking the main thread.

## Digging Deeper with Promises in Node.js

When you start working in Node.js, you quickly run into situations where you need to do **more than one asynchronous task** — maybe call two APIs, read a file and a database, or hit two services and use whichever responds first. That's where **`Promise.all`** and **`Promise.race`** become super useful.

### 1. What's a Promise Again?

A **Promise** is a JavaScript object that represents something that will finish **in the future** (like a file read, API call, or database query).

In Node, lots of things return Promises:

- `fs.promises.readFile(...)`
- `fetch(...)` (Node 18+)
- Many database libraries
- Your own `async` functions

Instead of doing this:

```js
const data = await fs.readFile("file.txt", "utf8");
const user = await fetch("https://api.example.com/user/1");
```

…sometimes you want to do **both at the same time**. That's where `Promise.all` comes in.

---

### 2. `Promise.all` — Wait for Everything

#### What it does
- Takes an **array of Promises**
- Runs them **in parallel**
- Resolves when **all** of them are done
- Rejects if **any one** of them fails

This is perfect when your Node code needs **multiple pieces of data** before it can continue.

#### Example: Load two APIs at once

```js
// example-promise-all.js
const userPromise = fetch("https://jsonplaceholder.typicode.com/users/1");
const postsPromise = fetch("https://jsonplaceholder.typicode.com/posts?userId=1");

Promise.all([userPromise, postsPromise])
  .then(async ([userRes, postsRes]) => {
    const user = await userRes.json();
    const posts = await postsRes.json();

    console.log("User:", user.name);
    console.log("Posts count:", posts.length);
  })
  .catch((err) => {
    console.error("Something failed:", err);
  });
```

#### Why this is good in Node
- You don't waste time doing one request, **then** the other
- Node can handle many async tasks at once — this matches its strengths
- Good for **gathering data** for an API response

#### Node use cases
- Your API route needs data from **two different services** (auth service + product service)
- You want to read **multiple files** at the same time
- You want to kick off several background tasks and wait until they all finish

#### Example: Reading multiple files

```js
import fs from "fs/promises";

const files = ["a.txt", "b.txt", "c.txt"];

const readPromises = files.map((file) => fs.readFile(file, "utf8"));

Promise.all(readPromises)
  .then((contents) => {
    console.log("All files read:");
    console.log(contents);
  })
  .catch((err) => {
    console.error("Error reading files:", err);
  });
```

In this example, Node is reading all three files **at the same time**.

---

### 3. `Promise.race` — Use the First Result

#### What it does
- Takes an **array of Promises**
- Resolves or rejects as soon as **the first one** finishes
- Ignores the rest

This is useful when you want **the fastest response** or when you want to **enforce a timeout**.

#### Example: API with a timeout

Sometimes an external API is slow. In Node, you don't want to wait forever — you might want to fail fast or try something else.

```js
// example-promise-race.js

// A helper promise that rejects after X ms
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out")), ms);
  });
}

async function getData() {
  try {
    const response = await Promise.race([
      fetch("https://jsonplaceholder.typicode.com/todos/1"),
      timeout(3000), // 3 seconds
    ]);

    // If fetch wins the race, we get here
    const data = await response.json();
    console.log("Got data:", data);
  } catch (err) {
    // If timeout wins the race, we get here
    console.error("Error or timeout:", err.message);
  }
}

getData();
```

#### Why this is good in Node
- Node apps often call other services — you don't control how fast they are
- You can protect your server from **hanging** on slow dependencies
- You can try **multiple mirrors/endpoints** and use whichever responds first

#### Another example: 2 mirrors, pick the fastest

```js
const fast = fetch("https://mirror1.example.com/data");
const backup = fetch("https://mirror2.example.com/data");

Promise.race([fast, backup])
  .then((res) => res.json())
  .then((data) => console.log("Got fastest data:", data))
  .catch((err) => console.error("Both failed:", err));
```

This pattern is great for **high-availability** services.

---

### 4. When to Use Which?

| Situation | Use |
|-----------|-----|
| You need **all** results before continuing (e.g. two DB queries) | `Promise.all(...)` |
| You want to do things **at the same time** to speed things up | `Promise.all(...)` |
| You want to **race** a real task against a timeout | `Promise.race(...)` |
| You want **whichever service responds first** | `Promise.race(...)` |

---

### 💡 Why This Matters in Node

Node is built to handle lots of things happening at once — like reading files, calling APIs, or talking to databases — **without freezing or waiting**.  

Even though Node runs on **one main thread** (it doesn't create multiple threads like some languages do), it's very good at managing things that take time, like network requests or file reads. It does this by using something called the **event loop**, which keeps track of what's finished and what's still waiting.

So, while one task is waiting (like reading data from a file), Node can keep working on other things.  

- **`Promise.all`** lets Node do **several async tasks at once** — for example, reading three files or calling two APIs together — and wait until all of them are done.  
- **`Promise.race`** lets Node start several tasks but move on **as soon as one finishes** — like using whichever API responds first.

These tools make your code easier to read and faster because you're not doing one slow thing after another.  

---

✅ **In short:** Node's asynchronous power lets you do more at once — fetch data, read files, or contact other services — all without slowing your app down.

## Summary

Node.js allows JavaScript to move beyond the browser and into the server
environment. Instead of only manipulating the DOM or responding to user
clicks, JavaScript can now:

-   Run web servers
-   Handle HTTP requests and responses
-   Read and write files
-   Connect to databases
-   Perform background jobs
-   Secure and validate data

Node unified frontend and backend development by allowing developers to use the same language across the entire stack.

**Client-side UI logic → to server-side application logic**

The next step is applying this knowledge by building real servers and
APIs.

### Next Topics to Explore

#### 🌐 [Building a Server with Node's `http` Module](1-http-server.md)

Learn what a server actually is, how HTTP works at a low level, and how
to create a basic server using Node's built-in `http` module.

#### 🚀 [Building APIs with Express](2-express.md)

Learn how Express simplifies routing, middleware, and API development
— and how to structure real backend applications.

#### 🔗 [CORS — Connecting Your Frontend to Your Backend](3-cors.md)

Learn why the browser blocks cross-origin requests, what CORS errors mean,
and how to configure your Express server so your frontend can talk to your API.
