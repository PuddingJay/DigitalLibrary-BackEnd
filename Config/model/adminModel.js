const Sequelize = require('sequelize')
const db = require('../database/db')
const admin = db.define(
  'admin',
  {
    name: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    refreshToken: Sequelize.TEXT,
    role: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

module.exports = admin
