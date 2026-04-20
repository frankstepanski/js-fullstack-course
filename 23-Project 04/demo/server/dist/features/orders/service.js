import { z } from "zod";
import pool from "../../db/pool.js";
export const OrderSchema = z.object({
    items: z.array(z.unknown()),
});
export async function createOrder(body) {
    const id = String(Date.now());
    const items = body.items ?? [];
    const { rows } = await pool.query(`INSERT INTO orders (id, items) VALUES ($1, $2)
     RETURNING id, items, created_at`, [id, JSON.stringify(items)]);
    const row = rows[0];
    return {
        id: row.id,
        items: row.items,
        createdAt: row.created_at,
    };
}
