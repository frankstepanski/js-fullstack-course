/*
  routes/contactCards.js

  Route:
    GET /contactCards  →  contactCardsController.getAll
*/

import { Router } from "express";
import { getAll } from "../controllers/contactCardsController.js";

const router = Router();

router.get("/", getAll);

export default router;
