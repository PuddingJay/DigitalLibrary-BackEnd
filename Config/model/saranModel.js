const { DataTypes } = require('sequelize')
const db = require('../database/db')
const siswa = require('./siswaModel.js')

const kotaksaran = db.define(
  'pengadaanbuku',
  {
    idPengadaan: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    judulBuku: { type: DataTypes.STRING, allowNull: false },
    pengarang: { type: DataTypes.STRING, allowNull: false },
    siswa_NIS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: siswa,
        key: 'NIS',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

kotaksaran.belongsTo(siswa, {
  foreignKey: 'siswa_NIS',
  as: 'siswa',
})

module.exports = kotaksaran
