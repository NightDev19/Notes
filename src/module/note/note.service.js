// src/routes/note/note.service.js
class NoteService {
  constructor() {
    this.notes = [];
  }

  getNotes() {
    return this.notes;
  }

  getNoteById(id) {
    return this.notes.find((note) => note.id === parseInt(id));
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
