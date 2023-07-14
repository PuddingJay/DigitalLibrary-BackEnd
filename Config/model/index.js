// import booksModel from "./booksModel.js";
// import siswaModel from "./siswaModel.js";
// import peminjamanModel from "./peminjamanModel.js";
// import adminModel from './adminModel.js';
const booksModel = require('./booksModel')
const siswaModel = require('./siswaModel')
const peminjamanModel = require('./peminjamanModel')
const adminModel = require('./adminModel.js')

const models = {
  books: booksModel,
  siswa: siswaModel,
  peminjaman: peminjamanModel,
  admin: adminModel,
}

module.exports = models
