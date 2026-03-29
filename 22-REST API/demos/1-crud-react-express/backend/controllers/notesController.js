import {
  getAllNotes,
  addNote,
  updateNoteById,
  deleteNoteById
} from "../services/notesService.js";

export async function getNotes(req, res) {
  try {
    const notes = await getAllNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
}

export async function createNote(req, res) {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const note = await addNote(text);

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
}

export async function updateNote(req, res) {
  try {
    const id = Number(req.params.id);
    const { text } = req.body;

    const updatedNote = await updateNoteById(id, text);

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
}

export async function deleteNote(req, res) {
  try {
    const id = Number(req.params.id);

    const deleted = await deleteNoteById(id);

    if (!deleted) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
}