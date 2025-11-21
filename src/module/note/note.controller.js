// src/routes/note/note.controller.js
import noteService from "./note.service.js";

class NoteController {
  showNote(req, res) {
    const note = noteService.getNoteById(req.params.id);
    if (!note) return res.status(404).render("error/404");
    res.render("note", { note });
  }

  addNote(req, res) {
    const note = {
      id: noteService.getNextId(),
      title: req.body.title,
      content: req.body.content,
      timestamp: new Date(),
    };
    noteService.addNote(note);
    res.redirect("/");
  }

  showAddForm(req, res) {
    res.render("add-note", { note: null });
  }

  deleteNotes(req, res) {
    const note = noteService.deleteNote(req.params.id);
    if (!note) return res.status(404).render("error/404");
    res.redirect("/notes");
  }

  showEditForm(req, res) {
    const note = noteService.getNoteById(req.params.id);
    if (!note) return res.status(404).render("error/404");
    res.render("add-note", { note });
  }

  editNotes(req, res) {
    const note = noteService.editNote(req.params.id, req.body);
    if (!note) return res.status(404).render("error/404");
    res.redirect("/notes/" + req.params.id);
  }
}

export default new NoteController();
