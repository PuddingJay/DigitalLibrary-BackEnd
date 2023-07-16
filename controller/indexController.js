import booksController from "./booksController.js";
import siswaController from "./siswaController.js";
import peminjamanController from "./peminjamanController.js";
import adminController from "./adminController.js";
import RefreshToken from './RefreshToken.js';
import refreshTokenSiswa from './refreshTokenSiswa.js'

const controller = {
  booksController: booksController,
  siswaController: siswaController,
  peminjamanController: peminjamanController,
  adminController: adminController,
  RefreshToken: RefreshToken,
  refreshTokenSiswa: refreshTokenSiswa,
}

export default controller;
