// src/configs/db.config.js
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

let pool;
let useSupabase = false;

try {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  // Test connection
  await pool.query("SELECT NOW()");
  console.log("PostgreSQL pool connected");
} catch (err) {
  console.warn(
    "PostgreSQL connection failed, switching to Supabase:",
    err.message
  );
  useSupabase = true;
  pool = null;
}

// Helper function to check which DB to use
const shouldUseSupabase = () => {
  return useSupabase || !pool;
};

export { pool, useSupabase, shouldUseSupabase };
