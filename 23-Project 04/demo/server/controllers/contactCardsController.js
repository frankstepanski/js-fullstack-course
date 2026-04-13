/*
  controllers/contactCardsController.js
*/

import * as contactCardsService from "../services/contactCardsService.js";

export async function getAll(req, res) {
  try {
    const cards = await contactCardsService.getAllContactCards();
    res.json(cards);
  } catch (err) {
    console.error("getAll contactCards error:", err.message);
    res.status(500).json({ error: "Failed to fetch contact cards" });
  }
}
