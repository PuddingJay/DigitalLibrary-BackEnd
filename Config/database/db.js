// const Sequelize = require('sequelize')
// var mysql2 = require('mysql2')

// const db = new Sequelize("n1561892_new_digilib", "n1561892_digital_library", "Perpustakaan1945", {
//   dialect: 'mysql',
//   dialectModule: require('mysql2'),
//   logging: console.log,
//   pool: { max: 10, min: 0, idle: 10000 },
// })

// module.exports = database

const Sequelize = require('sequelize')

const db = new Sequelize('new_digital_library', 'root', '12345678', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: console.log,
  pool: { max: 10, min: 0, idle: 10000 },
})

module.exports = db
