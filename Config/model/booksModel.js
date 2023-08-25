const Sequelize = require('sequelize')
const db = require('../database/db.js')

const books = db.define(
  'books',
  {
    idBuku: Sequelize.INTEGER,
    kodeBuku: { type: Sequelize.INTEGER, primaryKey: true },
    judul: Sequelize.STRING,
    penulis: Sequelize.STRING,
    Kategori: Sequelize.STRING,
    ringkasan: Sequelize.STRING,
    tahun_terbit: Sequelize.STRING,
    keterangan: Sequelize.STRING,
    jumlah: Sequelize.INTEGER,
    tersedia: Sequelize.INTEGER,
    cover_buku: Sequelize.STRING,
    file_ebook: Sequelize.STRING,
    likes: Sequelize.INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

books.removeAttribute('id')

module.exports = books
