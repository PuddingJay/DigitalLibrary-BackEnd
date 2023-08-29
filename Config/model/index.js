const booksModel = require('./booksModel')
const siswaModel = require('./siswaModel')
const peminjamanModel = require('./peminjamanModel')
const saranModel = require('./saranModel.js')
const komentarModel = require('./komentarModel')
const riwayatModel = require('./riwayatModel')
const kategoribuku = require('./kategoriModel')
const bookingPinjamModel = require('./bookingPinjamModel')
const pengunjungModel = require('./pengunjungModel')
const akunModel = require('./akunModel.js')

const models = {
  buku: booksModel,
  siswa: siswaModel,
  meminjam: peminjamanModel,
  kotaksaran: saranModel,
  komentar: komentarModel,
  riwayatbaca: riwayatModel,
  kategoribuku: kategoribuku,
  bookingPinjam: bookingPinjamModel,
  pengunjung: pengunjungModel,
  akun: akunModel,
}

module.exports = models
