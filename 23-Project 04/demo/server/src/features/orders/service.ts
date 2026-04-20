import { z } from "zod";
import pool from "../../db/pool.js";

export const OrderSchema = z.object({
  items: z.array(z.unknown()),
});

type OrderBody = z.infer<typeof OrderSchema>;

type OrderRow = {
  id:         string;
  items:      unknown[];
  created_at: Date;
};

export async function createOrder(body: OrderBody) {
  const id    = String(Date.now());
  const items = body.items ?? [];
  const { rows } = await pool.query<OrderRow>(
    `INSERT INTO orders (id, items) VALUES ($1, $2)
     RETURNING id, items, created_at`,
    [id, JSON.stringify(items)]
  );
  const row = rows[0]!;
  return {
    id:        row.id,
    items:     row.items,
    createdAt: row.created_at,
  };
}