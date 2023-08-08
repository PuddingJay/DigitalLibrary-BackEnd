const booksModel = require("./booksModel.js");
const siswaModel = require("./siswaModel.js");
const peminjamanModel = require("./peminjamanModel.js");
const adminModel = require('./adminModel.js');
const bookingPinjamModel = require('./bookingPinjamModel.js');

const models = {
  books: booksModel,
  siswa: siswaModel,
  peminjaman: peminjamanModel,
  admin: adminModel,
  bookingPinjam: bookingPinjamModel,
};

module.exports = models;
