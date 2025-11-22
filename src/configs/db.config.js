import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

// Skeptical check: are we sure all essential env vars exist?
["DB_USER", "DB_PASSWORD", "DB_HOST", "DB_NAME", "DB_PORT"].forEach((key) => {
  if (!process.env[key]) {
    console.warn(`Missing environment variable: ${key}`);
  }
});

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});
