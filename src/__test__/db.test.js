import { pool } from "../configs/db.config";

describe("Database Connection", () => {
  it("should connect to the database", async () => {
    try {
      await pool.query("SELECT NOW()");
    } catch (err) {
      console.error("Error connecting to the database:", err);
      throw err;
    }
  });
});
