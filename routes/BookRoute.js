/* eslint-disable prettier/prettier */
const express = require('express')
const router = express.Router()
const db = require('../Config/database/db')
const controller = require('../controller/indexController')

const verifyToken = require('../middleware/verifyToken.js')
const tokenSiswa = require('../middleware/tokenSiswa')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    if (file.fieldname == 'cover') cb(null, './asset/cover') // Menyimpan file di folder
    if (file.fieldname == 'berkasBuku') cb(null, './asset/file_ebook')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Mengatur nama file dengan timestamp
  },
})
const ImageFilter = (req, file, cb) => {
  // Supported mimetypes for PDF and images
  const supportedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']

  if (supportedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Hanya file PDF dan gambar (jpg, png, jpeg) yang diperbolehkan.'))
  }
}

const upload = multer({ storage: storage, fileFilter: ImageFilter })

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // Excel (xlsx)
    file.mimetype === 'text/csv'
  ) {
    // csv
    cb(null, true)
  } else {
    cb(new Error('Hanya file Excel (xlsx) dan CSV yang diperbolehkan.'))
  }
}
const uploadExcel = multer({ dest: 'uploads/', fileFilter: fileFilter })

router.get('/book/:kodeBuku', controller.booksController.getOne)
router.get('/book/pdf/:kodeBuku', controller.booksController.getPdf)
router.get('/book/', controller.booksController.getAll)
// router.get('/book/search/:keyword', controller.booksController.getSearch)
router.get('/ApprovedBook/', controller.booksController.getDisetujui)
router.get('/topBooks/', controller.booksController.getLikes)
router.post(
  '/book/',
  upload.fields([
    {
      name: 'cover',
      maxCount: 1,
    },
    {
      name: 'berkasBuku',
      maxCount: 1,
    },
  ]),
  controller.booksController.post,
)
router.put(
  '/book/:kodeBuku',
  upload.fields([
    {
      name: 'cover',
      maxCount: 1,
    },
    {
      name: 'berkasBuku',
      maxCount: 1,
    },
  ]),
  controller.booksController.put,
)
router.delete('/book/:kodeBuku', controller.booksController.delete)
router.get('/topBooks', controller.booksController.getLikes)
router.put('/updateTop/:kodeBuku', controller.booksController.putLike)
router.put('/updateApprove/:kodeBuku', controller.booksController.putApprove)
router.put('/updateRejected/:kodeBuku', controller.booksController.putRejected)
router.get('/check-kodeBuku/:kodeBuku', controller.booksController.checkKodeBuku)

router.get('/kategori', controller.kategoriController.getAll)
router.get('/kategori/:idKategori', controller.kategoriController.getOne)
router.post('/kategori', controller.kategoriController.post)
router.delete('/kategori/:idKategori', controller.kategoriController.delete)
router.put('/kategori/:idKategori', controller.kategoriController.put)

router.get('/peminjaman/', controller.peminjamanController.getAll)
router.get('/peminjaman/:NIS', controller.peminjamanController.getOnSiswa)
router.post('/peminjaman/', controller.peminjamanController.post)
router.put('/peminjaman/:idPeminjaman', controller.peminjamanController.put)
router.delete('/peminjaman/:idPeminjaman', controller.peminjamanController.delete)

router.get('/kotaksaran', controller.saranController.getAll)
router.get('/kotaksaran/:idPengadaan', controller.saranController.getOne)
router.post('/kotaksaran', controller.saranController.post)
// router.put('/kotaksaran/:idSaran', controller.saranController.put)
router.delete('/kotaksaran/:idPengadaan', controller.saranController.delete)

router.get('/komentar', controller.komentarController.getAll)
router.get('/komentar/:buku_kodeBuku', controller.komentarController.getOne)
router.post('/komentar', controller.komentarController.post)
router.put('/komentar/:idKomentar', controller.komentarController.put)
router.delete('/komentar/:idKomentar', controller.komentarController.delete)

router.get('/history', controller.riwayatController.getAll)
router.get('/historyTanggal', controller.riwayatController.getbyTanggal)
router.get('/history/:siswa_NIS', controller.riwayatController.getOne)
const history = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './asset/riwayat') // Menyimpan file di folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Mengatur nama file dengan timestamp
  },
})

const uploadHistory = multer({ storage: history })
router.post('/history/', controller.riwayatController.post)
router.delete('/history/:idRiwayat', controller.riwayatController.delete)

router.get('/siswa/:refreshToken', controller.siswaController.getOne)
router.get('/siswa/', controller.siswaController.getAll)
router.get('/siswatoken', tokenSiswa, controller.siswaController.getAll)
router.get('/berhasilLogin/:refreshToken', controller.refreshTokenSiswa.refreshToken)
router.post('/siswa/', controller.siswaController.register)
router.post(
  '/import-excel',
  uploadExcel.single('excelFile'),
  controller.siswaController.importExcel,
)
router.post('/siswa-from-excel', controller.siswaController.postExcel)
router.get('/siswa/:refreshToken', controller.siswaController.getOne)
router.put('/siswa/:NIS', controller.siswaController.put)
router.put('/siswa-update/:siswaId', controller.siswaController.updatePassword)
router.put('/siswa-naik-kelas', controller.siswaController.naikKelas)
router.delete('/siswa/:id', controller.siswaController.delete)
router.post('/siswa/login', controller.siswaController.login)
router.delete('/siswaLogout/:refreshToken', controller.siswaController.logout)

router.get('/data-pengunjung', controller.pengunjungController.getAll)
router.post('/add-data-pengunjung', controller.pengunjungController.post)
router.delete('/data-pengunjung/:idPengunjung', controller.pengunjungController.delete)

router.get('/admin', verifyToken, controller.adminController.getAdmin)
router.post('/admin', controller.adminController.register)
router.post('/login', controller.adminController.login)
router.get('/token/:refreshToken', controller.RefreshToken.refreshToken)
router.put('/admin-update/:adminId', controller.adminController.updateAdmin)
router.delete('/logout/:refreshToken', controller.adminController.logout)

router.get('/booking-pinjam', controller.bookingPinjamController.getAll)
router.post('/booking-pinjam', controller.bookingPinjamController.post)
router.put('/booking-pinjam/:idReservasi', controller.bookingPinjamController.put)
router.delete('/booking-pinjam/:idReservasi', controller.bookingPinjamController.delete)

module.exports = router
