/*
  routes/testimonials.js

  Route:
    GET /testimonials  →  testimonialsController.getAll
*/

import { Router } from "express";
import { getAll } from "../controllers/testimonialsController.js";

const router = Router();

router.get("/", getAll);

export default router;
