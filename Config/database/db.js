import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize("digital_library", "root", "12345678", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default db;