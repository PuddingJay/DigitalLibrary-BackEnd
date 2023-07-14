const Sequelize = require('sequelize')
const db = require('../database/db')

var books = db.define(
  'books',
  {
    idBuku: Sequelize.INTEGER,
    kodeBuku: Sequelize.STRING,
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
  },
)

books.removeAttribute('id')
module.exports = books
