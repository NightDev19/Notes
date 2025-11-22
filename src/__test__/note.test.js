// note.test.js
import noteService from "../module/note/note.service";
import { pool, shouldUseSupabase } from "../configs/db.config";

describe("Show a note", () => {
  let testNoteId;

  beforeAll(async () => {
    if (!shouldUseSupabase()) {
      const result = await pool.query(
        "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING id",
        ["Test Note", "Test Content"]
      );
      testNoteId = result.rows[0].id;
    }
  });

  afterAll(async () => {
    if (!shouldUseSupabase() && testNoteId) {
      await pool.query("DELETE FROM notes WHERE id = $1", [testNoteId]);
    }
  });

  it("should show a note by id", async () => {
    if (shouldUseSupabase()) {
      console.log("Skipping test - using Supabase");
      return;
    }

    const note = await noteService.getNoteById(testNoteId);
    expect(note).not.toBeNull();
    expect(note.id).toBe(testNoteId);
  });
});

describe("Show all note", () => {
  it("Should show all note", async () => {
    const notes = await noteService.getNotes();
    expect(Array.isArray(notes)).toBe(true);
    expect(notes.length).toBeGreaterThanOrEqual(0);
  });
});
