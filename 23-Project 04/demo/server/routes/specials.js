/*
  routes/specials.js

  Route:
    GET /specials  →  specialsController.getAll
*/

import { Router } from "express";
import { getAll } from "../controllers/specialsController.js";

const router = Router();

router.get("/", getAll);

export default router;
