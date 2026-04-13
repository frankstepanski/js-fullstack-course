/*
  services/cartService.js

  The cart is a single row (id = "1") with a JSONB items array.

  getCart  — SELECT the row and return it
  putCart  — UPDATE the items column with the incoming body's items array,
             then return the updated row
*/

import pool from "../db/pool.js";

export async function getCart() {
  const { rows } = await pool.query(
    "SELECT id, items FROM cart WHERE id = $1",
    ["1"]
  );
  return rows[0] ?? null;
}

export async function putCart(body) {
  // Accept the full cart object from the client and persist only the items array.
  // The id is always "1"; the client cannot change it.
  const items = body.items ?? [];
  const { rows } = await pool.query(
    `UPDATE cart SET items = $1 WHERE id = $2 RETURNING id, items`,
    [JSON.stringify(items), "1"]
  );
  return rows[0];
}
