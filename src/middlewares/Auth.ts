import { Request, Response, NextFunction } from "express";
import { SavedUser } from "../dtos/user.dto";
import { validateToken } from "../utility";
import { AuthPayload } from "../dtos/payload.dto";

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await validateToken(req);

  if (validate) {
    next();
  } else {
    return res.json({ message: "User not authenticated" });
  }
};
