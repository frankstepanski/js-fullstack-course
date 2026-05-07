import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json" with { type: "json" };
import type { Request, Response, NextFunction } from "express";

import pizzasRouter       from "./features/pizzas/router.js";
import specialsRouter     from "./features/specials/router.js";
import contactCardsRouter from "./features/contactCards/router.js";
import testimonialsRouter from "./features/testimonials/router.js";
import cartRouter         from "./features/cart/router.js";
import ordersRouter       from "./features/orders/router.js";

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

/*
  --- Swagger ---
  Uses swagger-autogen to scan routes and generate swagger-output.json
  Run "npm run swagger" to regenerate the spec whenever routes change

  To manually enhance a route, add #swagger comments directly in the route handler:
     #swagger.summary = 'My summary'
     #swagger.description = 'My description'
  Then re-run "npm run swagger" to pick up the changes

  swagger-ui-express serves the generated spec as an interactive UI at /docs
*/
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// --- Health ---
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// --- Routers ---
app.use("/pizzas",       pizzasRouter);
app.use("/specials",     specialsRouter);
app.use("/contactCards", contactCardsRouter);
app.use("/testimonials", testimonialsRouter);
app.use("/cart",         cartRouter);
app.use("/orders",       ordersRouter);

// --- 404 ---
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// --- Error Handler ---
app.use((err: { status?: number; message?: string; stack?: string }, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status ?? 500).json({ error: err.message ?? "Internal server error" });
});

export default app;