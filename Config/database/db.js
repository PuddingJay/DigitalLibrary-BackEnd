// const Sequelize = require('sequelize')
// var mysql2 = require('mysql2')

// const database = new Sequelize('digital_library', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
// })

// module.exports = database

const Sequelize = require('sequelize')

const db = new Sequelize('n1561892_digital_library', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})

module.exports = db
