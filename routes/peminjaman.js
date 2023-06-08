const express = require('express');
const router = express.Router();
const db = require('../config/database/mysql');
const controller = require('../controller/index');

router.get('/', controller.peminjaman.getAll);
router.get('/:idPeminjaman', controller.peminjaman.getOne);
router.post('/', controller.peminjaman.post);
router.put('/:idPeminjaman', controller.peminjaman.put);
router.delete('/:idPeminjaman', controller.peminjaman.delete);

// router.get('/', (req, res, next) => {
//   var sql = "SELECT * FROM peminjaman";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.status(200).json({
//       message: 'Get Method Peminjaman',
//       data: result
//     });
//   })
// })

// router.get('/:idPeminjaman', (req, res, next) => {
//   const idPeminjaman = req.params.idPeminjaman;
//   var sql = "SELECT * FROM peminjaman WHERE idPeminjaman=" + idPeminjaman;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.status(200).json({
//       message: 'Peminjaman Ditemukan',
//       data: result
//     });
//   })
// })

// router.post('/', (req, res, next) => {
//   const idBuku = req.body.idBuku;
//   const namaPeminjam = req.body.namaPeminjam;
//   const judulBuku = req.body.judulBuku;
//   const tglPinjam = req.body.tglPinjam;
//   const batasPinjam = req.body.batasPinjam;
//   const tglKembali = req.body.tglKembali
//   const status = req.body.status;
//   const denda = req.body.denda;

//   var sql = "INSERT INTO peminjaman (idBuku, namaPeminjam, judulBuku, tglPinjam, batasPinjam, tglKembali, status, denda) VALUES ('" + idBuku + "', '" + namaPeminjam + "', '" + judulBuku + "', '" + tglPinjam + "', '" + batasPinjam + "', '" + tglKembali + "', '" + status + "', '" + denda + "')";

//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.status(200).json({
//       message: 'Berhasil Tambah Data Peminjaman',
//       data: result
//     });
//   })
// })

// router.put('/', (req, res, next) => {
//   const idPeminjaman = req.body.idPeminjaman;
//   const idBuku = req.body.idBuku;
//   const namaPeminjam = req.body.namaPeminjam;
//   const judulBuku = req.body.judulBuku;
//   const tglPinjam = req.body.tglPinjam;
//   const batasPinjam = req.body.batasPinjam;
//   const tglKembali = req.body.tglKembali
//   const status = req.body.status;
//   const denda = req.body.denda;

//   var sql = "UPDATE peminjaman SET idBuku = '" + idBuku + "',  namaPeminjam = '" + namaPeminjam + "', judulBuku = '" + judulBuku + "', tglPinjam = '" + tglPinjam + "', batasPinjam = '" + batasPinjam + "', tglKembali = '" + tglKembali + "', status = '" + status + "', denda = '" + denda + "' WHERE idPeminjaman = '" + idPeminjaman + "'";

//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.status(200).json({
//       message: 'Berhasil Edit Data Peminjaman',
//     });
//   })
// })

// router.delete('/:idPeminjaman', (req, res, next) => {
//   const idPeminjaman = req.params.idPeminjaman;

//   var sql = "DELETE FROM peminjaman WHERE idPeminjaman = '" + idPeminjaman + "'";

//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.status(200).json({
//       message: 'Berhasil Hapus Data Peminjaman',
//     });
//   })
// })

module.exports = router;