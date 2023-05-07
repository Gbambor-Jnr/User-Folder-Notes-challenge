import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../services/connection";

interface NotesDoc extends Model {
  //id: number;
  noteName: string;
  notesData: string | [string];
  //folderid: number; //added this one recently
}

// interface NotesDoc extends Model<NotesAttribute>, NotesAttribute {}

export const Notes = sequelize.define<NotesDoc>(
  "note",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    noteName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    notesData: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);
