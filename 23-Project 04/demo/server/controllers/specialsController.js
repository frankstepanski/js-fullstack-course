/*
  controllers/specialsController.js
*/

import * as specialsService from "../services/specialsService.js";

export async function getAll(req, res) {
  try {
    const specials = await specialsService.getAllSpecials();
    res.json(specials);
  } catch (err) {
    console.error("getAll specials error:", err.message);
    res.status(500).json({ error: "Failed to fetch specials" });
  }
}
