/*
  controllers/ordersController.js

  Handles order placement:
  - POST  — create a new order from the request body, return it with its new id
*/

import * as ordersService from "../services/ordersService.js";

export async function createOrder(req, res) {
  try {
    const order = await ordersService.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error("createOrder error:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
}
