import { NextFunction, Request, Response } from "express";
import { sequelize } from "../services/connection";
import { Sequelize } from "sequelize";
import { User } from "../models/User";
import { UserInputs } from "../dtos/user.dto";
import {
  generateSalt,
  generateToken,
  hashedPassword,
  validatePassword,
} from "../utility";
import { validationResult } from "express-validator";
import { HttpError } from "../utility/Error";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginInputs } from "../dtos/user.dto";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req.body);

  try {
    if (!errors.isEmpty()) {
      const error = new HttpError(" Invalid User credentials", 422);
      console.log(error);
      throw error;
    }
    const { username, name, password } = <UserInputs>req.body;

    const salt = await generateSalt();
    const userPassword = await hashedPassword(password, salt);

    const existingUser = await User.findOne({ where: { username: username } });

    if (existingUser) {
      const error = new HttpError(
        "User with this credentials already exists",
        409
      );
      throw error;
    }
    const user = await User.create({
      username,
      name,
      password: userPassword,
      salt: salt,
    });

    res.status(201).json({ message: "User succesfully created" });
  } catch (err) {
    if (err instanceof HttpError) {
      err.statusCode = err.statusCode || 500;
    } else {
      console.log(err);
    }
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = <LoginInputs>req.body;
    const foundUser = await User.findOne({ where: { username: username } });
    //console.log(foundUser);
    if (!foundUser) {
      const error = new HttpError("No user with this credentail found", 404);
      throw error;
    }

    const isEqual = await validatePassword(
      password,
      foundUser.password,
      foundUser.salt
    );
    // const userThings = {
    //   id: foundUser.id,
    //   password: password,
    //   salt: foundUser.salt,
    //   username: foundUser.username,
    // };
    if (isEqual) {
      const token = await generateToken({
        id: foundUser.id,
        password: password,
        salt: foundUser.salt,
        username: foundUser.username,
      });

      // req.user = userThings;

      res.status(200).json({ message: "User found", token: token });
    }
  } catch (err) {
    if (err instanceof HttpError) {
      err.statusCode = err.statusCode || 500;
    } else {
      console.log(err);
    }
  }
};
