const Sequelize = require('sequelize')
const db = require('../database/db')
const siswa = require('./siswaModel.js')

const kotaksaran = db.define(
  'pengadaanbuku',
  {
    idPengadaan: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    judulBuku: { type: Sequelize.STRING, allowNull: false },
    pengarang: { type: Sequelize.STRING, allowNull: false },
    siswa_NIS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: siswa,
        key: 'NIS',
      }
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
// siswa.belongsTo(kotaksaran, {
//   foreignKey: 'NIS',
//   as: 'kotaksaran',
// })

module.exports = kotaksaran
