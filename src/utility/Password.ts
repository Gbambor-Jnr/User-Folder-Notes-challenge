import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthPayload, Payload } from "../dtos/payload.dto";
import { Request } from "express";
import { APP_SECRET } from "../../config";

export const generateSalt = async () => {
  const salt = await bcrypt.genSalt();
  return salt;
};

export const hashedPassword = async (password: string, salt: string) => {
  //const genSalt = salt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const validatePassword = async (
  enteredPassword: string,
  retrievedPassword: string,
  salt: string
) => {
  const isEqual =
    (await hashedPassword(enteredPassword, salt)) === retrievedPassword;
  return isEqual;
};

export const generateToken = async (payload: AuthPayload) => {
  const token = jwt.sign(payload, APP_SECRET, { expiresIn: "100d" });
  return token;
};

export const validateToken = async (req: Request) => {
  const token = req.get("Authorization");

  if (token) {
    const payload = jwt.verify(token.split(" ")[1], APP_SECRET) as AuthPayload;
    req.user = payload;

    return true;
  }
  return false;
};
