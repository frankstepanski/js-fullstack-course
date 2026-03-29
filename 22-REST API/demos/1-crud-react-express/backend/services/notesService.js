import fs from "fs/promises";

const FILE_PATH = "./notes.json";

/**
 * Get all notes
 */
export async function getAllNotes() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveNotes(notes) {
  await fs.writeFile(FILE_PATH, JSON.stringify(notes, null, 2));
}

/**
 * Create note
 */
export async function addNote(text) {
  const notes = await getAllNotes();

  const newNote = {
    id: Date.now(),
    text
  };

  notes.push(newNote);

  await saveNotes(notes);

  return newNote;
}

/**
 * Update note
 */
export async function updateNoteById(id, text) {
  const notes = await getAllNotes();

  const note = notes.find(n => n.id === id);

  if (!note) return null;

  note.text = text;

  await saveNotes(notes);

  return note;
}

/**
 * Delete note
 */
export async function deleteNoteById(id) {
  const notes = await getAllNotes();

  const index = notes.findIndex(n => n.id === id);

  if (index === -1) return false;

  notes.splice(index, 1);

  await saveNotes(notes);

  return true;
}