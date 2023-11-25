/* eslint-disable prettier/prettier */
const models = require('../Config/model/index')
const controller = {}
const { Op } = require('sequelize')
const db = require('../Config/database/db.js')

controller.getAll = async function (req, res) {
  try {
    let kategoribuku = await models.kategoribuku.findAll({
      attributes: ['idKategori', 'nama'],
    })
    if (kategoribuku.length > 0) {
      res.status(200).json({
        message: 'Data semua Buku',
        data: kategoribuku,
      })
    } else {
      res.status(202).json({
        message: 'Tidak ada data',
        data: [],
      })
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({
      message: error,
    })
  }
}

controller.getOne = async function (req, res) {
  try {
    let kategoribuku = await models.kategoribuku.findAll({
      where: {
        idKategori: req.params.idKategori,
      },
    })

    if (kategoribuku.length > 0) {
      res.status(200).json({
        message: 'Data saran Ditemukan',
        data: kategoribuku,
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
    const { nama } = req.body
    const { idKategori } = req.body

    let kategoribuku = await models.kategoribuku.create({
      idKategori,
      nama,
    })

    res.status(201).json({
      message: 'Berhasil Tambah Data Saran',
      data: kategoribuku,
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
    const idKategori = req.params.idKategori
    let Kategori = await models.kategoribuku.update(
      {
        nama: req.body.nama,
      },
      {
        where: {
          idKategori: idKategori,
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
    const kategoribuku = await models.kategoribuku.findOne({
      where: {
        idKategori: req.params.idKategori,
      },
    })

    if (!kategoribuku) {
      return res.status(404).json({
        message: 'Saran tidak ditemukan',
      })
    }

    await models.kategoribuku.destroy({
      where: {
        idKategori: req.params.idKategori,
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
