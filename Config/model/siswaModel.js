const Sequelize = require("sequelize");
const db = require("../database/db");

var siswa = db.define(
  "siswa",
  {
    NIS: Sequelize.INTEGER,
    Nama: Sequelize.STRING,
    Kelas: Sequelize.STRING,
    Jurusan: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

siswa.removeAttribute("id");
module.exports = siswa;
