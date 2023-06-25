const models = require("../Config/model/index");
const controller = {};
const { Op } = require("sequelize");
const fs = require('fs');
const PDFJS = require('pdfjs-dist');
const path = require("path");

controller.getAll = async function (req, res) {
  try {
    let books = await models.books.findAll({
      attributes: ["idBuku","kode_buku", "judul", "penulis", "Kategori", "tahun_terbit", "keterangan", "jumlah", "cover_buku", "file_ebook"],
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



// controller.getOne = async function (req, res) {
//   try {
//     console.log(req.params);
//     let books = await models.books.findAll({
//       where: {
//         [Op.or]: [
//           {
//             idBuku: req.params.idBuku,
//           },
//         ],
//       },
//     });

//     if (books.length > 0) {
//       const filePath = files.file_ebook[0] ? req.files.file_ebook[0].path : undefined;

//       if (!filePath) {
//         // Jika path file tidak ditemukan
//         res.status(404).json({
//           message: 'File not found',
//         });
//         return;
//       }

//       const data = new Uint8Array(fs.readFileSync(filePath));
//       PDFJS.getDocument(data).promise.then(pdf => {
//         const totalNumPages = pdf.numPages;

//         // Mengirimkan header dengan tipe konten PDF
//         res.setHeader('Content-Type', 'application/pdf');

//         // Menggunakan stream untuk mengirimkan PDF
//         const stream = pdf.stream();
//         stream.on('data', chunk => {
//           res.write(chunk);
//         });
//         stream.on('end', () => {
//           res.end();
//         });
//       }).catch(error => {
//         console.error('Error reading PDF:', error);
//         res.status(500).send('Error reading PDF');
//       });
//     } else {
//       res.status(200).json({
//         message: 'Tidak ada data',
//         data: [],
//       });
//     }

//     // Menambahkan blok kode di bawah ini
//     res.status(200).json({
//       message: 'Data buku ditemukan',
//       data: books,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({
//       message: error,
//     });
//   }
// };

controller.getOne = async function (req, res) {
  try {
    console.log(req.params);
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
            message: "Data buku ditemukan",
            data: books,
          });
    }
    else {
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

// controller.getPdf = async function (req, res) {
//   try {
//     const books = await models.books.findOne({
//       where: {
//         [Op.or]: [
//           {
//             idBuku: req.params.idBuku,
//           },
//         ],
//       },
//       attributes: ['file_ebook'],
//     });

//     if (books) {
//       const filePath = path.join(__dirname, '..', 'asset/file_ebook', books.file_ebook);

//       // const stat = fs.statSync(filePath);
//       // console.log(filePath);
//       // console.log(stat);

//       // res.set({
//       //   'Content-Type': 'application/pdf',
//       //   'Content-Length': stat.size,
//       // });

//       // const stream = fs.createReadStream(filePath);
//       // stream.pipe(res);
//       res.sendFile(filePath);
//     } else {
//       res.status(404).json({
//         message: 'Buku tidak ditemukan',
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: 'Terjadi kesalahan saat mengambil PDF',
//       error: error.message,
//     });
//   }
// };




// controller.getPdf= (req, res) => {
//   const idBuku = req.params.idBuku;

//    Pdf.findByPk(idBuku)
//     .then((pdf) => {
//       const filePath = path.join(__dirname, '../path/to/pdf/files/', pdf.filename);
//       const fileStream = fs.createReadStream(filePath);
//       res.setHeader('Content-Type', 'application/pdf');
//       fileStream.pipe(res);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
//   const filePath = path.join(__dirname, `asset/file_ebook/${id}.pdf`);

//   const stat = fs.statSync(filePath);
//   const fileSize = stat.size;
//   const range = req.headers.range;

//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     const chunksize = (end - start) + 1;
//     const file = fs.createReadStream(filePath, { start, end });
//     const head = {
//       'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': chunksize,
//       'Content-Type': 'application/pdf',
//     };

//     res.writeHead(206, head);
//     file.pipe(res);
//   } else {
//     const head = {
//       'Content-Length': fileSize,
//       'Content-Type': 'application/pdf',
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(filePath).pipe(res);
//   }
// };

// controller.getPDF = async function (req, res) {
//   try {
//     const book = await models.books.findOne({
//       where: {
//         idBuku: req.params.idBuku,
//       },
//     });

//     if (!book || !book.file_ebook) {
//       return res.status(404).json({
//         message: "File PDF tidak ditemukan",
//       });
//     }

    
//     res.sendFile(book.file_ebook);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Terjadi kesalahan server",
//     });
//   }
// };



controller.post = async function (req, res) {
  try {
    console.log(req.body)
    console.log(req.files)
    let coverPath = undefined;
    if (req.files.cover_buku && req.files.cover_buku[0]) {
      coverPath = req.files.cover_buku[0].path;
    }

    let ebookPath = undefined;
    if (req.files.file_ebook && req.files.file_ebook[0]) {
      ebookPath = req.files.file_ebook[0].path;
    }

    let book = await models.books.create({
      kode_buku: req.body.kode_buku,
      judul: req.body.judul,
      penulis: req.body.penulis,
      Kategori: req.body.Kategori,
      tahun_terbit: req.body.tahun_terbit,
      keterangan: req.body.keterangan,
      jumlah: req.body.jumlah,
      cover_buku: coverPath,
      file_ebook: ebookPath,
    });
    console.log(book);
    res.status(201).json({
      message: "Buku berhasil ditambahkan",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat menambahkan buku",
    });
  }
};

controller.put = async function (req, res) {
  console.log("hello")
  try {
    console.log(req.body)
    console.log(req.params)
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
          kode_buku : req.body.kode_buku,
        },
      }
    );
    res.status(200).json({
      message: "Berhasil ubah data buku",
    });
  } catch (error) {
    console.log(error)
    res.status(404).json({
      message: error,
    });
  }
};

controller.delete = async function (req, res) {
  try {
    const book = await models.books.findOne({
      where: {
        idBuku: req.params.idBuku,
      },
    });

    if (!book) {
      return res.status(404).json({
        message: "Buku tidak ditemukan",
      });
    }

    // Hapus file cover buku
    if (book.cover_buku && book.cover_buku.path!== '') {
      fs.unlinkSync(book.cover_buku);
    }

    // Hapus file ebook
    if (book.file_ebook && book.file_ebook.path!== '') {
      
      fs.unlinkSync(book.file_ebook);
    }

    // Hapus data buku dari database
    await models.books.destroy({
      where: {
        idBuku: req.params.idBuku,
      },
    });

    return res.status(200).json({
      message: "Berhasil hapus data buku",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};

controller.getSearch = async function (req, res) {
  const {search} = req.params;
  try {
    let books = await models.books.findAll({
      // attributes: ["idBuku","kode_buku", "judul", "penulis", "Kategori", "tahun_terbit", "keterangan", "jumlah", "cover_buku", "file_ebook"],
      where: {
        [Op.or]: [
          {
            kode_buku: {
              [Op.like]: `%${search}%`,
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

controller.getPdf = async function (req, res) {
  try {

    // Cari PDF berdasarkan ID di database
    let book = await models.books.findOne({
      where: {
        [Op.or]: [
          {
            idBuku: req.params.idBuku,
          },
        ],
      },
    });
    if (!book) {
      return res.status(404).json({ message: 'PDF not found.' });
    }


    const filePath = `${__dirname}/${book.file_ebook}`;
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', `inline; filename=${book.file_ebook}`);

    // console.log(filePath);
    // // Baca file PDF menggunakan stream
    // const fileStream = fs.createReadStream(filePath);
    // fileStream.pipe(res);
    // console.log(fileStream.pipe(res));
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error reading PDF:', error);
    res.status(500).json({ message: 'Error reading PDF.' });
  }
};




controller.getCategory = async function (req, res) {
  try {
    let books = await models.books.findAll({
      where: {
        [Op.or]: [
          {
            kode_buku: req.params.kode_buku,
          },
        ],
      },
    });
    // let books = await models.books.findAll({})
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


module.exports = controller;
