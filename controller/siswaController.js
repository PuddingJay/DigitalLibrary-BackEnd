const models = require("../Config/model/index");
const siswaController = {};
const { Op } = require("sequelize");
const fs = require("fs");

siswaController.getAll = async function (req, res) {
  try {
    let siswa = await models.siswa.findAll({
      attributes: ["NIS", "Nama", "Kelas", "Jurusan"],
    });
    if (siswa.length > 0) {
      res.status(200).json({
        message: "Data semua Siswa",
        data: siswa,
      });
    } else {
      res.status(202).json({
        message: "Tidak ada data",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error,
    });
  }
};

siswaController.getOne = async function (req, res) {
  try {
    console.log(req.params);
    let siswa = await models.siswa.findAll({
      where: {
        [Op.or]: [
          {
            NIS: req.params.NIS,
          },
        ],
      },
    });
    // let books = await models.books.findAll({})
    if (siswa.length > 0) {
      res.status(200).json({
        message: "Data buku ditemukan",
        data: siswa,
      });
    } else {
      res.status(200).json({
        message: "Tidak ada data",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error,
    });
  }
};

siswaController.post = async function (req, res) {
  try {
    let siswa = await models.siswa.create({
      NIS: req.body.NIS,
      Nama: req.body.Nama,
      Kelas: req.body.Kelas,
      Jurusan: req.body.Jurusan,
    });
    res.status(201).json({
      message: "Buku berhasil ditambahkan",
      data: siswa,
    });
  } catch (error) {
    process.on("uncaughtException", function (err) {
      console.log(req.body);
    });
    res.status(404).json({
      message: error,
    });
  }
};

siswaController.put = async function (req, res) {
  try {
    console.log("req body", req.body)
    let siswa = await models.siswa.update(
      {
        Nama: req.body.Nama,
        Kelas: req.body.Kelas,
        Jurusan: req.body.Jurusan,
      },
      {
        where: {
          NIS: req.body.NIS,
        },
      }
    );
    res.status(200).json({
      message: "Berhasil ubah data buku",
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

siswaController.delete = async function (req, res) {
  try {
    await models.siswa.destroy({
      where: {
        NIS: req.params.NIS,
      },
    });
    res.status(200).json({
      message: "Berhasil hapus data buku",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error,
    });
  }
};

siswaController.getSearch = async function (req, res) {
  const search = req.query.keyword;
  try {
    let siswa = await models.siswa.findAll({
      attributes: ["NIS", "Nama", "Kelas", "Jurusan"],
      where: {
        [Op.or]: [
          {
            NIS: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            Nama: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            Kelas: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            Jurusan: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });
    if (siswa.length > 0) {
      res.status(200).json({
        message: "Data semua Buku",
        data: siswa,
      });
    } else {
      res.status(202).json({
        message: "Tidak ada data",
        data: [],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
};

module.exports = siswaController;
