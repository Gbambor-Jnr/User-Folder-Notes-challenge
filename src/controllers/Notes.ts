import { NextFunction, Request, Response } from "express";
import { sequelize } from "../services/connection";
import { Sequelize } from "sequelize";
import { validationResult } from "express-validator";
import { HttpError } from "../utility/Error";
import { Folder, Notes, User } from "../models";

export const createNotes = async (
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

// export const getAllNotes = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const errors = validationResult(req.body);
//     if (!errors.isEmpty()) {
//       const error = new HttpError("Invalid inputs", 422);
//       throw error;
//     }

//     const { noteName, notesData } = req.body;

//     const createdNote = await Notes.create({
//       notesData,
//       noteName,
//     });
//     res.status(201).json({ message: "Notes created succcesfully" });
//     //Later its going to be folder.createNote()
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getNoteById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const errors = validationResult(req.body);
//     if (!errors.isEmpty()) {
//       const error = new HttpError("Invalid inputs", 422);
//       throw error;
//     }

//     const { noteName, notesData } = req.body;

//     const createdNote = await Notes.create({
//       notesData,
//       noteName,
//     });
//     res.status(201).json({ message: "Notes created succcesfully" });
//     //Later its going to be folder.createNote()
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const updateNote = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const errors = validationResult(req.body);
//     if (!errors.isEmpty()) {
//       const error = new HttpError("Invalid inputs", 422);
//       throw error;
//     }

//     const { noteName, notesData } = req.body;

//     const createdNote = await Notes.create({
//       notesData,
//       noteName,
//     });
//     res.status(201).json({ message: "Notes created succcesfully" });
//     //Later its going to be folder.createNote()
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const deleteNoteById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const errors = validationResult(req.body);
//     if (!errors.isEmpty()) {
//       const error = new HttpError("Invalid inputs", 422);
//       throw error;
//     }

//     const { noteName, notesData } = req.body;

//     const createdNote = await Notes.create({
//       notesData,
//       noteName,
//     });
//     res.status(201).json({ message: "Notes created succcesfully" });
//     //Later its going to be folder.createNote()
//   } catch (err) {
//     console.log(err);
//   }
// };
