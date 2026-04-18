// app.js

import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/notes", notesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;