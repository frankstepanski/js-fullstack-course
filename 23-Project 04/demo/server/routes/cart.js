/*
  routes/cart.js

  Routes:
    GET /cart/1  →  cartController.getCart
    PUT /cart/1  →  cartController.putCart

  Note: the cart is a single shared object (id = "1") in this demo.
  A real app would scope the cart to a logged-in user.
*/

import { Router } from "express";
import { getCart, putCart } from "../controllers/cartController.js";

const router = Router();

router.get("/1", getCart);
router.put("/1", putCart);

export default router;
