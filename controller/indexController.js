const booksController = require("./booksController.js");
const siswaController = require("./siswaController.js");
const pengunjungController = require("./pengunjungController.js");
const peminjamanController = require("./peminjamanController.js");
const adminController = require("./adminController.js");
const RefreshToken = require('./RefreshToken.js');
const refreshTokenSiswa = require('./refreshTokenSiswa.js');
const bookingPinjamController = require('./bookingPinjamController.js');

const controller = {
  booksController: booksController,
  siswaController: siswaController,
  pengunjungController: pengunjungController,
  peminjamanController: peminjamanController,
  adminController: adminController,
  RefreshToken: RefreshToken,
  refreshTokenSiswa: refreshTokenSiswa,
  bookingPinjamController: bookingPinjamController,
};

module.exports = controller;
