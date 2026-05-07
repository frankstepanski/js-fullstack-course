import { Router } from "express";
import { createOrder } from "./controller.js";

const router = Router();

router.post("/", (req, res) => {
  /*
    // Short title shown on the endpoint in the Swagger UI
    #swagger.summary = 'Create a new order'

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
    #swagger.responses[201] = {
      description: "Order created successfully",
      schema: {
        id: "1713456789000",                        // timestamp used as unique ID
        items: ["pizza_1", "pizza_2"],              // the items that were ordered
        createdAt: "2026-04-18T00:00:00.000Z"       // when the order was created
      }
    }
  */
  createOrder(req, res);
});

export default router;