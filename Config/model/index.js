<<<<<<< HEAD
// import booksModel from "./booksModel.js";
// import siswaModel from "./siswaModel.js";
// import peminjamanModel from "./peminjamanModel.js";
// import adminModel from './adminModel.js';
const booksModel = require('./booksModel')
const siswaModel = require('./siswaModel')
const peminjamanModel = require('./peminjamanModel')
const adminModel = require('./adminModel.js')
=======
import booksModel from "./booksModel.js";
import siswaModel from "./siswaModel.js";
import peminjamanModel from "./peminjamanModel.js";
import adminModel from './adminModel.js';
>>>>>>> d34412fd458825c51ecbed8edd028779be026cbd

const models = {
  books: booksModel,
  siswa: siswaModel,
  peminjaman: peminjamanModel,
  admin: adminModel,
<<<<<<< HEAD
}

module.exports = models
=======
};

export default models;
>>>>>>> d34412fd458825c51ecbed8edd028779be026cbd
