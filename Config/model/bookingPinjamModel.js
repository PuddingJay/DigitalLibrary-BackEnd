const { DataTypes } = require("sequelize");
const db = require("../database/db.js")

const bookingPinjam = db.define(
  "bookingpinjam",
  {
    idBookingPinjam: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    kodeBuku: DataTypes.STRING,
    judulBuku: DataTypes.STRING,
    NIS: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    waktuBooking: DataTypes.DATE,
    batasBooking: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

bookingPinjam.removeAttribute("id");

module.exports = bookingPinjam;
