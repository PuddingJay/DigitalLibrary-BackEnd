/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const models = require('../Config/model/index')
const controller = {}
const db = require('../Config/database/db.js')
const moment = require('moment')
const sequelize = require('sequelize')

controller.getAll = async function (req, res) {
  try {
    // Create a subquery to get distinct idRiwayat values
    const subqueryResults = await models.riwayatbaca.findAll({
      attributes: ['idRiwayat'],
      group: ['idRiwayat'],
    })

    // Extract the idRiwayat values from the subquery results
    const idRiwayatValues = subqueryResults.map((result) => result.idRiwayat)

    // Use the idRiwayat values in the main query
    let riwayatbaca = await models.riwayatbaca.findAll({
      where: {
        idRiwayat: idRiwayatValues,
      },
      include: [
        {
          model: models.books,
          attributes: ['judul', 'cover_buku', 'tersedia'],
          as: 'books',
        },
        {
          model: models.siswa,
          attributes: ['NIS'],
          as: 'siswa',
        },
      ],
      order: [['idRiwayat', 'DESC']],
    })

    if (riwayatbaca.length > 0) {
      res.status(200).json({
        message: 'Data riwayatbaca berhasil diambil',
        data: riwayatbaca,
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
    const riwayatbaca = await models.riwayatbaca.findAll({
      where: {
        NamaAkun: req.params.NamaAkun,
      },
      include: [
        {
          model: models.books,
          attributes: ['judul', 'cover_buku', 'tersedia'],
          as: 'books',
        },
      ],
      order: [['idRiwayat', 'DESC']],
    })

    if (riwayatbaca.length > 0) {
      res.status(200).json({
        message: 'Data riwayatbaca berhasil diambil',
        data: riwayatbaca,
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

controller.post = async function (req, res) {
  try {
    console.log(req.body)
    const { NIS, NamaAkun, kodeBukuRiwayat, judulRiwayat, coverRiwayat, tersediaRiwayat } = req.body

    let riwayatbaca = await models.riwayatbaca.create({
      NIS,
      NamaAkun,
      kodeBukuRiwayat,
      judulRiwayat,
      coverRiwayat,
      tersediaRiwayat,
      TanggalAkses: moment(),
    })

    res.status(201).json({
      message: 'Berhasil Tambah Data Saran',
      data: riwayatbaca,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambah data saran',
    })
  }
}

controller.delete = async function (req, res) {
  try {
    const idRiwayat = req.params.idRiwayat

    const riwayatbaca = await models.riwayatbaca.findOne({
      where: {
        idRiwayat: idRiwayat,
      },
    })

    if (!riwayatbaca) {
      return res.status(404).json({
        message: 'Saran tidak ditemukan',
      })
    }

    await riwayatbaca.destroy()

    res.status(200).json({
      message: 'Berhasil Hapus Data riwayatbaca',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

controller.getbyTanggal = async function (req, res) {
  try {
    // Group by month and year of TanggalAkses
    const riwayatbaca = await models.riwayatbaca.findAll({
      attributes: [
        [sequelize.fn('MONTH', sequelize.col('TanggalAkses')), 'month'],
        [sequelize.fn('YEAR', sequelize.col('TanggalAkses')), 'year'],
        [sequelize.fn('COUNT', sequelize.col('*')), 'total'],
      ],
      group: ['month', 'year'],
      include: [
        {
          model: models.books,
          attributes: ['judul', 'cover_buku', 'tersedia'],
          as: 'books',
        },
        {
          model: models.siswa,
          attributes: ['NIS'],
          as: 'siswa',
        },
      ],
    })

    if (riwayatbaca.length > 0) {
      res.status(200).json({
        message: 'Data riwayatbaca berhasil diambil',
        data: riwayatbaca,
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

module.exports = controller
