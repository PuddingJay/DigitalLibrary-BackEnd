/* eslint-disable prettier/prettier */
// import booksModel from "./booksModel.js";
// import siswaModel from "./siswaModel.js";
// import peminjamanModel from "./peminjamanModel.js";
// import adminModel from './adminModel.js';
const booksModel = require('./booksModel')
const siswaModel = require('./siswaModel')
const peminjamanModel = require('./peminjamanModel')
const adminModel = require('./adminModel.js')
const saranModel = require('./saranModel.js')
const komentarModel = require('./komentarModel')
const riwayatModel = require('./riwayatModel')
const kategoribuku = require('./kategoriModel')
const bookingPinjamModel = require('./bookingPinjamModel')
const pengunjungModel = require('./pengunjungModel')

const models = {
  books: booksModel,
  siswa: siswaModel,
  peminjaman: peminjamanModel,
  admin: adminModel,
  kotaksaran: saranModel,
  komentar: komentarModel,
  riwayatbaca: riwayatModel,
  kategoribuku: kategoribuku,
  bookingPinjam: bookingPinjamModel,
  pengunjung: pengunjungModel,
}

module.exports = models
