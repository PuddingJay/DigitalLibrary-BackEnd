import booksModel from "./booksModel.js";
import siswaModel from "./siswaModel.js";
import peminjamanModel from "./peminjamanModel.js";
import adminModel from './adminModel.js';

const models = {
  books: booksModel,
  siswa: siswaModel,
  peminjaman: peminjamanModel,
  admin: adminModel,
};

export default models;