import express from "express";
import multer from "multer";
// import path from "path";
// import db from "../Config/database/db.js";
import controller from "../controller/indexController.js";
import { verifyToken } from '../middleware/verifyToken.js';
// import { refreshToken } from '../controller/RefreshToken.js'

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

const storagePdf = multer.diskStorage({
  destination: function (req, filePdf, cb) {
    cb(null, './asset/file_ebook') // Menyimpan file di folder
  },
  filename: function (req, filePdf, cb) {
    cb(null, Date.now() + '-' + filePdf.originalname) // Mengatur nama file dengan timestamp
  },
})

const uploadPdf = multer({ storage: storagePdf })

router.get('/book/:kodeBuku', controller.booksController.getOne)
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
  '/book/:kodeBuku',
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
router.delete('/book/:kodeBuku', controller.booksController.delete)

router.get('/siswa/:NIS', controller.siswaController.getOne)
router.get('/siswa/', controller.siswaController.getAll)
router.get('/siswa/:search', controller.siswaController.getSearch)
router.post('/siswa/', controller.siswaController.post)
router.put('/siswa/:NIS', controller.siswaController.put)
router.delete('/siswa/:NIS', controller.siswaController.delete)
router.post('/siswa/login', controller.siswaController.login)

router.get('/peminjaman/', controller.peminjamanController.getAll)
router.get('/peminjaman/:idPeminjaman', controller.peminjamanController.getOne)
router.post('/peminjaman/', controller.peminjamanController.post)
router.put('/peminjaman/:idPeminjaman', controller.peminjamanController.put)
router.delete('/peminjaman/:idPeminjaman', controller.peminjamanController.delete)

router.get('/admin', verifyToken, controller.adminController.getAdmin)
router.post('/admin', controller.adminController.register)
router.post('/login', controller.adminController.login)
router.get('/token', controller.RefreshToken.refreshToken)
// eslint-disable-next-line prettier/prettier
router.delete('/logout', controller.adminController.logout)

router.get('/peminjaman/', controller.peminjamanController.getAll);
router.get('/peminjaman/:idPeminjaman', controller.peminjamanController.getOne);
router.post('/peminjaman/', controller.peminjamanController.post);
router.put('/peminjaman/:idPeminjaman', controller.peminjamanController.put);
router.delete('/peminjaman/:idPeminjaman', controller.peminjamanController.delete);


export default router;