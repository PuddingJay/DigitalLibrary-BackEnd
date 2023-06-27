import models from '../Config/model/index.js';
import { Op } from 'sequelize';
import db from '../Config/database/db.js'
// import books from "../Config/model/booksModel.js";

const controller = {};

controller.getAll = async function (req, res) {
  try {
    let peminjaman = await db.query('SELECT DISTINCT peminjaman.idPeminjaman, peminjaman.kodeBuku as kodeBuku, peminjaman.namaPeminjam, books.judul as judulBuku, peminjaman.tglPinjam, peminjaman.batasPinjam, peminjaman.tglKembali, peminjaman.denda, peminjaman.status as status FROM peminjaman JOIN books ON peminjaman.kodeBuku = books.kodeBuku')

    // models.peminjaman.findAll(
    //   {
    //     include: {
    //       model: models.books,
    //       as: 'books'
    //     },
    //   }
    // );

    if (peminjaman.length > 0) {
      const uniquePeminjaman = Array.from(new Set(peminjaman.map(JSON.stringify))).map(JSON.parse);
      res.status(200).json({
        message: "Get Method Peminjaman",
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
    let peminjaman = await models.peminjaman.create({
      kodeBuku: req.body.kodeBuku,
      namaPeminjam: req.body.namaPeminjam,
      judulBuku: req.body.judulBuku,
      tglPinjam: req.body.tglPinjam,
      batasPinjam: req.body.batasPinjam,
      tglKembali: req.body.tglKembali !== "" && req.body.tglKembali,
      status: req.body.status,
      denda: req.body.denda,
    });
    res.status(201).json({
      message: "Berhasil Tambah Data Peminjaman",
      data: peminjaman,
    });
  } catch (error) {
    process.on("uncaughtException", function (err) {
      console.log(err);
    });
    res.status(404).json({
      message: error.message,
    });
  }
};

controller.put = async function (req, res) {
  try {
    let peminjaman = await models.peminjaman.update(
      {
        kodeBuku: req.body.kodeBuku,
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
      }
    );
    res.status(200).json({
      message: "Berhasil Edit Data Peminjaman",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

controller.delete = async function (req, res) {
  try {
    await models.peminjaman.destroy({
      where: {
        idPeminjaman: req.params.idPeminjaman,
      },
    });
    res.status(200).json({
      message: "Berhasil Hapus Data Peminjaman",
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

controller.getSearch = async function (req, res) {
  const search = req.query.keyword;
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

export default controller;