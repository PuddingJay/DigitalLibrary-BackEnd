/* eslint-disable prettier/prettier */
const { DataTypes } = require('sequelize')
const db = require('../database/db.js')
const buku = require('./booksModel.js')
const siswa = require('./siswaModel.js')

const riwayatbaca = db.define(
  'membaca',
  {
    siswa_NIS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: siswa,
        key: 'NIS',
      }
    },
    buku_kodeBuku: {
      type: DataTypes.STRING,
      allowNull: false,
      reference: {
        model: buku,
        key: 'kodeBuku',
      }
    },
    idRiwayat: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

riwayatbaca.belongsTo(buku, {
  foreignKey: 'buku_kodeBuku',
  targetKey: 'kodeBuku',
  as: 'buku',
})

riwayatbaca.belongsTo(siswa, {
  foreignKey: 'siswa_NIS',
  targetKey: 'NIS',
  as: 'siswa',
})

riwayatbaca.removeAttribute('id')

module.exports = riwayatbaca
