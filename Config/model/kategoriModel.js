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

// kategoribuku.belongsTo(buku, {
//   foreignKey: 'kategori_idKategori',
//   targetKey: 'idKategori',
//   as: 'kategori'
// })

module.exports = kategoribuku
