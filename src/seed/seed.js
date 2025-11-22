import { pool } from "../configs/db.config.js";

//Seed for notes with id ,title , content and timestamp
pool.query(`
    INSERT INTO notes (id, title, content, timestamp)
    VALUES
        (1, 'Note 1', 'This is note 1', '2023-05-01'),
        (2, 'Note 2', 'This is note 2', '2023-05-02'),
        (3, 'Note 3', 'This is note 3', '2023-05-03'),
        (4, 'Note 4', 'This is note 4', '2023-05-04'),
        (5, 'Note 5', 'This is note 5', '2023-05-05')
`);

console.log("Notes seeded successfully");

pool.end();
