/* eslint-disable prettier/prettier */
const models = require('../Config/model/index')
const controller = {}
const { Op } = require('sequelize')
const db = require('../Config/database/db.js')
controller.getAll = async function (req, res) {
  try {
    let saran = await models.kotaksaran.findAll({
      include: [
        {
          model: models.siswa, // Ubah dari 'siswa' menjadi 'siswa'
          attributes: ['NIS'],
          as: 'siswa', // Ubah dari 'siswa' menjadi 'siswa'
          include: [
            {
              model: models.akun,
              attributes: ['nama'],
              as: 'akun',
            },
          ],
        },
      ],
    })
    const transformedData = saran.map((item) => ({
      siswa_NIS: item.siswa_NIS,
      idPengadaan: item.idPengadaan,
      judulBuku: item.judulBuku,

      pengarang: item.pengarang,
      nama: item.siswa.akun.nama,
    }))

    if (transformedData.length > 0) {
      res.status(200).json({
        message: 'Semua Data saran',
        data: transformedData,
      })
    } else {
      res.status(200).json({
        message: 'Tidak Ada Data',
        data: [],
      })
    }
  } catch (err) {
    console.error(err)
    res.status(400).json({
      message: err.message,
    })
  }
}

controller.getOne = async function (req, res) {
  try {
    let kotaksaran = await models.kotaksaran.findOne({
      // Menggunakan findOne() karena Anda ingin mengambil satu entitas berdasarkan ID.
      where: {
        idPengadaan: req.params.idPengadaan, // Menggunakan idPengadaan yang sesuai dengan parameter yang diberikan.
      },
      include: [
        {
          model: models.siswa,
          attributes: ['NIS'],
          as: 'siswa',
          include: [
            {
              model: models.akun,
              attributes: ['nama'],
              as: 'akun',
            },
          ],
        },
      ],
    })

    if (kotaksaran) {
      // Periksa apakah kotaksaran ditemukan (bukan null).
      res.status(200).json({
        message: 'Data saran Ditemukan',
        data: kotaksaran,
      })
    } else {
      res.status(200).json({
        message: 'Tidak Ada Data',
        data: null, // Menggunakan null jika data tidak ditemukan.
      })
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    })
  }
}

controller.post = async function (req, res) {
  try {
    const { judulBuku, pengarang, siswa_NIS } = req.body
    console.log('req body :', req.body)

    // Check if the book and student exist

    const existingSiswa = await models.siswa.findOne({ where: { NIS: siswa_NIS } })

    if (!existingSiswa) {
      return res.status(400).json({ message: ' student not found' })
    }

    const kotaksaran = await models.kotaksaran.create({
      judulBuku,
      pengarang,
      siswa_NIS,
    })

    return res.status(201).json(kotaksaran)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
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
        idPengadaan: req.params.idPengadaan,
      },
    })

    if (!kotaksaran) {
      return res.status(404).json({
        message: 'Saran tidak ditemukan',
      })
    }

    await models.kotaksaran.destroy({
      where: {
        idPengadaan: req.params.idPengadaan,
      },
    })

    res.status(200).json({
      message: 'Berhasil Hapus Data saran',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = controller
