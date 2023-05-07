import express, { Request, Response, NextFunction, Application } from "express";

import bodyParser from "body-parser";
import UserRoute from "../routes/UserRoutes";
import FolderRoutes from "../routes/FolderRoutes";
import cors from "cors";
import NotesRoute from "../routes/NotesRoutes";

export const startExpressApp = async (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(UserRoute);
  app.use(FolderRoutes);
  app.use(NotesRoute);

  return app;
};
