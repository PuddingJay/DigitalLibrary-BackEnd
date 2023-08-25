/* eslint-disable prettier/prettier */
const models = require('../Config/model/index')
const controller = {}
const { Op } = require('sequelize')
const db = require('../Config/database/db.js')

controller.getAll = async function (req, res) {
  try {
    let kotaksaran = await db.query(
      'SELECT DISTINCT kotaksaran.idSaran, siswa.NIS, kotaksaran.pemberiSaran, kotaksaran.saranJudulBuku, kotaksaran.saranPengarangBuku FROM kotaksaran JOIN siswa ON kotaksaran.NIS = siswa.NIS;',
    )

    if (kotaksaran.length > 0) {
      // Menghapus data duplikat berdasarkan idSaran
      const uniqueSaran = Array.from(new Set(kotaksaran.map(JSON.stringify))).map(JSON.parse)
      res.status(200).json({
        message: 'Data kotaksaran berhasil diambil',
        data: uniqueSaran.flat(),
      })
    } else {
      res.status(200).json({
        message: 'Tidak Ada Data',
        data: [],
      })
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    })
  }
}

controller.getOne = async function (req, res) {
  try {
    let kotaksaran = await models.kotaksaran.findAll({
      where: {
        idSaran: req.params.idSaran,
      },
    })

    if (kotaksaran.length > 0) {
      res.status(200).json({
        message: 'Data saran Ditemukan',
        data: kotaksaran,
      })
    } else {
      res.status(200).json({
        message: 'Tidak Ada Data',
        data: [],
      })
    }
  } catch (err) {
    res.status(400).json({
      message: error.message,
    })
  }
}

controller.post = async function (req, res) {
  try {
    console.log(req.body)
    const { NIS, pemberiSaran, saranJudulBuku, saranPengarangBuku } = req.body

    let kotaksaran = await models.kotaksaran.create({
      NIS,
      pemberiSaran,
      saranJudulBuku,
      saranPengarangBuku,
    })

    res.status(201).json({
      message: 'Berhasil Tambah Data Saran',
      data: kotaksaran,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambah data saran',
    })
  }
}

// controller.put = async function (req, res) {
//   try {
//     let kotaksaran = await models.kotaksaran.update(
//       {
//         NIS: req.body.NIS,

//         pemberiSaran: req.body.pemberiSaran,
//         saranJudulBuku: req.body.saranJudulBuku,
//         saranPengarangBuku: req.body.saranPengarangBuku,
//       },
//       {
//         where: {
//           idSaran: req.params.idSaran,
//         },
//       },
//     )
//     res.status(200).json({
//       message: 'Berhasil Edit Data Saran',
//     })
//   } catch (error) {
//     res.status(404).json({
//       message: error.message,
//     })
//   }
// }

controller.delete = async function (req, res) {
  try {
    const kotaksaran = await models.kotaksaran.findOne({
      where: {
        idSaran: req.params.idSaran,
      },
    })

    if (!kotaksaran) {
      return res.status(404).json({
        message: 'Saran tidak ditemukan',
      })
    }

    await models.kotaksaran.destroy({
      where: {
        idSaran: req.params.idSaran,
      },
    })

    res.status(200).json({
      message: 'Berhasil Hapus Data Peminjaman',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = controller
