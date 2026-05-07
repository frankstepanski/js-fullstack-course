// server.js

/**
 * Express version of our Node Notes API
 *
 * Express simplifies:
 * - Routing
 * - JSON parsing
 * - CORS handling
 * - Response formatting
 */

import express from "express";
import cors from "cors";
import { getAllNotes, addNote } from "./notesService.js";

const app = express();
const PORT = 3000;

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
 * ROUTE: GET /notes
 */
app.get("/notes", async (req, res) => {
  try {
    const notes = await getAllNotes();
    res.json(notes); // Automatically sets Content-Type
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

/**
 * ROUTE: POST /notes
 */
app.post("/notes", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const newNote = await addNote(text);
    res.status(201).json(newNote);

  } catch (error) {
    res.status(400).json({ error: "Invalid request" });
  }
});

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/**
 * Start Server
 */
app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
});