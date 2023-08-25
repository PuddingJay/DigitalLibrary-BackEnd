const Sequelize = require('sequelize')
const db = require('../database/db')
const siswa = require('./siswaModel.js')

const kotaksaran = db.define(
  'kotaksaran',
  {
    idSaran: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    NIS: { type: Sequelize.INTEGER, allowNull: false }, // Set NIS to auto-generate and not nullable
    pemberiSaran: { type: Sequelize.STRING, allowNull: false }, // Set pemberiSaran to not nullable
    saranJudulBuku: { type: Sequelize.STRING, allowNull: false }, // Set saranJudulBuku to not nullable
    saranPengarangBuku: { type: Sequelize.STRING, allowNull: false }, // Set saranPengarangBuku to not nullable
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

kotaksaran.hasMany(siswa, {
  foreignKey: 'NIS',
  as: 'siswa',
})
siswa.belongsTo(kotaksaran, {
  foreignKey: 'NIS',
  as: 'kotaksaran',
})

module.exports = kotaksaran
