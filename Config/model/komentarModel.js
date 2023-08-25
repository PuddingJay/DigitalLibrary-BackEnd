/* eslint-disable prettier/prettier */
const { DataTypes } = require('sequelize')
const db = require('../database/db.js')
const books = require('./booksModel.js')

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

komentar.hasMany(books, {
  foreignKey: 'kodeBuku',
  as: 'books',
})
books.belongsTo(komentar, {
  foreignKey: 'kodeBuku',
  as: 'komentar',
})

komentar.removeAttribute('id')

module.exports = komentar
