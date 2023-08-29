const { DataTypes } = require("sequelize");
const db = require("../database/db.js")
const buku = require('./booksModel.js')
const siswa = require('./siswaModel.js')

const bookingPinjam = db.define(
  "reservasipinjam",
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
    idReservasi: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tglPemesanan: DataTypes.DATE,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

bookingPinjam.removeAttribute("id");

module.exports = bookingPinjam;
