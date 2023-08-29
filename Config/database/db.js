// const Sequelize = require('sequelize')
// var mysql2 = require('mysql2')

// const database = new Sequelize('digital_library', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
// })

// module.exports = database

const Sequelize = require('sequelize')

const db = new Sequelize("new_digital_library", "root", "12345678", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  dialectModule: require('mysql2'),
  logging: console.log,
  pool: { max: 10, min: 0, idle: 10000 },
});

module.exports = db
