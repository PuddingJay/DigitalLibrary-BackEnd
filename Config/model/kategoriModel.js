const Sequelize = require('sequelize')
const db = require('../database/db.js')
const buku = require('./booksModel.js')

const kategoribuku = db.define(
  'kategori',
  {
    idKategori: { type: Sequelize.INTEGER, primaryKey: true },
    nama: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

module.exports = kategoribuku
