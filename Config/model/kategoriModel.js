const Sequelize = require('sequelize')
const db = require('../database/db.js')

const kategoribuku = db.define(
  'kategoribuku',
  {
    idKategori: { type: Sequelize.INTEGER, primaryKey: true },
    Kategori: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

module.exports = kategoribuku
