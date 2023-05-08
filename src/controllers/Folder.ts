import { NextFunction, Request, Response } from "express";
import { sequelize } from "../services/connection";
import { Sequelize } from "sequelize";
import { validationResult } from "express-validator";
import { HttpError } from "../utility/Error";
import { FolderName } from "../dtos/Folder.dtos";
import { Folder, User } from "../models";
import { userInfo } from "os";

export const createFolder = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new HttpError("Invalid input", 422);
      throw error;
    }
    const { folderName } = <FolderName>req.body;

    const existingUser = req.user;

    // later its going to be user.createFolder()
    if (existingUser) {
      const savedUser = await User.findOne({ where: { id: existingUser.id } });
      if (savedUser) {
        const createFolder = await savedUser.createFolder({
          folderName,
        });
        // const createFolder= await Folder.create({userId:existingUser?.id, folderName})
        res.status(201).json({
          message: "folder created succesfully",
          folder: createFolder,
        });
      }
    }

    //LATER ONLY USER CAN CREATE FOLDER
  } catch (err) {
    console.log(err);
  }
};

export const getFolders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allFolders = await Folder.findAll({ order: [["createdAt", "DESC"]] });
    if (!allFolders) {
      const error = new HttpError("Folders do not exist yet", 404);
      throw error;
    }
    res.status(200).json({ folder: allFolders });
  } catch (err) {
    console.log(err);
  }
};
export const getFolderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const folderId = req.params.id;
    const existingFolder = await Folder.findOne({ where: { id: folderId } });
    if (!existingFolder) {
      const error = new HttpError("Folders do not exist yet", 404);
      throw error;
    }
    res.status(200).json({ folder: existingFolder });
  } catch (err) {
    console.log(err);
  }
};

export const updateFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const folderId = req.params.id;
    const existingFolder = await Folder.findOne({ where: { id: folderId } });
    if (!existingFolder) {
      const error = new HttpError("Folders do not exist yet", 404);
      throw error;
    }
    const { folderName } = req.body;
    existingFolder.folderName = folderName;
    existingFolder.save();
    res.status(200).json({ folder: existingFolder });
  } catch (err) {
    console.log(err);
  }
};
export const deleteSingleFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const folderId = req.params.id;
    const existingFolder = await Folder.findOne({ where: { id: folderId } });
    if (!existingFolder) {
      const error = new HttpError("Folders do not exist yet", 404);
      throw error;
    }

    existingFolder.destroy();
    res.status(200).json({ message: "folder deleted succesfully" });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const folders = await Folder.destroy();
    res.status(200).json({ message: "All your folders deleted succesfully" });
  } catch (err) {
    console.log(err);
  }
};
