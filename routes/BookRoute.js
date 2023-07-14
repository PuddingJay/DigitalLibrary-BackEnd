/* eslint-disable prettier/prettier */
const express = require('express')
const router = express.Router()
const db = require('../Config/database/db')
const controller = require('../controller/indexController')
// import controller from "../controller/indexController.js";
// import { verifyToken } from '../middleware/verifyToken.js';
const verifyToken = require('../middleware/verifyToken.js')
const tokenSiswa = require('../middleware/tokenSiswa')
const multer = require('multer')
const path = require('path')
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
router.get('/berhasilLogin', controller.refreshTokenSiswa.refreshToken)
router.get('/siswa/:search', controller.siswaController.getSearch)
router.post('/siswa/', controller.siswaController.post)
router.put('/siswa/:NIS', controller.siswaController.put)
router.delete('/siswa/:NIS', controller.siswaController.delete)
router.post('/siswa/login', controller.siswaController.login)
router.delete('/siswa/logout', controller.siswaController.logout)

router.get('/admin', verifyToken, controller.adminController.getAdmin)
router.post('/admin', controller.adminController.register)
router.post('/login', controller.adminController.login)
router.get('/token', controller.RefreshToken.refreshToken)
// eslint-disable-next-line prettier/prettier
router.delete('/logout', controller.adminController.logout)

module.exports = router

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, './files');
//     },
//     filename(req, file, cb) {
//       cb(null, `${new Date().getTime()}_${file.originalname}`);
//     }
//   }),
//   limits: {
//     fileSize: 1000000 // max file size 1MB = 1000000 bytes
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
//       return cb(
//         new Error(
//           'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
//         )
//       );
//     }
//     cb(undefined, true); // continue with upload
//   }
// });

// Router.post(
//   '/upload',
//   upload.single('file'),
//   async (req, res) => {
//     try {
//       const { title, description } = req.body;
//       const { path, mimetype } = req.file;
//       const file = new File({
//         title,
//         description,
//         file_path: path,
//         file_mimetype: mimetype
//       });
//       await file.save();
//       res.send('file uploaded successfully.');
//     } catch (error) {
//       res.status(400).send('Error while uploading file. Try again later.');
//     }
//   },
//   (error, req, res, next) => {
//     if (error) {
//       res.status(500).send(error.message);
//     }
//   }
// );
