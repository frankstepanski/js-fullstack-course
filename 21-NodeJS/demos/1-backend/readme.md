# Pure Node HTTP Server

A simple HTTP server built with **Node's built-in `http` module** — no Express, no frameworks, no dependencies.

This is a learning project that shows how a web server works at its most basic level before adding libraries that abstract it away.

## Why pure Node and not Express?

Express is built on top of Node's `http` module. Learning pure Node first means you understand what Express is actually doing under the hood — routing, responses, headers — instead of just following magic.

## Requirements

- Node.js **v18 or higher** (required for `--watch` flag and ES module support)

Check your version:
```bash
node -v
```

## Getting Started

Clone or download the project, then:

```bash
npm run dev
```

When the server starts you should see:

```
🚀 Server running at http://localhost:3000
   GET  http://localhost:3000/api/health
   GET  http://localhost:3000/api/user
   GET  http://localhost:3000/api/product
   GET  http://localhost:3000/api/weather
   POST http://localhost:3000/api/message  ← use Postman/Insomnia/curl
```

## Project Structure

```
├── server.js       — The HTTP server and all routes
├── package.json    — Project config and npm scripts
└── README.md       — You are here
```

## npm Scripts

| Script | Command | What it does |
|---|---|---|
| `npm start` | `node server.js` | Runs the server normally |
| `npm run dev` | `node --watch server.js` | Runs the server and auto-restarts on file save |

## Routes

All routes are prefixed with `/api`. This is a convention that makes it clear which URLs are API endpoints. It also prevents clashes if you ever add a frontend to the same server, and makes versioning easier later (e.g. `/api/v2/user`).

| Method | Route | Description | Returns |
|---|---|---|---|
| GET | `/api/health` | Confirms the server is running | `{ status }` |
| GET | `/api/user` | Returns a fake user | `{ id, name, email, age }` |
| GET | `/api/product` | Returns a fake product | `{ id, name, price, inStock }` |
| GET | `/api/weather` | Returns a fake weather report | `{ city, temperature, unit, condition }` |
| POST | `/api/message` | Pretends to save a message | `{ success, message, id, createdAt }` |

## Testing the Routes

### GET routes — use your browser or curl

You can open GET routes directly in your browser:
```
http://localhost:3000/api/user
```

Or with curl in your terminal:
```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/user
curl http://localhost:3000/api/product
curl http://localhost:3000/api/weather
```

### POST routes — use a tool

You cannot test POST requests in a browser URL bar. Use one of these:

| Tool | Type | Link |
|---|---|---|
| Postman | Desktop app | https://www.postman.com |
| Insomnia | Desktop app | https://insomnia.rest |
| Thunder Client | VS Code extension | Search in VS Code extensions |
| curl | Terminal | Built into Mac/Linux |

**curl example for POST:**
```bash
curl -X POST http://localhost:3000/api/message
```

**Postman / Insomnia steps:**
1. Create a new request
2. Set the method to `POST`
3. Set the URL to `http://localhost:3000/api/message`
4. Hit Send

## What This Project Teaches

- How Node's `http` module creates a server
- How to manually match routes using `method` and `url`
- How to send JSON responses with the correct headers
- What HTTP status codes mean (200, 201, 404, 500)
- Why the `/api` prefix is used as a convention
- The difference between a GET and POST request
- Why POST requests need a tool like Postman to test


## Troubleshooting

**Port already in use**
```
Error: listen EADDRINUSE :::3000
```
Another process is using port 3000. Either stop that process or change `const PORT = 3000` to another number like `3001`.

**Cannot use import statement**
```
SyntaxError: Cannot use import statement in a module
```
Make sure your `package.json` has `"type": "module"` in it.

**node --watch not working**
You're on Node 17 or below. Run `node -v` to check. Update Node or use `npm start` instead.
