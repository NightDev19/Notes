class NoteHelpter {
  ifExists = (note) => {
    if (!note) {
      return false;
    }
    return true;
  };
}

export default new NoteHelpter();
