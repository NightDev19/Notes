import { Router } from "express";
import notesRouter from "../module/note/note.route.js";

const router = Router();

router.use("/notes", notesRouter);

export default router;
