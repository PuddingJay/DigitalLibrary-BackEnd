/* eslint-disable prettier/prettier */
const { DataTypes } = require('sequelize')
const db = require('../database/db.js')
const buku = require('./booksModel.js')
const siswa = require('./siswaModel.js')

const komentar = db.define(
  'mengomentari',
  {
    siswa_NIS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: siswa,
        key: 'NIS',
      },
    },
    buku_kodeBuku: {
      type: DataTypes.STRING,
      allowNull: false,
      reference: {
        model: buku,
        key: 'kodeBuku',
      },
    },
    idKomentar: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    teksKomentar: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

komentar.belongsTo(buku, {
  foreignKey: 'buku_kodeBuku',
  as: 'buku',
})

komentar.belongsTo(siswa, {
  foreignKey: 'siswa_NIS',
  as: 'komentarsiswa',
})

komentar.removeAttribute('id')

module.exports = komentar
