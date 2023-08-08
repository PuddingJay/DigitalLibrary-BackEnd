const models = require('../Config/model/index')
const controller = {}
const { Op } = require('sequelize')
const db = require('../Config/database/db.js')


controller.getAll = async function (req, res) {
  try {
    let bookingPinjam = await db.query(
      'SELECT DISTINCT bookingpinjam.idBookingPinjam, siswa.NIS, siswa.Nama, books.kodeBuku, books.judul, bookingpinjam.waktuBooking, bookingpinjam.batasBooking, bookingpinjam.createdAt FROM bookingpinjam JOIN siswa ON bookingpinjam.NIS = siswa.NIS JOIN books ON bookingpinjam.kodeBuku = books.kodeBuku',
    )

    if (bookingPinjam.length > 0) {
      const uniquebookingPinjam = Array.from(new Set(bookingPinjam.map(JSON.stringify))).map(JSON.parse)
      res.status(200).json({
        message: 'Data semua booking pinjam',
        data: uniquebookingPinjam.flat(),
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
    let bookingPinjam = await models.bookingPinjam.findAll({
      where: {
        idBookingPinjam: req.params.idBookingPinjam,
      },
    })

    if (bookingPinjam.length > 0) {
      res.status(200).json({
        message: 'Data saran Ditemukan',
        data: bookingPinjam,
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
    const { NIS, nama, kodeBuku, judulBuku, waktuBooking } = req.body

    let bookingPinjam = await models.bookingPinjam.create({
      NIS,
      nama,
      kodeBuku,
      judulBuku,
      waktuBooking,
      createdAt: new Date(),
    })

    res.status(201).json({
      message: 'Berhasil Booking Buku',
      data: bookingPinjam,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Terjadi kesalahan saat booking buku',
    })
  }
}

controller.delete = async function (req, res) {
  try {
    const bookingPinjam = await models.bookingPinjam.findOne({
      where: {
        idBookingPinjam: req.params.idBookingPinjam,
      },
    })

    if (!bookingPinjam) {
      return res.status(404).json({
        message: 'Saran tidak ditemukan',
      })
    }

    await models.bookingPinjam.destroy({
      where: {
        idBookingPinjam: req.params.idBookingPinjam,
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