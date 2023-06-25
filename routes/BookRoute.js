const express = require("express");
const router = express.Router();
const db = require("../Config/database/db");
const controller = require("../controller/indexController");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    if(file.fieldname == 'cover_buku')
      cb(null, "./asset/cover"); // Menyimpan file di folder
    if(file.fieldname == 'file_ebook')
      cb(null, "./asset/file_ebook")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Mengatur nama file dengan timestamp
  },
});

const upload = multer({ storage: storage });




  const storagePdf = multer.diskStorage({
    destination: function (req, filePdf, cb) {
      cb(null, "./asset/file_ebook"); // Menyimpan file di folder
    },
    filename: function (req, filePdf, cb) {
      cb(null, Date.now() + "-" + filePdf.originalname); // Mengatur nama file dengan timestamp
    },
  });
  
  const uploadPdf = multer({ storage: storagePdf });

router.get("/book/:idBuku", controller.booksController.getOne);
router.get("/book/pdf/:idBuku",controller.booksController.getPdf)
router.get("/book/", controller.booksController.getAll);
router.get("/book/search/:keyword", controller.booksController.getSearch);
router.post("/book/", upload.fields([
  {
    name: 'cover_buku', maxCount: 1
  },
  {
    name: 'file_ebook', maxCount: 1
  }
]),  controller.booksController.post);

router.put("/book/:idBuku", upload.fields([
  {
    name : 'cover_buku', maxCount: 1
  }, 
  {
    name : 'file_ebook', maxCount : 1
  }
]), controller.booksController.put);
router.delete("/book/:idBuku", controller.booksController.delete);

router.get("/siswa/:NIS", controller.siswaController.getOne);
router.get("/siswa/", controller.siswaController.getAll);
router.get("/siswa/:search", controller.siswaController.getSearch);
router.post("/siswa/", controller.siswaController.post);
router.put("/siswa/:NIS", controller.siswaController.put);
router.delete("/siswa/:NIS", controller.siswaController.delete);
router.post("/siswa/login", controller.siswaController.login);

router.get('/peminjaman/', controller.peminjamanController.getAll);
router.get('/peminjaman/:idPeminjaman', controller.peminjamanController.getOne);
router.post('/peminjaman/', controller.peminjamanController.post);
router.put('/peminjaman/:idPeminjaman', controller.peminjamanController.put);
router.delete('/peminjaman/:idPeminjaman', controller.peminjamanController.delete);


module.exports = router;
