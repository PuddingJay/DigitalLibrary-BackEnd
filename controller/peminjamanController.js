const models = require('../Config/model/index.js')
const { Op } = require('sequelize')
const db = require('../Config/database/db.js')
const moment = require('moment')
// import books from "../Config/model/booksModel.js";

const controller = {}

controller.getAll = async function (req, res) {
  try {
    let peminjaman = await models.meminjam.findAll({
      include: [
        {
          model: models.buku,
          attributes: ['kodeBuku', 'judul'],
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

    const flattenedData = peminjaman.map((item) => ({
      Buku_kodeBuku: item.buku.kodeBuku,
      Siswa_NIS: item.siswa.NIS,
      idPeminjaman: item.idPeminjaman,
      tglPinjam: item.tglPinjam,
      batasPinjam: item.batasPinjam,
      tglKembali: item.tglKembali,
      status: item.status,
      denda: item.denda,
      createdAt: item.createdAt,
      judul: item.buku.judul,
      nama: item.siswa.akun.nama,
    }))

    if (flattenedData.length > 0) {
      res.status(200).json({
        message: 'Semua Data Peminjaman',
        data: flattenedData,
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

controller.getOnSiswa = async function (req, res) {
  try {
    const { NIS } = req.params

    let peminjaman = await models.meminjam.findAll({
      include: [
        {
          model: models.buku,
          attributes: ['kodeBuku', 'judul'],
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
          where: {
            NIS: NIS,
          },
        },
      ],
    })

    const flattenedData = peminjaman.map((item) => ({
      Buku_kodeBuku: item.buku.kodeBuku,
      Siswa_NIS: item.siswa.NIS,
      idPeminjaman: item.idPeminjaman,
      tglPinjam: item.tglPinjam,
      batasPinjam: item.batasPinjam,
      tglKembali: item.tglKembali,
      status: item.status,
      denda: item.denda,
      createdAt: item.createdAt,
      judul: item.buku.judul,
      nama: item.siswa.akun.nama,
    }))

    if (flattenedData.length > 0) {
      res.status(200).json({
        message: 'Data Peminjaman by NIS',
        data: flattenedData,
      })
    } else {
      res.status(200).json({
        message: 'Tidak Ada Data Peminjaman untuk NIS ini',
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
    let peminjaman = await models.peminjaman.findAll({
      where: {
        idPeminjaman: req.params.idPeminjaman,
      },
    })

    if (peminjaman.length > 0) {
      res.status(200).json({
        message: 'Data Buku Ditemukan',
        data: peminjaman,
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
    const { Buku_kodeBuku, Siswa_NIS, tglPinjam, batasPinjam, tglKembali, status, denda } = req.body
    console.log(req.body)

    // Check if the book and student exist
    const existingBuku = await models.buku.findOne({ where: { kodeBuku: Buku_kodeBuku } })
    const existingSiswa = await models.siswa.findOne({ where: { NIS: Siswa_NIS } })

    if (!existingBuku || !existingSiswa) {
      return res.status(400).json({ message: 'Book or student not found' })
    }

    const newMeminjam = await models.meminjam.create({
      Buku_kodeBuku,
      Siswa_NIS,
      tglPinjam,
      batasPinjam,
      tglKembali: tglKembali !== '' ? tglKembali : null,
      status,
      denda,
      createdAt: new Date(),
    })

    await models.buku.update(
      { tersedia: existingBuku.tersedia - 1 },
      { where: { kodeBuku: Buku_kodeBuku } },
    )

    await models.siswa.increment('jumlahPinjam', { by: 1, where: { NIS: Siswa_NIS } })
    await models.siswa.update({ waktuPinjam: moment().toDate() }, { where: { NIS: Siswa_NIS } })

    return res.status(201).json({ message: 'Berhasil menambah data peminjaman' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// controller.post = async function (req, res) {
//   try {
//     console.log(req.body);
//     const { kodeBuku, NIS, namaPeminjam, judulBuku, tglPinjam, batasPinjam, tglKembali, status, denda } = req.body;

//     // Check if the book is available
//     const book = await models.books.findOne({ where: { kodeBuku } });
//     if (!book || book.tersedia === 0) {
//       return res.status(404).json({ message: 'Book is not available.' });
//     }

//     let peminjaman = await models.peminjaman.create({
//       kodeBuku,
//       NIS,
//       namaPeminjam,
//       judulBuku,
//       tglPinjam,
//       batasPinjam,
//       tglKembali: tglKembali !== "" ? tglKembali : null,
//       status,
//       denda,
//       createdAt: new Date,
//     });

//     await models.books.update(
//       { tersedia: book.tersedia - 1 },
//       { where: { kodeBuku } }
//     );

//     await models.siswa.increment('jumlahPinjam', { by: 1, where: { NIS } });
//     await models.siswa.update(
//       { waktuPinjam: moment().toDate() }, // Update waktuPinjam with current time
//       { where: { NIS } }
//     );

//     res.status(201).json({
//       message: "Berhasil Tambah Data Peminjaman",
//       data: peminjaman,
//     })
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Terjadi kesalahan saat menambah data peminjaman",
//     });
//   }
// };

controller.put = async function (req, res) {
  try {
    const existingPeminjaman = await models.meminjam.findOne({
      where: {
        idPeminjaman: req.params.idPeminjaman,
      },
      include: [
        {
          model: models.buku,
          attributes: ['kodeBuku', 'judul'],
          as: 'buku',
        },
      ],
    })

    if (!existingPeminjaman) {
      return res.status(404).json({
        message: 'Peminjaman not found',
      })
    }

    const oldNIS = existingPeminjaman.Siswa_NIS
    const newNIS = req.body.Siswa_NIS

    if (oldNIS !== newNIS) {
      const existingOldNIS = await models.siswa.findOne({
        where: {
          NIS: oldNIS,
        },
      })

      const existingNewNIS = await models.siswa.findOne({
        where: {
          NIS: newNIS,
        },
      })

      if (existingOldNIS) {
        await existingOldNIS.update({
          jumlahPinjam: existingOldNIS.jumlahPinjam - 1,
        })
      }

      if (existingNewNIS) {
        await existingNewNIS.update({
          jumlahPinjam: existingNewNIS.jumlahPinjam + 1,
          waktuPinjam: moment().toDate(),
        })
      }
    }

    let updatedValues = {
      Buku_kodeBuku: req.body.Buku_kodeBuku,
      Siswa_NIS: req.body.Siswa_NIS,
      tglPinjam: req.body.tglPinjam,
      batasPinjam: req.body.batasPinjam,
      tglKembali: req.body.tglKembali,
      status: req.body.status,
      denda: req.body.denda,
      createdAt: new Date(),
    }

    // console.log(existingPeminjaman.buku.kodeBuku + updatedValues.Buku_kodeBuku);
    if (existingPeminjaman.buku.kodeBuku != updatedValues.Buku_kodeBuku) {
      // console.log(existingPeminjaman.buku.judul);
      const existingBook = await models.buku.findOne({
        where: {
          judul: existingPeminjaman.buku.judul,
        },
      })

      if (existingBook) {
        await existingBook.update({
          tersedia: existingBook.tersedia + 1,
        })
      }

      const newBook = await models.buku.findOne({
        where: {
          kodeBuku: updatedValues.Buku_kodeBuku,
        },
      })

      if (!newBook || newBook.tersedia === 0) {
        return res.status(404).json({ message: 'Book is not available.' })
      }
      if (newBook) {
        await newBook.update({
          tersedia: newBook.tersedia - 1,
        })
      }
    }

    await models.meminjam.update(updatedValues, {
      where: {
        idPeminjaman: req.params.idPeminjaman,
      },
    })

    res.status(200).json({
      message: 'Berhasil Edit Data Peminjaman',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
    })
  }
}

controller.delete = async function (req, res) {
  try {
    const peminjaman = await models.meminjam.findOne({
      where: {
        idPeminjaman: req.params.idPeminjaman,
      },
    })

    if (!peminjaman) {
      return res.status(404).json({
        message: 'Peminjaman tidak ditemukan',
      })
    }

    const { Buku_kodeBuku } = peminjaman

    // Delete the record from the peminjaman table
    await models.meminjam.destroy({
      where: {
        idPeminjaman: req.params.idPeminjaman,
      },
    })

    // Increment the value of 'tersedia' column in the books table by 1
    await models.buku.increment('tersedia', { by: 1, where: { kodeBuku: Buku_kodeBuku } })

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
