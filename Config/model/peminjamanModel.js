const { DataTypes } = require("sequelize");
const db = require("../database/db.js");
const books = require("./booksModel.js");

const peminjaman = db.define(
  "peminjaman",
  {
    idPeminjaman: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    kodeBuku: DataTypes.STRING,
    NIS: DataTypes.INTEGER,
    namaPeminjam: DataTypes.STRING,
    judulBuku: DataTypes.STRING,
    tglPinjam: DataTypes.DATE,
    batasPinjam: DataTypes.DATE,
    tglKembali: DataTypes.DATE,
    status: DataTypes.STRING,
    denda: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

peminjaman.hasMany(books, {
  foreignKey: 'kodeBuku',
  as: 'books'
});
books.belongsTo(peminjaman, {
  foreignKey: 'kodeBuku',
  as: 'peminjaman'
});

peminjaman.removeAttribute("id");

module.exports = peminjaman;
