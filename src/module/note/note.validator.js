class NoteValidator {
  static validateNote(note) {
    if (!note.title || !note.content) {
      return false;
    }
    return true;
  }
}
export default NoteValidator;