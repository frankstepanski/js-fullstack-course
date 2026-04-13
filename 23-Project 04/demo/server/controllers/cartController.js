/*
  controllers/cartController.js

  Handles two operations on the single shared cart (id = "1"):
  - GET  — return the current cart
  - PUT  — replace the cart contents with the request body
*/

import * as cartService from "../services/cartService.js";

export async function getCart(req, res) {
  try {
    const cart = await cartService.getCart();
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart);
  } catch (err) {
    console.error("getCart error:", err.message);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}

export async function putCart(req, res) {
  try {
    const updated = await cartService.putCart(req.body);
    res.json(updated);
  } catch (err) {
    console.error("putCart error:", err.message);
    res.status(500).json({ error: "Failed to update cart" });
  }
}
