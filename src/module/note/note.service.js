// src/routes/note/note.service.js
import { pool, shouldUseSupabase } from "../../configs/db.config.js";
import supabase from "../../configs/supabase.config.js";
import NoteDTO from "./note.dto.js";
import NoteHelpter from "./note.helper.js";

class NoteService {
  async getNotes() {
    try {
      if (shouldUseSupabase()) {
        const { data, error } = await supabase.from("notes").select("*");
        if (error) throw error;
        return NoteDTO.toResponseList(data);
      }
      const res = await pool.query("SELECT * FROM notes");
      return NoteDTO.toResponseList(res.rows);
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async getNoteById(id) {
    try {
      if (shouldUseSupabase()) {
        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        return data || null;
      }
      const res = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
      return res.rows[0] || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async addNote(note) {
    try {
      if (shouldUseSupabase()) {
        const { data, error } = await supabase
          .from("notes")
          .insert([
            { title: note.title, content: note.content, timestamp: new Date() },
          ])
          .select()
          .single();
        if (error) throw error;
        return NoteDTO.toResponse(data);
      }
      const res = await pool.query(
        "INSERT INTO notes (title, content, timestamp) VALUES ($1, $2, $3) RETURNING *",
        [note.title, note.content, new Date()]
      );
      return NoteDTO.toResponse(res.rows[0]);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async deleteNote(id) {
    try {
      const noteExists = await this.getNoteById(id);
      NoteHelpter.ifExists(noteExists);

      if (shouldUseSupabase()) {
        const { error } = await supabase.from("notes").delete().eq("id", id);
        if (error) throw error;
        return true;
      }
      await pool.query("DELETE FROM notes WHERE id = $1", [id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async editNote(id, updatedData) {
    try {
      const noteExists = await this.getNoteById(id);
      NoteHelpter.ifExists(noteExists);

      if (shouldUseSupabase()) {
        const { data, error } = await supabase
          .from("notes")
          .update({
            title: updatedData.title,
            content: updatedData.content,
            timestamp: new Date(),
          })
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return NoteDTO.toResponse(data);
      }

      const res = await pool.query(
        "UPDATE notes SET title = $1, content = $2, timestamp = $3 WHERE id = $4 RETURNING *",
        [updatedData.title, updatedData.content, new Date(), id]
      );

      return NoteDTO.toResponse(res.rows[0]);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export default new NoteService();
