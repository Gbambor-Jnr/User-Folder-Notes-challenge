import express, { NextFunction, Request, Response } from "express";
import { startExpressApp } from "./src/services/expressApp";
import { sequelize } from "./src/services/connection";
import { HttpError } from "./src/utility/Error";
import { Folder } from "./src/models/Folder";
import { User } from "./src/models/User";
import { Notes } from "./src/models";

const startServer = async () => {
  const app = express();

  app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
      const statusCode = err.statusCode || 500;

      const message = err.message;
      res.status(statusCode).json({ message: message });
    } else {
      res.status(500).json({ messsage: "Internal Server Error" });
    }
  });

  await startExpressApp(app);

  await sequelize.authenticate();

  User.hasMany(Folder, { onDelete: "CASCADE" });
  Folder.belongsTo(User, { onDelete: "CASCADE" });

  Folder.hasMany(Notes);
  Notes.belongsTo(Folder);

  const userFoldersync = async () => {
    await Folder.sync({ alter: true });
    //await User.sync({ alter: true });
    await Notes.sync({ alter: true });
  };

  userFoldersync();

  app.listen(4007, () => {
    console.log("challenge is connected");
  });
};

startServer();
