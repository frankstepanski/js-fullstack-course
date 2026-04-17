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
import { getAllNotes, addNote } from "./notesService.js";

const app = express();

/**
 * Enable CORS
 *
 * Allows frontend running on a different port
 * Note: URL has to be exact; even adding a forward slash at the end will cause CORS errors
 */
app.use(cors());

/**
 * Built-in middleware
 * Automatically parses JSON request bodies
 */
app.use(express.json());

app.get("/notes", async (req, res) => {
  const notes = await getAllNotes();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { text } = req.body;
  const note = await addNote(text);
  res.status(201).json(note);
});

/**
 * 404 Handler
 *
 * Catches any request that did not match a route above.
 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;