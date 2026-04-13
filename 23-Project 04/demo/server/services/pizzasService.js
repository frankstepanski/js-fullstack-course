/*
  services/pizzasService.js

  A service handles the data layer:
  - runs SQL queries against the database
  - transforms database rows into the shape the API returns (camelCase)

  It does NOT know anything about req or res — that is the controller's job.

  Column mapping (snake_case DB → camelCase API):
    image_src     → imageSrc
    image_alt     → imageAlt
    image_caption → imageCaption
    prices        → prices  (already a parsed JS object from pg JSONB driver)
*/

import pool from "../db/pool.js";

function toApiShape(row) {
  return {
    id:           row.id,
    name:         row.name,
    description:  row.description,
    prices:       row.prices,
    imageSrc:     row.image_src,
    imageAlt:     row.image_alt,
    imageCaption: row.image_caption,
  };
}

export async function getAllPizzas() {
  const { rows } = await pool.query("SELECT * FROM pizzas ORDER BY id");
  return rows.map(toApiShape);
}
