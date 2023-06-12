// const Sequelize = require('sequelize');
// const db = require('../database/mysql');

// var peminjaman = db.define('peminjaman',
//   {
//     idPeminjaman: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     idBuku: Sequelize.STRING,
//     namaPeminjam: Sequelize.STRING,
//     judulBuku: Sequelize.STRING,
//     tglPinjam: Sequelize.DATE,
//     batasPinjam: Sequelize.DATE,
//     tglKembali: Sequelize.DATE,
//     status: Sequelize.STRING,
//     denda: Sequelize.STRING,
//   }, {
//   freezeTableName: true,
//   timestamps: false
// });

// peminjaman.removeAttribute('id');
// module.exports = peminjaman;