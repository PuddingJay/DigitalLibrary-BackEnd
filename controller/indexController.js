const booksController = require('./booksController')
const siswaController = require('./siswaController')
const peminjamanController = require('./peminjamanController')
// import adminController from "./adminController.js";
// import RefreshToken from './RefreshToken.js';
const adminController = require('./adminController')
const RefreshToken = require('./RefreshToken')
const refreshTokenSiswa = require('./refreshTokenSiswa')
const saranController = require('./saranController')

const komentarController = require('./komentarController')
const riwayatController = require('./riwayatController')

const controller = {
  booksController: booksController,
  siswaController: siswaController,
  peminjamanController: peminjamanController,
  adminController: adminController,
  RefreshToken: RefreshToken,
  refreshTokenSiswa: refreshTokenSiswa,
  saranController: saranController,
  komentarController: komentarController,
  riwayatController: riwayatController,
}

module.exports = controller
