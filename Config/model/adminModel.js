/* eslint-disable prettier/prettier */
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

// eslint-disable-next-line prettier/prettier
module.exports = admin
