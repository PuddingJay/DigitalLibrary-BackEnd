/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const models = require('../Config/model/index')
const controller = {}
const db = require('../Config/database/db.js')
const moment = require('moment')

controller.getAll = async function (req, res) {
  try {
    let komentar = await models.komentar.findAll({
      include: [
        {
          model: models.buku,
          attributes: ['kodeBuku', 'judul'],
          as: 'buku',
        },
        {
          model: models.siswa,
          attributes: ['NIS'],
          as: 'komentarsiswa',
          include: [
            {
              model: models.akun,
              attributes: ['nama'],
              as: 'akunsiswa',
            },
          ],
        },
      ],
    })
    const transformedData = komentar.map((item) => ({
      Buku_kodeBuku: item.Buku_kodeBuku,
      Siswa_NIS: item.Siswa_NIS,
      idKomentar: item.idKomentar,
      teksKomentar: item.teksKomentar,

      createdAt: item.createdAt,
      judul: item.buku.judul,
      nama: item.komentarsiswa.akunsiswa.nama,
    }))

    if (transformedData.length > 0) {
      res.status(200).json({
        message: 'Semua Data komentar',
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
    const komentar = await models.komentar.findAll({
      where: {
        buku_kodeBuku: req.params.buku_kodeBuku,
      },
      include: [
        {
          model: models.buku,
          attributes: ['kodeBuku', 'judul'],
          as: 'buku',
        },
        {
          model: models.siswa,
          attributes: ['NIS'],
          as: 'komentarsiswa',
          include: [
            {
              model: models.akun,
              attributes: ['nama'],
              as: 'akunsiswa',
            },
          ],
        },
      ],
    })

    const transformedData = komentar.map((item) => ({
      Buku_kodeBuku: item.Buku_kodeBuku,
      Siswa_NIS: item.Siswa_NIS,
      idKomentar: item.idKomentar,
      teksKomentar: item.teksKomentar,

      createdAt: item.createdAt,
      judul: item.buku.judul,
      nama: item.komentarsiswa.akunsiswa.nama,
    }))

    if (transformedData.length > 0) {
      res.status(200).json({
        message: 'Semua Data komentar',
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

// controller.post = async function (req, res) {
//   try {
//     console.log(req.body)
//     const { NIS, namaKomentator, kodeBuku, judulBuku, textKomentar } = req.body

//     let komentar = await models.komentar.create({
//       NIS,
//       namaKomentator,
//       kodeBuku,
//       judulBuku,
//       textKomentar,
//       createdAt: moment(),
//     })

//     res.status(201).json({
//       message: 'Berhasil Tambah Data Saran',
//       data: komentar,
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       message: 'Terjadi kesalahan saat menambah data saran',
//     })
//   }
// }

controller.post = async function (req, res) {
  try {
    const { buku_kodeBuku, siswa_NIS, teksKomentar } = req.body
    console.log('req body :', req.body)

    // Check if the book and student exis

    const komentar = await models.komentar.create({
      buku_kodeBuku,
      siswa_NIS,
      teksKomentar,
      createdAt: moment(),
    })

    return res.status(201).json(komentar)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

controller.put = async function (req, res) {
  try {
    const idKomentar = req.params.idKomentar
    let komentar = await models.komentar.update(
      {
        teksKomentar: req.body.teksKomentar,
        createdAt: moment(),
      },
      {
        where: {
          idKomentar: idKomentar,
        },
      },
    )
    res.status(200).json({
      message: 'Berhasil Edit Data Saran',
    })
  } catch (error) {
    res.status(404).json({
      message: error.message,
    })
  }
}

controller.delete = async function (req, res) {
  try {
    const idKomentar = req.params.idKomentar // Ambil id komentar dari URL
    // Tidak perlu lagi mengambil namaKomentator dari req.body

    const komentar = await models.komentar.findOne({
      where: {
        idKomentar: idKomentar,
      },
    })

    if (!komentar) {
      return res.status(404).json({
        message: 'Komentar tidak ditemukan',
      })
    }

    await komentar.destroy()

    res.status(200).json({
      message: 'Berhasil Hapus Data Komentar',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = controller
