// notesService.js

/**
 * This file is a LOCAL MODULE.
 * 
 * It handles:
 * - Reading notes from file
 * - Writing notes to file
 * - Adding new notes
 * 
 * It does NOT handle HTTP.
 * It does NOT handle routing.
 * 
 * This separation mimics real backend architecture.
 */

import fs from "fs/promises"; // Core Node module (Promise-based file system)
import { fileURLToPath } from "url";
import path from "path";

// Resolve path relative to this file, not the working directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_PATH = path.join(__dirname, "notes.json");

/**
 * Read all notes from file (async)
 */
export async function getAllNotes() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf8");

    // Parse JSON string into JavaScript array
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
}

/**
 * Save notes array back to file
 */
async function saveNotes(notes) {
  await fs.writeFile(FILE_PATH, JSON.stringify(notes, null, 2));
}

/**
 * Add a new note
 */
export async function addNote(text) {
  const notes = await getAllNotes();

  const newNote = {
    id: Date.now(), // simple unique ID
    text,
  };

  notes.push(newNote);

  await saveNotes(notes);

  return newNote;
}