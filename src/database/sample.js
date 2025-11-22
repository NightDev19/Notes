import { pool } from "../configs/db.config.js";

pool.query("SELECT * FROM users WHERE id = $1", [1], (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
});
