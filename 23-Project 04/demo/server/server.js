/*
  server.js — application entry point

  This file has one job: wire everything together.
  - load environment variables
  - create the Express app
  - attach middleware
  - mount each router at its URL prefix
  - start listening

  All route definitions live in routes/.
  All request/response logic lives in controllers/.
  All database queries live in services/.

  Simple request flow:
    request → middleware → router → controller → service → response
*/

import "dotenv/config";
import express from "express";
import cors from "cors";

import pizzasRouter       from "./routes/pizzas.js";
import specialsRouter     from "./routes/specials.js";
import contactCardsRouter from "./routes/contactCards.js";
import testimonialsRouter from "./routes/testimonials.js";
import cartRouter         from "./routes/cart.js";
import ordersRouter       from "./routes/orders.js";

const app = express();

// --- Middleware ---
app.use(cors());          // allow cross-origin requests from the frontend
app.use(express.json());  // parse JSON request bodies

// --- Routers ---
app.use("/pizzas",       pizzasRouter);
app.use("/specials",     specialsRouter);
app.use("/contactCards", contactCardsRouter);
app.use("/testimonials", testimonialsRouter);
app.use("/cart",         cartRouter);
app.use("/orders",       ordersRouter);

// --- Start ---
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
