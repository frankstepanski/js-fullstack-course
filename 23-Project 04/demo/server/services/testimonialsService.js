/*
  services/testimonialsService.js

  All columns already match the camelCase API shape (id, name, quote, rating),
  so no transformation is needed.
*/

import pool from "../db/pool.js";

export async function getAllTestimonials() {
  const { rows } = await pool.query("SELECT * FROM testimonials ORDER BY id");
  return rows;
}
