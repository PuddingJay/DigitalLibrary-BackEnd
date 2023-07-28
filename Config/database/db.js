const Sequelize = require("sequelize");

const db = new Sequelize("digital_library", "root", "12345678", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  dialectModule: require('mysql2')
});

module.exports = db;