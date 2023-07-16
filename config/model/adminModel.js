import Sequelize from "sequelize";
import db from '../../Config/database/db.js'


const admin = db.define(
  "admin",
  {
    name: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    refreshToken: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default admin;
