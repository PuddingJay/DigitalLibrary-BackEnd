import models from '../Config/model/index.js';
import { Op } from 'sequelize';
import fs from 'fs';
import PDFJS from 'pdfjs-dist';
import path from 'path';
import mime from 'mime';

const controller = {};

controller.getAll = async function (req, res) {
  try {
    let books = await models.books.findAll({
      attributes: [
        'idBuku',
        'kodeBuku',
        'judul',
        'penulis',
        'Kategori',
        'tahun_terbit',
        'keterangan',
        'jumlah',
        'tersedia',
        'cover_buku',
        'file_ebook',
      ],
    })
    if (books.length > 0) {
      res.status(200).json({
        message: 'Data semua Buku',
        data: books,
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
    console.log(req.params)
    let books = await models.books.findAll({
      where: {
        [Op.or]: [
          {
            idBuku: req.params.idBuku,
          },
        ],
      },
    });
    if (books.length > 0) {
      res.status(200).json({
        message: 'Data buku ditemukan',
        data: books,
      })
    } else {
      res.status(200).json({
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

controller.post = async function (req, res) {
  try {
    console.log(req.body)
    console.log(req.files)
    let coverPath = undefined
    if (req.files.cover_buku && req.files.cover_buku[0]) {
      coverPath = req.files.cover_buku[0].path
    }

    let ebookPath = undefined
    if (req.files.file_ebook && req.files.file_ebook[0]) {
      ebookPath = req.files.file_ebook[0].path
    }

    let book = await models.books.create({
      kodeBuku: req.body.kodeBuku,
      judul: req.body.judul,
      penulis: req.body.penulis,
      Kategori: req.body.Kategori,
      tahun_terbit: req.body.tahun_terbit,
      keterangan: req.body.keterangan,
      jumlah: req.body.jumlah,
      tersedia: req.body.jumlah,
      cover_buku: coverPath,
      file_ebook: ebookPath,
    });

    console.log(book)
    res.status(201).json({
      message: 'Buku berhasil ditambahkan',
      data: book,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
    });
  }
}

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
          kodeBuku: req.body.kodeBuku,
        },
      },
    )
    res.status(200).json({
      message: 'Berhasil ubah data buku',
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error,
    })
  }
}

controller.delete = async function (req, res) {
  try {
    const book = await models.books.findOne({
      where: {
        idBuku: req.params.idBuku,
      },
    });

    if (!book) {
      return res.status(404).json({
        message: 'Buku tidak ditemukan',
      });
    }

    // Hapus file cover buku
    if (book.cover_buku && book.cover_buku.path !== '' && fs.existsSync(book.cover_buku.path)) {
      fs.unlinkSync(book.cover_buku.path);
    }

    // Hapus file ebook
    if (book.file_ebook && book.file_ebook.path !== '' && fs.existsSync(book.file_ebook.path)) {
      fs.unlinkSync(book.file_ebook.path);
    }

    // Hapus data buku dari database
    await models.books.destroy({
      where: {
        idBuku: req.params.idBuku,
      },
    });

    return res.status(200).json({
      message: 'Berhasil hapus data buku',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Terjadi kesalahan server',
    });
  }
};

controller.getSearch = async function (req, res) {
  const { search } = req.params
  try {
    let books = await models.books.findAll({
      attributes: ["idBuku", "kodeBuku", "judul", "penulis", "Kategori", "tahun_terbit", "keterangan", "jumlah", "cover_buku", "file_ebook"],
      where: {
        [Op.or]: [
          {
            kodeBuku: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            judul: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            penulis: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            Kategori: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            tahun_terbit: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            keterangan: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      raw: true,
    })
    if (books.length > 0) {
      res.status(200).json({
        message: 'Data semua Buku',
        data: books,
      })
    } else {
      res.status(202).json({
        message: 'Tidak ada data',
        data: [],
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data',
    })
  }
}

controller.getPdf = async function (req, res) {
  try {
    const currentDir = process.cwd(); // Get the current working directory

    // Find the PDF in the database based on the ID
    const book = await models.books.findOne({
      where: {
        idBuku: req.params.idBuku,
      },
    });

    if (book) {
      const filePath = path.join(currentDir, book.file_ebook);

      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
        console.log(filePath);
      } else {
        return res.status(404).json({ message: 'PDF file not found.' });
      }
    } else {
      return res.status(404).json({ message: 'PDF not found.' });
    }
  } catch (error) {
    console.error('Error reading PDF:', error);
    res.status(500).json({ message: 'Error reading PDF.', error: error.message });
  }
};

controller.getCategory = async function (req, res) {
  try {
    let books = await models.books.findAll({
      where: {
        [Op.or]: [
          {
            kodeBuku: req.params.kodeBuku,
          },
        ],
      },
    })
    // let books = await models.books.findAll({})
    if (books.length > 0) {
      res.status(200).json({
        message: 'Data buku ditemukan',
        data: books,
      })
    } else {
      res.status(200).json({
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

export default controller;
