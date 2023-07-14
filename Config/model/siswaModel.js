const Sequelize = require('sequelize')
const db = require('../database/db')

var siswa = db.define(
  'siswa',
  {
    NIS: Sequelize.INTEGER,
    Nama: Sequelize.STRING,
    password: Sequelize.TEXT,
    Kelas: Sequelize.STRING,
    Jurusan: Sequelize.STRING,
    refreshToken: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

siswa.removeAttribute('id')
module.exports = siswa
