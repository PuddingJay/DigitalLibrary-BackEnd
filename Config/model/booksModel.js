import Sequelize from "sequelize";
import db from "../database/db.js";

const books = db.define(
  "books",
  {
    kodeBuku: { type: Sequelize.INTEGER, primaryKey: true },
    judul: Sequelize.STRING,
    penulis: Sequelize.STRING,
    Kategori: Sequelize.STRING,
    tahun_terbit: Sequelize.STRING,
    keterangan: Sequelize.STRING,
    jumlah: Sequelize.INTEGER,
    cover_buku: Sequelize.STRING,
    file_ebook: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

books.removeAttribute("id");

export default books;