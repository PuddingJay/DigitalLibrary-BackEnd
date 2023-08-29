const models = require('../Config/model/index.js');
const { Op } = require('sequelize');
const db = require('../Config/database/db.js');
const moment = require('moment');
// import books from "../Config/model/booksModel.js";

const controller = {};

controller.getAll = async function (req, res) {
  try {

    let peminjaman = await models.meminjam.findAll({
      include: [
        {
          model: models.buku,
          attributes: ['kodeBuku', 'judul'],
          as: 'buku'
        },
        {
          model: models.siswa,
          attributes: ['NIS'],
          as: 'siswa'
        },
      ]
    })

    if (peminjaman.length > 0) {
      res.status(200).json({
        message: 'Semua Data Peminjaman',
        data: peminjaman,
      })
    } else {
      res.status(200).json({
        message: "Tidak Ada Data",
        data: [],
      });
    }
  } catch (err) {
    console.error(err)
    res.status(400).json({
      message: err.message,
    });
  }
};
controller.getOnSiswa = async function (req, res) {
  try {
    const { NIS } = req.params; // Assuming the NIS is provided as a parameter

    const query = `
      SELECT
        peminjaman.idPeminjaman,
        peminjaman.kodeBuku,
        siswa.NIS,
        peminjaman.namaPeminjam,
        books.judul AS judulBuku,
        peminjaman.tglPinjam,
        peminjaman.batasPinjam,
        peminjaman.tglKembali,
        peminjaman.denda,
        peminjaman.status,
        peminjaman.createdAt
      FROM
        peminjaman
        JOIN books ON peminjaman.kodeBuku = books.kodeBuku
        JOIN siswa ON peminjaman.NIS = siswa.NIS
      WHERE
        peminjaman.NIS = :NIS;
    `;

    const peminjaman = await db.query(query, { replacements: { NIS }, type: db.QueryTypes.SELECT });

    if (peminjaman.length > 0) {
      res.status(200).json({
        message: 'Get Method Peminjaman On Siswa',
        data: peminjaman,
      });
    } else {
      res.status(200).json({
        message: "Tidak Ada Data",
        data: [],
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

controller.getOne = async function (req, res) {
  try {
    let peminjaman = await models.peminjaman.findAll({
      where: {
        idPeminjaman: req.params.idPeminjaman,
      },
    });


    if (peminjaman.length > 0) {
      res.status(200).json({
        message: "Data Buku Ditemukan",
        data: peminjaman,
      });
    } else {
      res.status(200).json({
        message: "Tidak Ada Data",
        data: [],
      });
    }
  } catch (err) {
    res.status(400).json({
      message: error.message,
    });
  }
};

controller.post = async function (req, res) {
  try {
    console.log(req.body);
    const { kodeBuku, NIS, namaPeminjam, judulBuku, tglPinjam, batasPinjam, tglKembali, status, denda } = req.body;

    // Check if the book is available
    const book = await models.books.findOne({ where: { kodeBuku } });
    if (!book || book.tersedia === 0) {
      return res.status(404).json({ message: 'Book is not available.' });
    }

    let peminjaman = await models.peminjaman.create({
      kodeBuku,
      NIS,
      namaPeminjam,
      judulBuku,
      tglPinjam,
      batasPinjam,
      tglKembali: tglKembali !== "" ? tglKembali : null,
      status,
      denda,
      createdAt: new Date,
    });

    await models.books.update(
      { tersedia: book.tersedia - 1 },
      { where: { kodeBuku } }
    );

    await models.siswa.increment('jumlahPinjam', { by: 1, where: { NIS } });
    await models.siswa.update(
      { waktuPinjam: moment().toDate() }, // Update waktuPinjam with current time
      { where: { NIS } }
    );

    res.status(201).json({
      message: "Berhasil Tambah Data Peminjaman",
      data: peminjaman,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat menambah data peminjaman",
    });
  }
};

controller.put = async function (req, res) {
  try {
    const existingPeminjaman = await models.peminjaman.findOne({
      where: {
        idPeminjaman: req.params.idPeminjaman,
      },
    });

    if (!existingPeminjaman) {
      return res.status(404).json({
        message: "Peminjaman not found",
      });
    }

    const oldNIS = existingPeminjaman.NIS;
    const newNIS = req.body.NIS;

    if (oldNIS !== newNIS) {
      const existingOldNIS = await models.siswa.findOne({
        where: {
          NIS: oldNIS,
        },
      });

      const existingNewNIS = await models.siswa.findOne({
        where: {
          NIS: newNIS,
        },
      });

      if (existingOldNIS) {
        await existingOldNIS.update({
          jumlahPinjam: existingOldNIS.jumlahPinjam - 1,
        });
      }

      if (existingNewNIS) {
        await existingNewNIS.update({
          jumlahPinjam: existingNewNIS.jumlahPinjam + 1,
          waktuPinjam: moment().toDate(),
        });
      }
    }

    let updatedValues = {
      kodeBuku: req.body.kodeBuku,
      NIS: req.body.NIS,
      namaPeminjam: req.body.namaPeminjam,
      judulBuku: req.body.judulBuku,
      tglPinjam: req.body.tglPinjam,
      batasPinjam: req.body.batasPinjam,
      tglKembali: req.body.tglKembali,
      status: req.body.status,
      denda: req.body.denda,
      createdAt: new Date,
    };

    if (existingPeminjaman.judulBuku != updatedValues.judulBuku) {
      const existingBook = await models.books.findOne({
        where: {
          judul: existingPeminjaman.judulBuku,
        },
      });

      if (existingBook) {
        await existingBook.update({
          tersedia: existingBook.tersedia + 1,
        });
      }

      const newBook = await models.books.findOne({
        where: {
          judul: updatedValues.judulBuku,
        },
      });

      if (!newBook || newBook.tersedia === 0) {
        return res.status(404).json({ message: 'Book is not available.' });
      }
      if (newBook) {
        await newBook.update({
          tersedia: newBook.tersedia - 1,
        });
      }
    }

    await models.peminjaman.update(updatedValues, {
      where: {
        idPeminjaman: req.params.idPeminjaman,
      },
    });

    res.status(200).json({
      message: "Berhasil Edit Data Peminjaman",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

controller.delete = async function (req, res) {
  try {
    const peminjaman = await models.peminjaman.findOne({
      where: {
        idPeminjaman: req.params.idPeminjaman,
      },
    });

    if (!peminjaman) {
      return res.status(404).json({
        message: 'Peminjaman tidak ditemukan',
      });
    }

    const { kodeBuku } = peminjaman;

    // Delete the record from the peminjaman table
    await models.peminjaman.destroy({
      where: {
        idPeminjaman: req.params.idPeminjaman,
      },
    });

    // Increment the value of 'tersedia' column in the books table by 1
    await models.books.increment('tersedia', { by: 1, where: { kodeBuku } });

    res.status(200).json({
      message: 'Berhasil Hapus Data Peminjaman',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = controller;
