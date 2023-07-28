const booksModel = require("./booksModel.js");
const siswaModel = require("./siswaModel.js");
const peminjamanModel = require("./peminjamanModel.js");
const adminModel = require('./adminModel.js');

const models = {
  books: booksModel,
  siswa: siswaModel,
  peminjaman: peminjamanModel,
  admin: adminModel,
};

module.exports = models;
