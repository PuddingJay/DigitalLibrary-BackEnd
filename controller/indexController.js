const booksController = require('./booksController')
const siswaController = require('./siswaController')
const peminjamanController = require('./peminjamanController')
// import adminController from "./adminController.js";
// import RefreshToken from './RefreshToken.js';
const adminController = require('./adminController')
const RefreshToken = require('./RefreshToken')

const controller = {
  booksController: booksController,
  siswaController: siswaController,
  peminjamanController: peminjamanController,
  adminController: adminController,
  RefreshToken: RefreshToken,
}

module.exports = controller
