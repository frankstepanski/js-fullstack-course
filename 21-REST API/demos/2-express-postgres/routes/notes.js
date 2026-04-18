// routes/notes.js
import { Router } from "express";
import { getNotes, createNote } from "../controllers/notesController.js";

const router = Router();

router.get("/", getNotes);
router.post("/", createNote);

export default router;