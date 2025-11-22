// src/app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import expressLayouts from "express-ejs-layouts";
import noteController from "./module/note/note.controller.js";
import { initializeDatabase } from "./database/queries.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// Serve public static files
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  noteController.showNotes(req, res); // controller renders
});

app.use("/notes", router);

// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).render("error/404", { title: "Page Not Found" });
});

// Initialize DB then start server
initializeDatabase()
  .then(() => {
    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
