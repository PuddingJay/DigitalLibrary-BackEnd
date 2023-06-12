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
    if (file.fieldname === "cover_buku") {
      cb(null, "./asset/cover");
    } else if (file.fieldname === "file_ebook") {
      cb(null, "./asset/file_ebook");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const storagePdf = multer.diskStorage({
  destination: function (req, filePdf, cb) {
    cb(null, "./asset/file_ebook");
  },
  filename: function (req, filePdf, cb) {
    cb(null, Date.now() + "-" + filePdf.originalname);
  },
});

const uploadPdf = multer({ storage: storagePdf });

router.get("/book/:kode_buku", controller.booksController.getOne);
router.get("/book/", controller.booksController.getAll);
router.get("/book/:search", controller.booksController.getSearch);
router.post(
  "/book/",
  upload.fields([{ name: "cover_buku", maxCount: 1 }, { name: "file_ebook", maxCount: 1 }]),
  controller.booksController.post
);
router.put(
  "/book/:kode_buku",
  upload.fields([{ name: "cover_buku", maxCount: 1 }, { name: "file_ebook", maxCount: 1 }]),
  controller.booksController.put
);
router.delete("/book/:kode_buku", controller.booksController.delete);

router.get("/siswa/:NIS", controller.siswaController.getOne);
router.get("/siswa/", controller.siswaController.getAll);
router.get("/siswa/:search", controller.siswaController.getSearch);
router.post("/siswa/", controller.siswaController.post);
router.put("/siswa/:NIS", controller.siswaController.put);
router.delete("/siswa/:NIS", controller.siswaController.delete);

router.get("/peminjaman/", controller.peminjamanController.getAll);
router.get("/peminjaman/:idPeminjaman", controller.peminjamanController.getOne);
router.post("/peminjaman/", controller.peminjamanController.post);
router.put("/peminjaman/:idPeminjaman", controller.peminjamanController.put);
router.delete("/peminjaman/:idPeminjaman", controller.peminjamanController.delete);

router.get('/admin', verifyToken, controller.adminController.getAdmin);
router.post('/admin', controller.adminController.register);
router.post('/login', controller.adminController.login);
router.get('/token', controller.RefreshToken.refreshToken);
router.delete('/logout', controller.adminController.logout);

export default router;