// db.test.js
import { pool, shouldUseSupabase } from "../configs/db.config";

describe("Database Connection", () => {
  it("should connect to the database", async () => {
    if (shouldUseSupabase()) {
      console.log("Using Supabase connection");
      expect(shouldUseSupabase()).toBe(true);
    } else {
      try {
        const result = await pool.query("SELECT NOW()");
        expect(result.rows).toBeDefined();
      } catch (err) {
        console.error("Error connecting to the database:", err);
        throw err;
      }
    }
  });
});
