import sequelize from "sequelize";
import Sequelize from "sequelize";
import express, { Router } from "express";
import {
  createNotes,
  deleteNoteById,
  getAllNotesInFolder,
  getSingleNoteById,
  //   deleteNoteById,
  //   getAllNotes,
  //   getNoteById,
  //   updateNote,
} from "../controllers/Notes";

const router = Router();

router.post("/folder/:id/notes", createNotes);
router.get("/folder/:id/notes", getAllNotesInFolder);
router.get("/folder/:folderId/notes/:notesId", getSingleNoteById);
router.patch("/folder/:folderId/notes/:notesId", getSingleNoteById);
router.patch("/folder/:folderId/notes/:notesId", deleteNoteById);
// router.get("/folder/:id/notes", getAllNotes); //get all notes in this folder
// router.get("/folder/:folderid/notes/:noteid", getNoteById); //get a single note in this folder by its id

// router.patch("/folder/:id/notes", updateNote);
// router.delete("/folder/:id/notes/:id", deleteNoteById); //deletes the note with this id

export default router;
