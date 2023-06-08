const booksModel = require("./booksModel");
const siswaModel = require("./siswaModel");
const peminjamanModel = require("./peminjamanModel");

const models = {
  books: booksModel,
  siswa: siswaModel,
  peminjaman: peminjamanModel,
};

module.exports = models;
