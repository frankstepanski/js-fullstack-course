import { z } from "zod";
import pool from "../../db/pool.js";

export const CartSchema = z.object({
  items: z.array(z.unknown()),
});

type CartBody = z.infer<typeof CartSchema>;

type Cart = {
  id:    string;
  items: unknown[];
};

export async function getCart() {
  const { rows } = await pool.query<Cart>(
    "SELECT id, items FROM cart WHERE id = $1",
    ["1"]
  );
  return rows[0] ?? null;
}

export async function putCart(body: CartBody) {
  const items = body.items ?? [];
  const { rows } = await pool.query<Cart>(
    `UPDATE cart SET items = $1 WHERE id = $2 RETURNING id, items`,
    [JSON.stringify(items), "1"]
  );
  return rows[0]!;
}