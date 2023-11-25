/* eslint-disable prettier/prettier */
const { DataTypes } = require('sequelize')
const db = require('../database/db.js')

const siswa = db.define(
  'siswa',
  {
    NIS: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM('Aktif', 'NonAktif'),
      defaultValue: 'Aktif',
    },
    jumlahPinjam: DataTypes.INTEGER,
    waktuPinjam: DataTypes.DATE,
    akun_idAkun: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

siswa.removeAttribute('id')

module.exports = siswa
