import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../services/connection";
import { Folder } from "./Folder";

interface UserDoc extends Model {
  id: number;
  username: string;
  name: string;
  password: string;
  salt: string;
  createFolder: (folder: object) => Promise<Model>;
  getFolders: () => Promise<Model[]>;
}

export const User = sequelize.define<UserDoc>("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.sync({ alter: true });
