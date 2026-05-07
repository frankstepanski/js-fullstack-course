import { z } from "zod";
import * as service from "./service.js";

const OrderSchema = z.object({
  items: z.array(z.unknown()),
});

export async function createOrder(req, res) {
  const result = OrderSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }
  try {
    const order = await service.createOrder(result.data);
    res.status(201).json(order);
  } catch (err) {
    console.error("createOrder error:", (err as Error).message);
    res.status(500).json({ error: "Failed to create order" });
  }
}