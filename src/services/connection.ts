import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  database: "github-challenge",
  username: "root",
  password: "Cornelik2323",
  host: "localhost",
  dialect: "mysql",
});
