const { DataTypes } = require('sequelize')
const db = require('../database/db.js')
const kategori = require('./kategoriModel.js')

const buku = db.define(
  'buku',
  {
    kodeBuku: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    judul: DataTypes.STRING,
    penulis: DataTypes.STRING,
    ringkasan: DataTypes.STRING,
    tahunTerbit: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    jumlah: DataTypes.INTEGER,
    tersedia: DataTypes.INTEGER,
    cover: DataTypes.STRING,
    berkasBuku: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    likes: DataTypes.INTEGER,
    isApproval: DataTypes.ENUM('Disetujui', 'Belum Disetujui', 'Ditolak'),
    kategori_idKategori: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

buku.belongsTo(kategori, {
  foreignKey: 'kategori_idKategori',
  as: 'kategori',
})

buku.removeAttribute('id')

module.exports = buku
