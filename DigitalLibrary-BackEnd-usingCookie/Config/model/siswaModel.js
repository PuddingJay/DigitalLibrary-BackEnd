const Sequelize = require("sequelize");
const db = require("../database/db.js")

const siswa = db.define(
  "siswa",
  {
    NIS: { type: Sequelize.INTEGER, primaryKey: true },
    Nama: Sequelize.STRING,
    password: Sequelize.TEXT,
    Kelas: Sequelize.STRING,
    Jurusan: Sequelize.STRING,
    jumlahPinjam: Sequelize.INTEGER,
    waktuPinjam: Sequelize.DATE,
    refreshToken: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

siswa.removeAttribute("id");

module.exports = siswa;
