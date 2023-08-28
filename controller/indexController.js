const booksController = require('./booksController')
const siswaController = require('./siswaController')
const peminjamanController = require('./peminjamanController')

const adminController = require('./adminController')
const RefreshToken = require('./RefreshToken')
const refreshTokenSiswa = require('./refreshTokenSiswa')
const saranController = require('./saranController')
const pengunjungController = require("./pengunjungController.js");
const bookingPinjamController = require('./bookingPinjamController.js');
const komentarController = require('./komentarController')
const riwayatController = require('./riwayatController')
const kategoriController = require('./kategoriController')

const controller = {
  booksController: booksController,
  siswaController: siswaController,
  pengunjungController: pengunjungController,
  peminjamanController: peminjamanController,
  adminController: adminController,
  RefreshToken: RefreshToken,
  refreshTokenSiswa: refreshTokenSiswa,
  saranController: saranController,
  komentarController: komentarController,
  riwayatController: riwayatController,
  kategoriController: kategoriController,
  bookingPinjamController: bookingPinjamController,
}

>>>>>>> origin/master
