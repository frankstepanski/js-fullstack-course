// app.js

/**
 * Express application setup
 *
 * This file sets up the Express app:
 * - Middleware (CORS, JSON parsing)
 * - Routes
 * - 404 handler
 *
 * It does not start the server — that is handled by server.js.
 * The app is exported so server.js can import it and start listening.
 */

import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.js";

const app = express();

/**
 * Enable CORS
 *
 * Allows frontend running on a different port
 * Note: URL has to be exact; even adding a forward slash at the end will cause CORS errors
 */
app.use(cors({
  origin: "http://localhost:5173"
}));

/**
 * Built-in middleware
 * Automatically parses JSON request bodies
 */
app.use(express.json());

/**
 * Mount routers
 *
 * app.use("/notes", notesRouter) mounts the entire notes router under /notes.
 * Express combines the prefix here with the paths defined in the router:
 *
 *   app.js                           routes/notes.js
 *   ─────────────────────────────    ──────────────────────────
 *   app.use("/notes", notesRouter) → router.get("/")   → GET  /notes
 *                                    router.post("/")  → POST /notes
 *
 * Both GET and POST /notes are handled by a single line here —
 * no need to register each method separately in this file.
 */
app.use("/notes", notesRouter);


/**
 * 404 Handler
 *
 * Catches any request that did not match a route above.
 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;