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

export async function testConnection() {
  await pool.query("SELECT 1");
}