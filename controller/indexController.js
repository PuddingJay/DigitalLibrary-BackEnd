const booksController = require("./booksController");
const siswaController = require("./siswaController");
const peminjamanController = require ("./peminjamanController");

const controller = {
  booksController: booksController,
  siswaController: siswaController,
  peminjamanController : peminjamanController,
};

module.exports = controller;
