/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const models = require('../Config/model/index')
const controller = {}
const db = require('../Config/database/db.js')
const moment = require('moment')
const sequelize = require('sequelize')

controller.getAll = async function (req, res) {
  try {
    let riwayat = await models.riwayatbaca.findAll({
      include: [
        {
          model: models.buku,
          attributes: ['kodeBuku', 'judul', 'cover', 'tersedia'],
          as: 'buku',
        },
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

    const transformedData = riwayat.map((item) => ({
      siswa_NIS: item.siswa_NIS,
      nama: item.siswa.akun.nama,
      idRiwayat: item.idRiwayat,
      buku_kodeBuku: item.buku_kodeBuku,
      judul: item.buku.judul,
      cover: item.buku.cover,
      tersedia: item.buku.tersedia,
      createdAt: item.createdAt,
    }))

    if (transformedData.length > 0) {
      res.status(200).json({
        message: 'Semua Data riwayat',
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
    const riwayatbaca = await models.riwayatbaca.findAll({
      where: {
        // Menggunakan 'nama' sebagai gantinya
        siswa_NIS: req.params.siswa_NIS,
      },
      include: [
        {
          model: models.buku,
          attributes: ['kodeBuku', 'judul', 'cover', 'tersedia'],
          as: 'buku',
        },
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

    const transformedData = riwayatbaca.map((item) => ({
      siswa_NIS: item.siswa_NIS,
      nama: item.siswa.akun.nama,
      idRiwayat: item.idRiwayat,
      buku_kodeBuku: item.buku_kodeBuku,
      judul: item.buku.judul,
      cover: item.buku.cover,
      tersedia: item.buku.tersedia,
      createdAt: item.createdAt,
    }))

    if (transformedData.length > 0) {
      res.status(200).json({
        message: 'Semua Data riwayat',
        data: transformedData,
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
    const { siswa_NIS, buku_kodeBuku } = req.body

    // Cek apakah siswa dengan NIS yang diberikan ada dalam database

    // Buat entitas riwayatbaca baru
    const newRiwayatBaca = await models.riwayatbaca.create({
      siswa_NIS: siswa_NIS,
      buku_kodeBuku: buku_kodeBuku,
      createdAt: new Date(),
      // createdAt akan diisi otomatis sesuai konfigurasi model
    })

    res.status(201).json({
      message: 'Berhasil Tambah Data Riwayat Baca',
      data: newRiwayatBaca,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambah data riwayat baca',
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
