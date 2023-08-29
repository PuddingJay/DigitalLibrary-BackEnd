/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const models = require('../Config/model/index')
const controller = {}
const db = require('../Config/database/db.js')
const moment = require('moment')

controller.getAll = async function (req, res) {
  try {
    let komentar = await db.query(
      'SELECT DISTINCT komentar.idKomentar, komentar.kodeBuku as kodeBuku,  siswa.NIS, komentar.namaKomentator, books.judul as judulBuku, komentar.judulBuku, FROM komentar JOIN books ON komentar.kodeBuku = books.kodeBuku JOIN siswa ON komentar.NIS = siswa.NIS;',
    )

    if (komentar.length > 0) {
      res.status(200).json({
        message: 'Data komentar berhasil diambil',
        data: komentar,
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
    let komentar = await models.komentar.findAll({
      where: {
        kodeBuku: req.params.kodeBuku,
      },
    })

    if (komentar.length > 0) {
      res.status(200).json({
        message: 'Data saran Ditemukan',
        data: komentar,
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
    const { NIS, namaKomentator, kodeBuku, judulBuku, textKomentar } = req.body

    let komentar = await models.komentar.create({
      NIS,
      namaKomentator,
      kodeBuku,
      judulBuku,
      textKomentar,
      waktuKomentar: moment(),
    })

    res.status(201).json({
      message: 'Berhasil Tambah Data Saran',
      data: komentar,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambah data saran',
    })
  }
}

controller.put = async function (req, res) {
  try {
    const idKomentar = req.params.idKomentar
    let komentar = await models.komentar.update(
      {
        textKomentar: req.body.textKomentar,
        waktuKomentar: moment(),
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
    const idKomentar = req.body.idKomentar
    const namaKomentator = req.body.namaKomentator

    const komentar = await models.komentar.findOne({
      where: {
        idKomentar: idKomentar,
        namaKomentator: namaKomentator,
      },
    })

    if (!komentar) {
      return res.status(404).json({
        message: 'Saran tidak ditemukan',
      })
    }

    await komentar.destroy()

    res.status(200).json({
      message: 'Berhasil Hapus Data komentar',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = controller
