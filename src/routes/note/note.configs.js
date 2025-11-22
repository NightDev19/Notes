// src/module/note/note.routesConfig.js
import noteController from "../../module/note/note.controller.js";

const noteRoutes = [
  { uri: "/add", method: "GET", handler: noteController.showAddForm },
  { uri: "/", method: "POST", handler: noteController.addNote },
  { uri: "/:id/edit", method: "GET", handler: noteController.showEditForm },
  { uri: "/:id/edit", method: "POST", handler: noteController.editNotes },
  { uri: "/:id/delete", method: "POST", handler: noteController.deleteNotes },
  { uri: "/:id", method: "GET", handler: noteController.showNote },
];

export default noteRoutes;
