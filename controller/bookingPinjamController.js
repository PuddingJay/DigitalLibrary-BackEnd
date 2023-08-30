const models = require('../Config/model/index')
const controller = {}
const { Op } = require('sequelize')
const db = require('../Config/database/db.js')


controller.getAll = async function (req, res) {
  try {
    let bookingPinjam = await models.bookingPinjam.findAll(
      {
        include: [
          {
            model: models.buku,
            attributes: ['kodeBuku', 'judul'],
            as: 'buku'
          },
          {
            model: models.siswa,
            attributes: ['NIS'],
            as: 'siswa',
            include: [
              {
                model: models.akun,
                attributes: ['nama'],
                as: 'akun'
              }
            ]
          },
        ]
      }
    )

    const transformedData = bookingPinjam.map(item => ({
      Buku_kodeBuku: item.Buku_kodeBuku,
      Siswa_NIS: item.Siswa_NIS,
      idReservasi: item.idReservasi,
      tglPemesanan: item.tglPemesanan,
      status: item.status,
      createdAt: item.createdAt,
      judul: item.buku.judul,
      nama: item.siswa.akun.nama
    }));

    // db.query(
    //   `SELECT 
    //   DISTINCT bookingpinjam.idBookingPinjam, 
    //   siswa.NIS, 
    //   siswa.Nama, 
    //   books.kodeBuku, 
    //   books.judul, 
    //   bookingpinjam.waktuBooking, 
    //   bookingpinjam.batasBooking, 
    //   bookingpinjam.createdAt 
    // FROM 
    //   bookingpinjam 
    //   JOIN siswa ON bookingpinjam.NIS = siswa.NIS 
    //   JOIN books ON bookingpinjam.kodeBuku = books.kodeBuku`,
    // )

    if (transformedData.length > 0) {
      // const uniquebookingPinjam = Array.from(new Set(bookingPinjam.map(JSON.stringify))).map(JSON.parse)
      res.status(200).json({
        message: 'Data semua booking pinjam',
        data: transformedData,
        // uniquebookingPinjam.flat(),
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
    const { Siswa_NIS, Buku_kodeBuku, tglPemesanan, status } = req.body

    const existingBooking = await models.bookingPinjam.findOne({
      where: {
        Siswa_NIS,
        Buku_kodeBuku,
      },
    })

    if (existingBooking) {
      return res.status(400).json({
        message: 'Kamu tidak bisa booking buku yang sama dua kali ',
      })
    }

    let bookingPinjam = await models.bookingPinjam.create({
      Siswa_NIS,
      Buku_kodeBuku,
      tglPemesanan,
      status: !status ? "Belum Dipinjam" : status,
      createdAt: new Date,
    })

    res.status(201).json({
      message: 'Berhasil Booking Buku',
      data: bookingPinjam,
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Terjadi kesalahan saat booking buku, periksa data yang diinput dan coba kembali',
    })
  }
}

controller.delete = async function (req, res) {
  try {
    const bookingPinjam = await models.bookingPinjam.findOne({
      where: {
        idReservasi: req.params.idReservasi,
      },
    })

    if (!bookingPinjam) {
      return res.status(404).json({
        message: 'Data tidak ditemukan',
      })
    }

    await models.bookingPinjam.destroy({
      where: {
        idReservasi: req.params.idReservasi,
      },
    })

    res.status(200).json({
      message: 'Berhasil Hapus Data Pemesanan',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
    })
  }
}

controller.put = async function (req, res) {
  let updatedValues = {
    Buku_kodeBuku: req.body.Buku_kodeBuku,
    Siswa_NIS: req.body.Siswa_NIS,
    idReservasi: req.body.idReservasi,
    judul: req.body.judul,
    nama: req.body.nama,
    status: req.body.status,
    tglPemesanan: req.body.tglPemesanan,
  };

  try {
    await models.bookingPinjam.update(updatedValues, {
      where: {
        idReservasi: req.params.idReservasi,
      },
    });

    res.status(200).json({ message: 'Items updated successfully', updatedItem: updatedValues });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
}

module.exports = controller