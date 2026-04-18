// controllers/notesController.js

/**
 * Notes Controller
 *
 * Sits between the router and the service layer.
 * Routes map HTTP verbs to controller functions;
 * controller functions validate input, call the service,
 * and send the HTTP response.
 *
 *   routes/notes.js                controllers/notesController.js
 *   ─────────────────────────────  ──────────────────────────────
 *   router.get("/",  getNotes)   → validate → getAllNotes()  → res.json
 *   router.post("/", createNote) → validate → addNote(text)  → res.status(201).json
 *
 * Keeping this logic here means routes stay as thin mappings
 * and the service stays focused purely on database work.
 */

import { getAllNotes, addNote, editNote, removeNote } from "../services/notesService.js";

/**
 * CONTROLLER: GET /notes
 *
 * Calls the service to fetch all notes and returns them as a JSON array.
 *
 * GET requests have no body so there is nothing to validate.
 * The only thing that can go wrong is the database call failing,
 * which is caught and returned as a 500 error.
 *
 * Success response:
 *   [{ id: 1, text: "my note" }, { id: 2, text: "another note" }]
 *
 * If the table is empty it returns an empty array:
 *   []
 */
export async function getNotes(req, res) {
  try {
    const notes = await getAllNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
}

/**
 * CONTROLLER: POST /notes
 *
 * Expects a JSON body in this shape:
 *   { "text": "my note here" }
 *
 * req.body         → the whole object  : { text: "my note here" }
 * req.body.text    → the note content  : "my note here"
 *
 * Validation checks:
 *   1. req.body exists           — body was parsed (correct Content-Type sent)
 *   2. req.body.text exists      — text property was included
 *   3. typeof text === "string"  — text is actually a string, not a number or object
 *   4. text.trim() !== ""        — text is not just empty whitespace
 *   5. text.length <= 1000       — text is not excessively long
 *
 * If any check fails → 400 Bad Request
 * If database fails  → 500 Internal Server Error
 */
export async function createNote(req, res) {
  try {
    const text = req.body && req.body.text;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ error: "Text is required" });
    }
    if (text.length > 1000) {
      return res.status(400).json({ error: "Text must be 1000 characters or less" });
    }

    const newNote = await addNote(text.trim());
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
}

/**
 * CONTROLLER: PUT /notes/:id
 *
 * Updates the text of an existing note.
 *
 * req.params.id    → the note id from the URL  : "42"
 * req.body.text    → the new text content
 *
 * Validation checks:
 *   1. req.params.id is a valid integer  — prevents garbage queries
 *   2. req.body.text exists and is a non-empty string
 *   3. text.length <= 1000
 *
 * If the id does not match any note → 404 Not Found
 * If any check fails                → 400 Bad Request
 * If database fails                 → 500 Internal Server Error
 */
export async function updateNote(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const text = req.body && req.body.text;
    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ error: "Text is required" });
    }
    if (text.length > 1000) {
      return res.status(400).json({ error: "Text must be 1000 characters or less" });
    }

    const updated = await editNote(id, text.trim());
    if (!updated) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
}

/**
 * CONTROLLER: DELETE /notes/:id
 *
 * Deletes a note by id.
 *
 * req.params.id → the note id from the URL : "42"
 *
 * If the id does not match any note → 404 Not Found
 * If database fails                 → 500 Internal Server Error
 */
export async function deleteNote(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await removeNote(id);
    if (!deleted) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
}