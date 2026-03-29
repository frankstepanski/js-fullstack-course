import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} from "../controllers/notesController.js";

const router = express.Router();

/**
 * GET /notes
 */
router.get("/", getNotes);

/**
 * POST /notes
 */
router.post("/", createNote);

/**
 * PUT /notes/:id
 */
router.put("/:id", updateNote);

/**
 * DELETE /notes/:id
 */
router.delete("/:id", deleteNote);

export default router;