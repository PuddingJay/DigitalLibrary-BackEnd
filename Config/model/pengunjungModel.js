const Sequelize = require("sequelize")
const db = require("../database/db")

const pengunjung = db.define(
  "pengunjung",
  {
    idPengunjung: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    NIS: Sequelize.INTEGER,
    nama: Sequelize.STRING,
    kelas: Sequelize.STRING,
    waktuKunjung: Sequelize.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

pengunjung.removeAttribute("id");

module.exports = pengunjung;