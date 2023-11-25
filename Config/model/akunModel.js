const { DataTypes } = require('sequelize')
const db = require('../database/db.js')
const siswa = require('./siswaModel.js')

const akun = db.define(
  'akun',
  {
    idAkun: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    refreshToken: DataTypes.TEXT,
    role: DataTypes.ENUM('admin', 'superadmin', 'siswa'),
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)
akun.removeAttribute('id')

// akun.sync()
// siswa.sync()

module.exports = akun
