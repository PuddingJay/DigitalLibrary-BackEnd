const { DataTypes } = require("sequelize");
const db = require("../database/db.js")
const akun = require("./akunModel.js")

const siswa = db.define(
  "siswa",
  {
    NIS: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM('Aktif', 'NonAktif'),
      defaultValue: 'Aktif'
    },
    jumlahPinjam: DataTypes.INTEGER,
    waktuPinjam: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

siswa.removeAttribute("id");

module.exports = siswa;
