import { pool } from "../configs/db.config.js";

async function testConnection() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert some dummy data if table is empty
    const { rowCount } = await pool.query(`SELECT * FROM notes`);
    if (rowCount === 0) {
      await pool.query(`
        INSERT INTO notes (title, content)
        VALUES
          ('Note 1', 'This is note 1'),
          ('Note 2', 'This is note 2')
      `);
    }

    const res = await pool.query(`SELECT NOW() AS now`);
    console.log("DB Connected at:", res.rows[0].now);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

testConnection();
