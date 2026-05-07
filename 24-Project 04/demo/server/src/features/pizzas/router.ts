import { Router } from "express";
import { getAll } from "./controller.js";

const router = Router();

router.get("/", getAll);

export default router;
