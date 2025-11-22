// src/routes/note/note.service.js
import { pool } from "../../configs/db.config.js";
class NoteService {
  async getNotes() {
    try {
      const res = await pool.query("SELECT * FROM notes");
      return res.rows;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async getNoteById(id) {
    try {
      const res = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
      return res.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  addNote(note) {
    this.notes.push(note);
  }

  deleteNote(id) {
    const index = this.notes.findIndex((note) => note.id === parseInt(id));
    if (index !== -1) {
      this.notes.splice(index, 1);
      return true;
    }
    return false;
  }

  editNote(id, updatedData) {
    const index = this.notes.findIndex((note) => note.id === parseInt(id));
    if (index !== -1) {
      this.notes[index] = {
        ...this.notes[index],
        title: updatedData.title,
        content: updatedData.content,
        timestamp: new Date(),
      };
      return true;
    }
    return false;
  }

  getNextId() {
    return this.notes.length + 1;
  }
}

export default new NoteService();
