import Sequelize from "sequelize";
import db from "../database/db.js";
import books from "./booksModel.js"

const peminjaman = db.define(
  "peminjaman",
  {
    idPeminjaman: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    kodeBuku: Sequelize.STRING,
    NIS: Sequelize.INTEGER,
    namaPeminjam: Sequelize.STRING,
    judulBuku: Sequelize.STRING,
    tglPinjam: Sequelize.DATE,
    batasPinjam: Sequelize.DATE,
    tglKembali: Sequelize.DATE,
    status: Sequelize.STRING,
    denda: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

peminjaman.hasMany(books, {
  foreignKey: 'kodeBuku',
  as: 'books'
})
books.belongsTo(peminjaman, {
  foreignKey: 'kodeBuku',
  as: 'peminjaman'
})

peminjaman.removeAttribute("id");

export default peminjaman;
