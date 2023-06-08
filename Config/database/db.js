const Sequelize = require("sequelize");
var mysql2 = require("mysql2");

const database = new Sequelize("digital_library", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = database;
