import models from "../Config/model/index.js";
import { Op } from "sequelize";
import fs from "fs";

const controller = {};

controller.getAll = async function (req, res) {
  try {
    let books = await models.books.findAll({
      attributes: ["kode_buku", "judul", "penulis", "Kategori", "tahun_terbit", "keterangan", "jumlah", "cover_buku", "file_ebook"],
    });
    if (books.length > 0) {
      res.status(200).json({
        message: "Data semua Buku",
        data: books,
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

controller.getOne = async function (req, res) {
  try {
    console.log(req.params);
    let books = await models.books.findAll({
      where: {
        [Op.or]: [
          {
            kode_buku: req.params.kode_buku,
          },
        ],
      },
    });
    if (books.length > 0) {
      res.status(200).json({
        message: "Data buku ditemukan",
        data: books,
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

controller.post = async function (req, res) {
  try {
    console.log(req.body);
    console.log(req.files);
    let book = await models.books.create({
      kode_buku: req.body.kode_buku,
      judul: req.body.judul,
      penulis: req.body.penulis,
      Kategori: req.body.Kategori,
      tahun_terbit: req.body.tahun_terbit,
      keterangan: req.body.keterangan,
      jumlah: req.body.jumlah,
      cover_buku: req.files.cover_buku[0] ? req.files.cover_buku[0].path : undefined,
      file_ebook: req.files.file_ebook[0] ? req.files.file_ebook[0].path : undefined,
    });
    console.log(book);
    res.status(201).json({
      message: "Buku berhasil ditambahkan",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

controller.put = async function (req, res) {
  console.log("hello");
  try {
    console.log(req.body);
    console.log(req.params);
    let books = await models.books.update(
      {
        judul: req.body.judul,
        penulis: req.body.penulis,
        Kategori: req.body.Kategori,
        tahun_terbit: req.body.tahun_terbit,
        keterangan: req.body.keterangan,
        jumlah: req.body.jumlah,
        cover_buku: req.files?.cover_buku ? req.files.cover_buku[0].path : '',
        file_ebook: req.files?.file_ebook ? req.files.file_ebook[0].path : '',
      },
      {
        where: {
          kode_buku: req.body.kode_buku,
        },
      }
    );
    res.status(200).json({
      message: "Berhasil ubah data buku",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error,
    });
  }
};

controller.delete = async function (req, res) {
  try {
    await models.books.destroy({
      where: {
        kode_buku: req.params.kode_buku,
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

controller.getSearch = async function (req, res) {
  const search = req.query.keyword;
  try {
    let books = await models.books.findAll({
      attributes: ["kode_buku", "judul", "penulis", "Kategori", "tahun_terbit", "keterangan", "jumlah", "cover_buku", "file_ebook"],
      where: {
        [Op.or]: [
          {
            kode_buku: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            judul: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            penulis: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            Kategori: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            tahun_terbit: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            keterangan: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });
    if (books.length > 0) {
      res.status(200).json({
        message: "Data semua Buku",
        data: books,
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

export default controller;