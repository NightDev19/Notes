// src/routes/note/note.controller.js

import noteService from "./note.service.js";
import NoteValidator from "./note.validator.js";

class NoteController {
  async showNote(req, res) {
    try {
      const note = await noteService.getNoteById(req.params.id);
      const isValid = NoteValidator.validateNote(note);
      if (!isValid) return res.status(400).render("error/400");
      res.render("note", { note });
    } catch (err) {
      console.error(err);
      res.status(500).render("error/500");
    }
  }

  async showNotes(req, res) {
    try {
      const notes = await noteService.getNotes();
      res.render("index", { title: "Home", notes });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }

  async addNote(req, res) {
    try {
      const note = await noteService.addNote(req.body);
      if (!note) return res.status(400).render("error/400");
      res.redirect("/notes/" + note.id);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }

  showAddForm(req, res) {
    res.render("add-note", { note: null });
  }

  async deleteNotes(req, res) {
    try {
      const note = await noteService.deleteNote(req.params.id);
      if (!note) return res.status(404).render("error/404");
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).render("error/500");
    }
  }

  async showEditForm(req, res) {
    try {
      const note = await noteService.getNoteById(req.params.id);
      if (!note) return res.status(404).render("error/404");
      res.render("add-note", { note });
    } catch (err) {
      console.error(err);
      res.status(500).render("error/500");
    }
  }

  async editNotes(req, res) {
    try {
      const note = await noteService.editNote(req.params.id, req.body);
      if (!note) return res.status(404).render("error/404");
      res.redirect("/notes/" + req.params.id);
    } catch (err) {
      console.error(err);
      res.status(500).render("error/500");
    }
  }
}

export default new NoteController();
