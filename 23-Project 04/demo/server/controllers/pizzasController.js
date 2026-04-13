/*
  controllers/pizzasController.js

  A controller handles the HTTP layer:
  - reads data from the request (req.params, req.body, req.query)
  - calls the service to do the actual work
  - sends the response back to the client

  It does NOT contain SQL or business logic — that lives in the service.
*/

import * as pizzasService from "../services/pizzasService.js";

export async function getAll(req, res) {
  try {
    const pizzas = await pizzasService.getAllPizzas();
    res.json(pizzas);
  } catch (err) {
    console.error("getAll pizzas error:", err.message);
    res.status(500).json({ error: "Failed to fetch pizzas" });
  }
}
