import sequelize from "sequelize";
import Sequelize from "sequelize";
import express, { Router } from "express";
import {
  createFolder,
  deleteAllFolder,
  deleteSingleFolder,
  getFolderById,
  getFolders,
  updateFolder,
} from "../controllers/Folder";
import { Authenticate } from "../middlewares/Auth";

const router = Router();

router.use(Authenticate);
router.post("/folder", createFolder);
router.get("/folder", getFolders);
router.get("/folder/:id", getFolderById);
router.patch("/folder/:id", updateFolder);
router.delete("/folder/:id", deleteSingleFolder);
router.delete("/folder", deleteAllFolder);

export default router;
