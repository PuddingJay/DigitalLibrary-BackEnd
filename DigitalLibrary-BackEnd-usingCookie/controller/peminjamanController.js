const models = require('../Config/model/index.js');
const { Op } = require('sequelize');
const db = require('../Config/database/db.js');
const moment = require('moment');
// import books from "../Config/model/booksModel.js";

const controller = {};

controller.getAll = async function (req, res) {
  try {
    let peminjaman = await db.query(
      'SELECT DISTINCT peminjaman.idPeminjaman, peminjaman.kodeBuku as kodeBuku, siswa.NIS, peminjaman.namaPeminjam, books.judul as judulBuku, peminjaman.tglPinjam, peminjaman.batasPinjam, peminjaman.tglKembali, peminjaman.denda, peminjaman.status as status FROM peminjaman JOIN books ON peminjaman.kodeBuku = books.kodeBuku JOIN siswa ON peminjaman.NIS = siswa.NIS;'
    );

    if (peminjaman.length > 0) {
      const uniquePeminjaman = Array.from(new Set(peminjaman.map(JSON.stringify))).map(JSON.parse);
      res.status(200).json({
        message: 'Get Method Peminjaman',
        data: uniquePeminjaman.flat(),
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
        idPeminjaman: req.params.nim,
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

    // Create a new peminjaman entry
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
    });

    // Update the tersedia value in the books table
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
    let peminjaman = await models.peminjaman.update(
      {
        kodeBuku: req.body.kodeBuku,
        NIS: req.body.NIS,
        namaPeminjam: req.body.namaPeminjam,
        judulBuku: req.body.judulBuku,
        tglPinjam: req.body.tglPinjam,
        batasPinjam: req.body.batasPinjam,
        tglKembali: req.body.tglKembali,
        status: req.body.status,
        denda: req.body.denda,
      },
      {
        where: {
          idPeminjaman: req.params.idPeminjaman,
        },
      },
    )
    res.status(200).json({
      message: "Berhasil Edit Data Peminjaman",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    })
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


controller.getSearch = async function (req, res) {
  const search = req.query.keyword
  try {
    let peminjaman = await models.peminjaman.findAll({
      attributes: [
        'idPeminjaman',
        'kodeBuku',
        'namaPeminjam',
        'judulBuku',
        'tglPinjam',
        'batasPinjam',
        'tglKembali',
        'status',
        'denda',
      ],
      where: {
        [Op.or]: [
          {
            idPeminjaman: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            kodeBuku: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            namaPeminjam: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            judulBuku: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            batasPinjam: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            tglKembali: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });
    res.status(200).json({
      message: 'Data Peminjaman',
      data: peminjaman,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = controller;