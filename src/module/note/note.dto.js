// src/routes/note/note.dto.js
class NoteDTO {
  static toResponse(note) {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      timestamp: note.timestamp,
    };
  }

  static toResponseList(notes) {
    return notes.map((note) => this.toResponse(note));
  }
}

export default NoteDTO;
