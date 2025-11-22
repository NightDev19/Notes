// src/seed/seed.js
import { pool, useSupabase } from "../configs/db.config.js";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

async function seedNotes() {
  try {
    console.log("Starting seed...");

    const forceSupabase = process.env.FORCE_SUPABASE === "true" || false;
    const usingSB = forceSupabase || useSupabase;

    console.log("Using Supabase:", usingSB);

    const notes = [
      {
        title: "Note 1",
        content: "This is note 1",
        timestamp: "2023-05-01T00:00:00Z",
      },
      {
        title: "Note 2",
        content: "This is note 2",
        timestamp: "2023-05-02T00:00:00Z",
      },
      {
        title: "Note 3",
        content: "This is note 3",
        timestamp: "2023-05-03T00:00:00Z",
      },
      {
        title: "Note 4",
        content: "This is note 4",
        timestamp: "2023-05-04T00:00:00Z",
      },
      {
        title: "Note 5",
        content: "This is note 5",
        timestamp: "2023-05-05T00:00:00Z",
      },
    ];

    if (usingSB) {
      console.log("Inserting via Supabase...");
      // Use service role key for seeding (bypasses RLS)
      const supabaseAdmin = createClient(
        process.env.SB_URL,
        process.env.SB_SERVICE_ROLE_KEY || process.env.SB_ANON_KEY
      );

      const { data, error } = await supabaseAdmin
        .from("notes")
        .insert(notes)
        .select();
      if (error) {
        console.error(
          "Supabase error details:",
          JSON.stringify(error, null, 2)
        );
        throw error;
      }
      console.log("Notes seeded successfully via Supabase:", data);
    } else {
      console.log("Inserting via PostgreSQL...");
      await pool.query(`
        INSERT INTO notes (id, title, content, timestamp)
        VALUES
          (1, 'Note 1', 'This is note 1', '2023-05-01'),
          (2, 'Note 2', 'This is note 2', '2023-05-02'),
          (3, 'Note 3', 'This is note 3', '2023-05-03'),
          (4, 'Note 4', 'This is note 4', '2023-05-04'),
          (5, 'Note 5', 'This is note 5', '2023-05-05')
      `);
      console.log("Notes seeded successfully via PostgreSQL");
      await pool.end();
    }

    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seedNotes();
