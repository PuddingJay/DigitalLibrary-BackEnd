const model = require('../config/model/index');
const controller = {};
const { Op } = require('sequelize');

controller.getAll = async function (req, res) {
  try {
    let peminjaman = await model.peminjaman.findAll()
    if (peminjaman.length > 0) {
      res.status(200).json({
        message: "Get Method Peminjaman",
        data: peminjaman
      })
    } else {
      res.status(200).json({
        message: "Tidak Ada Data",
        data: []
      })
    }
  } catch (err) {
    res.status(400).json({
      message: error.message,
    })
  }
}

controller.getOne = async function (req, res) {
  try {
    let peminjaman = await model.peminjaman.findAll({
      where: {
        idPeminjaman: req.params.nim,
      }
    });

    if (peminjaman.length > 0) {
      res.status(200).json({
        message: "Data Buku Ditemukan",
        data: peminjaman
      });
    } else {
      res.status(200).json({
        message: "Tidak Ada Data",
        data: []
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
    console.log(req.body);
    let peminjaman = await model.peminjaman.create(
      {
        idBuku: req.body.idBuku,
        namaPeminjam: req.body.namaPeminjam,
        judulBuku: req.body.judulBuku,
        tglPinjam: req.body.tglPinjam,
        batasPinjam: req.body.batasPinjam,
        tglKembali: req.body.tglKembali !== '' && req.body.tglKembali,
        status: req.body.status,
        denda: req.body.denda,
      });
    res.status(201).json({
      message: 'Berhasil Tambah Data Peminjaman',
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
}

controller.put = async function (req, res) {
  try {
    let peminjaman = await model.peminjaman.update(
      {
        idBuku: req.body.idBuku,
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
      message: 'Berhasil Edit Data Peminjaman',
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}
controller.delete = async function (req, res) {
  try {
    await model.peminjaman.destroy(
      {
        where: {
          idPeminjaman: req.params.idPeminjaman,
        }
      });
    res.status(200).json({
      message: 'Berhasil Hapus Data Peminjaman',
    })
  } catch (error) {
    res.status(404).json({
      message: error,
    })
  }
}

controller.getSearch = async function (req, res) {
  const search = req.query.keyword;
  try {
    let peminjaman = await model.peminjaman.findAll({
      attributes: ['idPeminjaman', 'idBuku', 'namaPeminjam', 'judulBuku', 'tglPinjam', 'batasPinjam', 'tglKembali', 'status', 'denda'],
      where: {
        [Op.or]: [{
          idPeminjaman: {
            [Op.like]: '%' + search + '%'
          }
        }, {
          idBuku: {
            [Op.like]: '%' + search + '%'
          }
        }, {
          namaPeminjam: {
            [Op.like]: '%' + search + '%'
          }
        }, {
          judulBuku: {
            [Op.like]: '%' + search + '%'
          }
        }, {
          batasPinjam: {
            [Op.like]: '%' + search + '%'
          }
        }, {
          tglKembali: {
            [Op.like]: '%' + search + '%'
          }
        }
        ]
      }
    })
  } catch (err) {

  }
}

module.exports = controller;