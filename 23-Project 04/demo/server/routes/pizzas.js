/*
  routes/pizzas.js

  Defines which HTTP method + path maps to which controller function.
  The router itself does not contain any logic — it just connects
  incoming requests to the right controller.

  Route:
    GET /pizzas  →  pizzasController.getAll
*/

import { Router } from "express";
import { getAll } from "../controllers/pizzasController.js";

const router = Router();

router.get("/", getAll);

export default router;
