// src/module/note/note.route.js
import { Router } from "express";
import noteController from "./note.controller.js";

const notesRouter = Router();

notesRouter.get("/add", (req, res) => noteController.showAddForm(req, res));
notesRouter.post("/", (req, res) => noteController.addNote(req, res));
notesRouter.get("/:id/edit", (req, res) =>
  noteController.showEditForm(req, res)
);
notesRouter.post("/:id/edit", (req, res) => noteController.editNotes(req, res));
notesRouter.post("/:id/delete", (req, res) =>
  noteController.deleteNotes(req, res)
);
notesRouter.get("/:id", (req, res) => noteController.showNote(req, res));

export default notesRouter;
