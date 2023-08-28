/* eslint-disable prettier/prettier */
const { DataTypes } = require('sequelize')
const db = require('../database/db.js')
const books = require('./booksModel.js')
const siswa = require('./siswaModel.js')

const komentar = db.define(
  'komentar',
  {
    idKomentar: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    textKomentar: DataTypes.STRING,
    NIS: DataTypes.INTEGER,
    namaKomentator: DataTypes.STRING,
    kodeBuku: DataTypes.STRING,
    judulBuku: DataTypes.STRING,
    waktuKomentar: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

komentar.belongsTo(books, {
  foreignKey: 'kodeBuku',
  as: 'komentar',
})
books.hasMany(komentar, {
  foreignKey: 'kodeBuku',
  as: 'books',
})

komentar.belongsTo(siswa, {
  foreignKey: 'NIS',
  as: 'siswa',
})
siswa.hasMany(komentar, {
  foreignKey: 'NIS',
  as: 'komentar',
})

komentar.removeAttribute('id')

module.exports = komentar
