import Sequelize from "sequelize";
import db from "../database/db.js";


const siswa = db.define(
  "siswa",
  {
    NIS: { type: Sequelize.INTEGER, primaryKey: true },
    Nama: Sequelize.STRING,
    Kelas: Sequelize.STRING,
    Jurusan: Sequelize.STRING,
    jumlahPinjam: Sequelize.INTEGER,
    waktuPinjam: Sequelize.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

siswa.removeAttribute("id");

export default siswa;