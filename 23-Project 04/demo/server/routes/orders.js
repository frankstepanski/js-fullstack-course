/*
  routes/orders.js

  Route:
    POST /orders  →  ordersController.createOrder
*/

import { Router } from "express";
import { createOrder } from "../controllers/ordersController.js";

const router = Router();

router.post("/", createOrder);

export default router;
