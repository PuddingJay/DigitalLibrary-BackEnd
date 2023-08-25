/* eslint-disable prettier/prettier */
const { DataTypes } = require('sequelize')
const db = require('../database/db.js')
const books = require('./booksModel.js')
const siswa = require('./siswaModel.js')

const riwayatbaca = db.define(
  'riwayatbaca',
  {
    idRiwayat: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NIS: DataTypes.INTEGER,
    NamaAkun: DataTypes.STRING,
    kodeBukuRiwayat: DataTypes.STRING,
    judulRiwayat: DataTypes.STRING,
    coverRiwayat: DataTypes.STRING,
    tersediaRiwayat: DataTypes.INTEGER,
    TanggalAkses: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

riwayatbaca.belongsTo(books, {
  foreignKey: 'kodeBukuRiwayat',
  as: 'books',
})

riwayatbaca.belongsTo(siswa, {
  foreignKey: 'NIS',
  as: 'siswa',
})

riwayatbaca.removeAttribute('id')

module.exports = riwayatbaca
