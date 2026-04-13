/*
  services/ordersService.js

  createOrder  — INSERT a new row with the items snapshot from the request body.
                 A unique id is generated from the current timestamp.
                 Returns the newly created order.

  Column mapping (snake_case DB → camelCase API):
    created_at → createdAt
*/

import pool from "../db/pool.js";

export async function createOrder(body) {
  const id    = String(Date.now());
  const items = body.items ?? [];
  const { rows } = await pool.query(
    `INSERT INTO orders (id, items) VALUES ($1, $2)
     RETURNING id, items, created_at`,
    [id, JSON.stringify(items)]
  );
  const row = rows[0];
  return {
    id:        row.id,
    items:     row.items,
    createdAt: row.created_at,
  };
}
