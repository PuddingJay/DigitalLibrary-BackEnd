const booksController = require("./booksController.js");
const siswaController = require("./siswaController.js");
const peminjamanController = require("./peminjamanController.js");
const adminController = require("./adminController.js");
const RefreshToken = require('./RefreshToken.js');
const refreshTokenSiswa = require('./refreshTokenSiswa.js');

const controller = {
  booksController: booksController,
  siswaController: siswaController,
  peminjamanController: peminjamanController,
  adminController: adminController,
  RefreshToken: RefreshToken,
  refreshTokenSiswa: refreshTokenSiswa,
};

module.exports = controller;
