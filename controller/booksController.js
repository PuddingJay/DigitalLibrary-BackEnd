/* eslint-disable prettier/prettier */
const models = require('../Config/model/index.js')
const { Op } = require('sequelize')
const fs = require('fs')

const path = require('path')

const controller = {}

controller.getAll = async function (req, res) {
  try {
    const books = await models.buku.findAll({
      include: [{ model: models.kategoribuku, as: 'kategori' }],
    })

    const flattenedBukuData = books.map((item) => {
      const {
        kodeBuku,
        judul,
        penulis,
        ringkasan,
        tahunTerbit,
        keterangan,
        jumlah,
        tersedia,
        cover,
        berkasBuku,
        createdAt,
        likes,
        isApproval,
      } = item.dataValues
      const { nama } = item.kategori.dataValues
      return {
        kodeBuku,
        judul,
        penulis,
        ringkasan,
        tahunTerbit,
        keterangan,
        jumlah,
        tersedia,
        cover,
        berkasBuku,
        createdAt,
        likes,
        isApproval,
        kategori: nama,
      }
    })

    if (flattenedBukuData.length > 0) {
      res.status(200).json({
        message: 'Data semua Buku',
        data: flattenedBukuData,
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
    let buku = await models.buku.findAll({
      where: {
        kodeBuku: req.params.kodeBuku,
      },
      include: [{ model: models.kategoribuku, as: 'kategori' }],
    })

    const flattenedBukuData = buku.map((item) => {
      const {
        kodeBuku,
        judul,
        penulis,
        ringkasan,
        tahunTerbit,
        keterangan,
        jumlah,
        tersedia,
        cover,
        berkasBuku,
        createdAt,
        likes,
        isApproval,
      } = item.dataValues
      const { nama } = item.kategori.dataValues
      return {
        kodeBuku,
        judul,
        penulis,
        ringkasan,
        tahunTerbit,
        keterangan,
        jumlah,
        tersedia,
        cover,
        berkasBuku,
        createdAt,
        likes,
        isApproval,
        kategori: nama,
      }
    })

    if (flattenedBukuData.length > 0) {
      res.status(200).json({
        message: 'Data buku ditemukan',
        data: flattenedBukuData,
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

controller.getDisetujui = async function (req, res) {
  try {
    const buku = await models.buku.findAll({
      where: {
        isApproval: 'Disetujui', // Filter by isApproval field
      },
    })

    if (buku.length > 0) {
      res.status(200).json({
        message: 'Data buku dengan isApproval = Disetujui ditemukan',
        data: buku,
      })
    } else {
      res.status(200).json({
        message: 'Tidak ada data dengan isApproval = Disetujui',
        data: [],
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error,
    })
  }
}

controller.getLikes = async function (req, res) {
  try {
    // Fetch buku from the database and sort by 'likes' in descending order
    const buku = await models.buku.findAll({
      order: [['likes', 'DESC']],
      limit: 7,
    })

    res.status(200).json({ data: buku })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buku' })
  }
}

controller.post = async function (req, res) {
  try {
    console.log(req.body)
    console.log(req.files)
    let coverPath = undefined
    if (req.files.cover && req.files.cover[0]) {
      coverPath = req.files.cover[0].path
    }

    let ebookPath = undefined
    if (req.files.berkasBuku && req.files.berkasBuku[0]) {
      ebookPath = req.files.berkasBuku[0].path
    }

    const selectedCategory = await models.kategoribuku.findByPk(req.body.kategori_idKategori)

    if (!selectedCategory) {
      return res.status(404).json({
        message: 'Kategori tidak ditemukan',
      })
    }

    let book = await models.buku.create({
      kodeBuku: req.body.kodeBuku,
      judul: req.body.judul,
      penulis: req.body.penulis,
      kategori_idKategori: req.body.kategori_idKategori,
      ringkasan: req.body.ringkasan,
      tahunTerbit: req.body.tahunTerbit,
      keterangan: req.body.keterangan,
      jumlah: req.body.jumlah,
      tersedia: req.body.jumlah,
      cover: coverPath,
      berkasBuku: ebookPath,
      isApproval: req.body.isApproval,
      createdAt: new Date(),
    })

    console.log(book)
    res.status(201).json({
      message: 'Buku berhasil ditambahkan',
      data: {
        ...book.toJSON(),
        kategori: selectedCategory.nama, // Masukkan nama kategori ke dalam data response
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error,
    })
  }
}

controller.checkKodeBuku = async function (req, res) {
  try {
    const { kodeBuku } = req.params

    // Check if kodeBuku already exists in the database
    const existingBook = await models.buku.findOne({
      where: {
        kodeBuku: kodeBuku,
      },
    })

    if (existingBook) {
      // Return a response indicating that kodeBuku already exists
      return res.status(200).json({
        exists: true,
        message: 'Kode Buku already exists in the database.',
      })
    } else {
      // Return a response indicating that kodeBuku does not exist
      return res.status(200).json({
        exists: false,
        message: 'Kode Buku does not exist in the database.',
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal server error.',
    })
  }
}

controller.put = async function (req, res) {
  console.log('hello')
  try {
    console.log('req.body', req.body)
    console.log('req.params', req.params.kodeBuku[0])
    const kodeBukuJSON = JSON.stringify(req.params) // null dan 2 adalah parameter opsional untuk memberi indentasi pada hasil JSON

    // Tampilkan hasil stringifikasi JSON
    console.log('hasil stringify', kodeBukuJSON)

    const book = await models.buku.findOne({
      where: {
        kodeBuku: req.params.kodeBuku,
      },
    })

    // Check if the book exists
    if (!book) {
      return res.status(404).json({
        message: 'Book not found. Unable to update.',
      })
    }

    // Calculate the difference between the new jumlah and the old jumlah
    const newJumlah = parseInt(req.body.jumlah)
    const oldJumlah = parseInt(book.jumlah)
    const jumlahDiff = newJumlah - oldJumlah

    // Calculate the new value for tersedia
    const newTersedia = parseInt(book.tersedia) + jumlahDiff

    let updateFields = {
      judul: req.body.judul,
      penulis: req.body.penulis,
      kategori_idKategori: req.body.kategori_idKategori,
      ringkasan: req.body.ringkasan,
      tahunTerbit: req.body.tahunTerbit,
      keterangan: req.body.keterangan,
      jumlah: req.body.jumlah,
      tersedia: newTersedia,
      isApproval: req.body.isApproval,
    }

    if (!req.files.cover && !req.files.berkasBuku) {
      // Update only non-file fields when both cover and berkasBuku are null
      await models.buku.update(updateFields, {
        where: {
          kodeBuku: req.params.kodeBuku,
        },
      })
    } else if (!req.files.cover) {
      // Update fields excluding cover when cover is null
      updateFields.berkasBuku = req.files.berkasBuku[0].path
      await models.buku.update(updateFields, {
        where: {
          kodeBuku: req.body.kodeBuku,
        },
      })
    } else if (!req.files.berkasBuku) {
      // Update fields excluding berkasBuku when berkasBuku is null
      updateFields.cover = req.files.cover[0].path
      await models.buku.update(updateFields, {
        where: {
          kodeBuku: req.params.kodeBuku,
        },
      })
    } else {
      // Update all fields when both cover and berkasBuku are not null
      updateFields.cover = req.files.cover[0].path
      updateFields.berkasBuku = req.files.berkasBuku[0].path
      await models.buku.update(updateFields, {
        where: {
          kodeBuku: req.params.kodeBuku,
        },
      })
    }

    res.status(200).json({
      message: 'Berhasil ubah data buku',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error,
    })
  }
}
controller.putApprove = async function (req, res) {
  console.log('Received request with kodeBuku:', req.params.kodeBuku)
  console.log('Received request with isApproval:', req.body.isApproval)
  try {
    const query = await models.buku.update(
      {
        isApproval: req.body.isApproval,
      },
      {
        where: {
          kodeBuku: req.params.kodeBuku,
        },
      },
    )

    console.log('SQL Query:', query)
    res.status(200).json({
      message: 'Berhasil ubah data buku',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error,
    })
  }
}
controller.putRejected = async function (req, res) {
  console.log('Received request with kodeBuku:', req.params.kodeBuku)
  console.log('Received request with isApproval:', req.body.isApproval)
  try {
    const query = await models.buku.update(
      {
        isApproval: req.body.isApproval,
      },
      {
        where: {
          kodeBuku: req.params.kodeBuku,
        },
      },
    )

    console.log('SQL Query:', query)
    res.status(200).json({
      message: 'Berhasil ubah data buku',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error,
    })
  }
}

controller.putLike = async function (req, res) {
  console.log('hello')
  try {
    const book = await models.buku.findOne({
      where: {
        kodeBuku: req.body.kodeBuku,
      },
    })

    // Check if the book exists
    if (!book) {
      return res.status(404).json({
        message: 'Book not found. Unable to update.',
      })
    }

    await models.buku.update(
      {
        likes: req.body.likes,
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
    console.log(error)
    res.status(500).json({
      message: error,
    })
  }
}

controller.delete = async function (req, res) {
  try {
    const book = await models.buku.findOne({
      where: {
        kodeBuku: req.params.kodeBuku,
      },
    })

    if (!book) {
      return res.status(404).json({
        message: 'Buku tidak ditemukan',
      })
    }

    if (book.cover && book.cover.path !== '' && fs.existsSync(book.cover.path)) {
      fs.unlinkSync(book.cover.path)
    }

    // Hapus file ebook
    if (book.berkasBuku && book.berkasBuku.path !== '' && fs.existsSync(book.berkasBuku.path)) {
      fs.unlinkSync(book.berkasBuku.path)
    }

    // Hapus data buku dari database
    await models.buku.destroy({
      where: {
        kodeBuku: req.params.kodeBuku,
      },
    })

    return res.status(200).json({
      message: 'Berhasil hapus data buku',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Terjadi kesalahan server',
    })
  }
}

controller.getSearch = async function (req, res) {
  const { search } = req.params
  try {
    let buku = await models.buku.findAll({
      attributes: [
        'kodeBuku',
        'judul',
        'penulis',
        'kategori_idKategori',
        'tahunTerbit',
        'keterangan',
        'jumlah',
        'cover',
        'berkasBuku',
      ],
      where: {
        [Op.or]: [
          {
            kodeBuku: {
              [Op.like]: '%' + search + '%',
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
            kategori_idKategori: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            tahunTerbit: {
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
    if (buku.length > 0) {
      res.status(200).json({
        message: 'Data semua Buku',
        data: buku,
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
  console.log('params', req.params)
  console.log('body', req.body)
  try {
    const currentDir = process.cwd() // Get the current working directory

    // Find the PDF in the database based on the ID
    const book = await models.buku.findOne({
      where: {
        kodeBuku: req.params.kodeBuku,
      },
    })

    if (book) {
      const filePath = path.join(currentDir, book.berkasBuku)

      if (fs.existsSync(filePath)) {
        res.sendFile(filePath)
        console.log(filePath)
      } else {
        return res.status(404).json({ message: 'PDF file not found.' })
      }
    } else {
      return res.status(404).json({ message: 'PDF not found.' })
    }
  } catch (error) {
    console.error('Error reading PDF:', error)
    res.status(500).json({ message: 'Error reading PDF.', error: error.message })
  }
}

controller.getCategory = async function (req, res) {
  try {
    let buku = await models.buku.findAll({
      where: {
        [Op.or]: [
          {
            kodeBuku: req.params.kodeBuku,
          },
        ],
      },
    })
    // let buku = await models.buku.findAll({})
    if (buku.length > 0) {
      res.status(200).json({
        message: 'Data buku ditemukan',
        data: buku,
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

module.exports = controller
