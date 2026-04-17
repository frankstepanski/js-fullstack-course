// app.js

import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.js";
import { getAllNotes, addNote } from "./services/notesService.js";

const app = express();

// Enable CORS (middleware)
app.use(cors());

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