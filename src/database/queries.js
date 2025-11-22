// src/database/queries.js
import { pool, useSupabase } from "../configs/db.config.js";
import supabase from "../configs/supabase.config.js";

export async function initializeDatabase() {
  try {
    if (useSupabase) {
      console.log(
        "Using Supabase - skipping table creation (manage via Supabase dashboard)"
      );
      console.log("DB Connected at:", new Date().toISOString());
      return;
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      SELECT setval('notes_id_seq', COALESCE((SELECT MAX(id) FROM notes), 1), true)
    `);

    console.log("DB Connected at:", new Date().toISOString());
  } catch (err) {
    console.error("Database initialization error:", err);
    throw err;
  }
}
