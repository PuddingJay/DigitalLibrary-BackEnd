const Sequelize = require("sequelize");
const db = require("../database/db.js")


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

module.exports = admin;
