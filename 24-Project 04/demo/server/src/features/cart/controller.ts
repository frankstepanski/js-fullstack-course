import { z } from "zod";
import * as service from "./service.js";

const CartSchema = z.object({
  items: z.array(z.unknown()),
});

export async function getCart(req, res) {
  try {
    const cart = await service.getCart();
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart);
  } catch (err) {
    console.error("getCart error:", (err as Error).message);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}

export async function putCart(req, res) {
  const result = CartSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.format() });
    return;
  }
  try {
    const updated = await service.putCart(result.data);
    res.json(updated);
  } catch (err) {
    console.error("putCart error:", (err as Error).message);
    res.status(500).json({ error: "Failed to update cart" });
  }
}