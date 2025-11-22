import noteService from "../module/note/note.service";

describe("Show a note", () => {
  it("should show a note by id", async () => {
    const note = await noteService.getNoteById(1);
    expect(note.id).toBe(1);
  });
});

describe("Show all note", () => {
  it("Should show all note", async () => {
    const notes = await noteService.getNotes();
    expect(notes.length).toBeGreaterThan(0);
  });
});
