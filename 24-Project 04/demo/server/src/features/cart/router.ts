import { Router } from "express";
import { getCart, putCart } from "./controller.js";

const router = Router();

router.get("/1", (req, res) => {
  /*
    // Short title shown on the endpoint in the Swagger UI
    #swagger.summary = 'Get the cart'

    // Explains the single cart design decision
    #swagger.description = 'Retrieves the single shared cart (id=1). The cart contains an items array that can hold multiple pizzas.'

    // Describes what comes back when the request succeeds
    #swagger.responses[200] = {
      description: "Cart retrieved successfully",
      schema: {
        id: "1",                              // cart ID (always 1, single cart)
        items: ["pizza_1", "pizza_2"]         // items currently in the cart
      }
    }

    // Describes what comes back when the cart is not found
    #swagger.responses[404] = {
      description: "Cart not found",
      schema: {
        error: "Cart not found"
      }
    }
  */
  getCart(req, res);
});

router.put("/1", (req, res) => {
  /*
    // Short title shown on the endpoint in the Swagger UI
    #swagger.summary = 'Update the cart'

    // Explains the single cart design decision
    #swagger.description = 'Updates the single shared cart (id=1) by replacing the items array with the new one provided in the request body.'

    // Describes what the client needs to send in the request body
    #swagger.requestBody = {
      required: true,                  // body must be provided
      content: {
        "application/json": {          // expects JSON
          schema: {
            type: "object",
            properties: {
              items: {
                type: "array",                          // items is an array
                example: ["pizza_1", "pizza_2"]         // example shown in the UI
              }
            }
          }
        }
      }
    }

    // Describes what comes back when the request succeeds
    #swagger.responses[200] = {
      description: "Cart updated successfully",
      schema: {
        id: "1",                              // cart ID (always 1, single cart)
        items: ["pizza_1", "pizza_2"]         // updated items in the cart
      }
    }
  */
  putCart(req, res);
});

export default router;
