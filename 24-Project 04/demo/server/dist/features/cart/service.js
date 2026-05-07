import { z } from "zod";
import pool from "../../db/pool.js";
export const CartSchema = z.object({
    items: z.array(z.unknown()),
});
export async function getCart() {
    const { rows } = await pool.query("SELECT id, items FROM cart WHERE id = $1", ["1"]);
    return rows[0] ?? null;
}
export async function putCart(body) {
    const items = body.items ?? [];
    const { rows } = await pool.query(`UPDATE cart SET items = $1 WHERE id = $2 RETURNING id, items`, [JSON.stringify(items), "1"]);
    return rows[0];
}
