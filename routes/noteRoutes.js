const express = require("express");
const auth = require("../middleware/auth");
const { getNote, createNote, deleteNote, updateNote } = require("../controllers/noteController");

const noteRouter = express.Router();


noteRouter.get("/", auth, getNote);
noteRouter.post("/", auth, createNote);
noteRouter.delete("/:id", auth, deleteNote);
noteRouter.put("/:id", auth, updateNote);



module.exports = noteRouter;