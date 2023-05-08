import { NextFunction, Request, Response } from "express";
import { sequelize } from "../services/connection";
import { Sequelize } from "sequelize";
import { validationResult } from "express-validator";
import { HttpError } from "../utility/Error";
import { Folder, Notes, User } from "../models";

export const createNotes = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new HttpError("Invalid inputs", 422);
      throw error;
    }

    const { noteName, notesData } = req.body;
    const user = req.user;
    const folderId = req.params.id;

    // if (user) {
    //   const existingUser = await User.findOne({ where: { id: user.id } });
    // }

    const folder = await Folder.findOne({ where: { id: folderId } });

    const createdNote = await Notes.create({ folderId, noteName, notesData });

    res
      .status(201)
      .json({ message: "Notes created succcesfully", createdNote });
    //Later its going to be folder.createNote()
  } catch (err) {
    console.log(err);
  }
};

export const getAllNotesInFolder = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // const errors = validationResult(req.body);
    // if (!errors.isEmpty()) {
    //   const error = new HttpError("Invalid inputs", 422);
    //   throw error;
    // }
    const user = req.user;
    const existingUser = await User.findOne({ where: { id: user.id } });
    const folderId = req.params.id;
    if (existingUser) {
      const folders = await Notes.findAll({ where: { folderId: folderId } });
      res.status(200).json({ folders: folders });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getSingleNoteById = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new HttpError("Invalid inputs", 422);
      throw error;
    }

    const { folderId, notesId } = req.params;
    console.log(folderId, notesId);

    const user = req.user;
    const existingUser = await User.findOne({ where: { id: user.id } });

    if (existingUser) {
      const searchedFolder = await Notes.findAll({
        where: { id: notesId, folderId: folderId },
      });
      res.status(200).json({ note: searchedFolder });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new HttpError("Invalid inputs", 422);
      throw error;
    }
    const { folderId, notesId } = req.params;

    const { noteName, notesData } = req.body;

    const noteToBeUpdated = await Notes.findOne({
      where: { id: notesId, folderId: folderId },
    });
    if (noteToBeUpdated) {
      noteToBeUpdated.noteName = noteName;
      noteToBeUpdated.notesData = notesData;
    }
    res.status(201).json({ message: "Notes updated succcesfully" });
  } catch (err) {
    console.log(err);
  }
};

export const deleteNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new HttpError("Invalid inputs", 422);
      throw error;
    }

    const { folderId, notesId } = req.params;

    const { noteName, notesData } = req.body;

    const noteToBeDeleted = await Notes.destroy({
      where: { id: notesId, folderId: folderId },
    });
    res.status(201).json({ message: "Notes deleted succcesfully" });
    //Later its going to be folder.createNote()
  } catch (err) {
    console.log(err);
  }
};
