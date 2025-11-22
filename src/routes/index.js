// src/module/note/note.route.js
import { Router } from "express";
import noteRoutes from "../routes/note/note.configs.js";

const notesRouter = Router();

noteRoutes.forEach((route) => {
  notesRouter[route.method.toLowerCase()](route.uri, route.handler);
});

export default notesRouter;
