// app.js

import express from "express";
import cors from "cors";
import notesRouter from "./routes/notesRouter.js";

const app = express();

/**
 * Middleware
 */

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

/**
 * Routes
 */

app.use("/notes", notesRouter);

/**
 * 404 handler
 */

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;