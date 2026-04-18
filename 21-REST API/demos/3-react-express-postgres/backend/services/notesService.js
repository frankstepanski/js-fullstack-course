// services/notesService.js

import pool from "../db/db.js"

export async function getAllNotes() {
  const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
  return result.rows;
}

export async function addNote(text) {
  const result = await pool.query(
    "INSERT INTO notes (text) VALUES ($1) RETURNING *",
    [text]
  );
  return result.rows[0];
}

export async function editNote(id, text) {
  const result = await pool.query(
    "UPDATE notes SET text = $1 WHERE id = $2 RETURNING *",
    [text, id]
  );
  return result.rows[0] ?? null;
}

export async function removeNote(id) {
  const result = await pool.query(
    "DELETE FROM notes WHERE id = $1",
    [id]
  );
  return result.rowCount > 0;
}

export async function testConnection() {
  await pool.query("SELECT 1");
}