import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../services/connection";

// interface FolderAttributes {
//   id: number;
//   folderName: string;
// }

// interface FolderDoc extends Model<FolderAttributes>, FolderAttributes {}

//

interface FolderDoc extends Model {
  //id: number;
  folderName: string;
}

export const Folder = sequelize.define<FolderDoc>(
  "folder",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    folderName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { freezeTableName: true }
);

// const folderSync = async () => {
//   console.log("before sync");
//   await Folder.sync({ alter: true });
//   console.log("after sync");
// };

// folderSync();
