const { DataTypes } = require("sequelize");
const db = require("../database/db.js");
const buku = require("./booksModel.js");
const siswa = require("./siswaModel.js");

const meminjam = db.define(
  "meminjam",
  {
    Buku_kodeBuku: {
      type: DataTypes.STRING,
      allowNull: false,
      reference: {
        model: buku,
        key: 'kodeBuku',
      }
    },
    Siswa_NIS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: siswa,
        key: 'NIS',
      }
    },
    idPeminjaman: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tglPinjam: DataTypes.DATE,
    batasPinjam: DataTypes.DATE,
    tglKembali: DataTypes.DATE,
    status: DataTypes.STRING,
    denda: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

meminjam.belongsTo(buku, { foreignKey: 'Buku_kodeBuku', as: 'buku' });
meminjam.belongsTo(siswa, { foreignKey: 'Siswa_NIS', as: 'siswa' });

// peminjaman.sync()
// peminjaman.hasMany(books, {
//   foreignKey: 'kodeBuku',
//   as: 'books'
// });
// books.belongsTo(peminjaman, {
//   foreignKey: 'kodeBuku',
//   as: 'peminjaman'
// });

meminjam.removeAttribute("id");

module.exports = meminjam;
