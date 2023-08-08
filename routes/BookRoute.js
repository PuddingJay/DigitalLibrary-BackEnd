const express = require("express");
const multer = require("multer");
const db = require("../Config/database/db.js");
const controller = require("../controller/indexController.js");
const verifyToken = require('../middleware/verifyToken.js');
const tokenSiswa = require('../middleware/tokenSiswa.js');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    if (file.fieldname == 'cover_buku') cb(null, './asset/cover') // Menyimpan file di folder
    if (file.fieldname == 'file_ebook') cb(null, './asset/file_ebook')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Mengatur nama file dengan timestamp
  },
})

const upload = multer({ storage: storage })

// upload excel atau csv
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // Excel (xlsx)
    file.mimetype === 'text/csv') { // csv
    cb(null, true);
  } else {
    cb(new Error('Hanya file Excel (xlsx) dan CSV yang diperbolehkan.'));
  }
};
const uploadExcel = multer({ dest: 'uploads/', fileFilter: fileFilter });

const storagePdf = multer.diskStorage({
  destination: function (req, filePdf, cb) {
    cb(null, './asset/file_ebook') // Menyimpan file di folder
  },
  filename: function (req, filePdf, cb) {
    cb(null, Date.now() + '-' + filePdf.originalname) // Mengatur nama file dengan timestamp
  },
})

const uploadPdf = multer({ storage: storagePdf })

router.get('/book/:idBuku', controller.booksController.getOne)
router.get('/book/pdf/:idBuku', controller.booksController.getPdf)
router.get('/book/', controller.booksController.getAll)
router.get('/book/search/:keyword', controller.booksController.getSearch)
router.post(
  '/book/',
  upload.fields([
    {
      name: 'cover_buku',
      maxCount: 1,
    },
    {
      name: 'file_ebook',
      maxCount: 1,
    },
  ]),
  controller.booksController.post,
)

router.put(
  '/book/:idBuku',
  upload.fields([
    {
      name: 'cover_buku',
      maxCount: 1,
    },
    {
      name: 'file_ebook',
      maxCount: 1,
    },
  ]),
  controller.booksController.put,
)
router.delete('/book/:idBuku', controller.booksController.delete)

router.get('/peminjaman/', controller.peminjamanController.getAll)
router.get('/peminjaman/:idPeminjaman', controller.peminjamanController.getOne)
router.post('/peminjaman/', controller.peminjamanController.post)
router.put('/peminjaman/:idPeminjaman', controller.peminjamanController.put)
router.delete('/peminjaman/:idPeminjaman', controller.peminjamanController.delete)

router.get('/siswa/:NIS', controller.siswaController.getOne)
router.get('/siswa/', controller.siswaController.getAll)
router.get('/siswatoken', tokenSiswa, controller.siswaController.getAll)
router.get('/berhasilLogin/:refreshToken', controller.refreshTokenSiswa.refreshToken)
router.get('/siswa/:search', controller.siswaController.getSearch)
router.post('/siswa/', controller.siswaController.post)
router.post('/import-excel', uploadExcel.single('excelFile'), controller.siswaController.importExcel);
router.post('/siswa-from-excel', controller.siswaController.postExcel)
router.put('/siswa/:NIS', controller.siswaController.put)
router.put('/siswa-update/:siswaId', controller.siswaController.updatePassword)
router.delete('/siswa/:NIS', controller.siswaController.delete)
router.post('/siswa/login', controller.siswaController.login)
router.delete('/siswaLogout/:refreshToken', controller.siswaController.logout)

router.get('/admin', verifyToken, controller.adminController.getAdmin)
router.post('/admin', controller.adminController.register)
router.post('/login', controller.adminController.login)
router.get('/token/:refreshToken', controller.RefreshToken.refreshToken)
router.put('/admin-update/:adminId', controller.adminController.updateAdmin)
// eslint-disable-next-line prettier/prettier
router.delete('/logout/:refreshToken', controller.adminController.logout)

router.get('/booking-pinjam', controller.bookingPinjamController.getAll)
router.post('/booking-pinjam', controller.bookingPinjamController.post)
router.delete('/booking-pinjam/:idBookingPinjam', controller.bookingPinjamController.delete)

module.exports = router;