const models = require('../Config/model/index.js')
const { Op } = require('sequelize')
const fs = require('fs')

const path = require('path')

const controller = {}

controller.getAll = async function (req, res) {
  try {
    let buku = await models.buku.findAll()
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
            kodeBuku: req.params.kodeBuku,
          },
        ],
      },
    })
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

controller.getDisetujui = async function (req, res) {
  try {
    const books = await models.books.findAll({
      where: {
        isApproval: 'Disetujui', // Filter by isApproval field
      },
    })

    if (books.length > 0) {
      res.status(200).json({
        message: 'Data buku dengan isApproval = Disetujui ditemukan',
        data: books,
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
    // Fetch books from the database and sort by 'likes' in descending order
    const books = await models.books.findAll({
      order: [['likes', 'DESC']],
      limit: 7,
    })

    res.status(200).json({ data: books })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' })
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
      ringkasan: req.body.ringkasan,
      tahun_terbit: req.body.tahun_terbit,
      keterangan: req.body.keterangan,
      jumlah: req.body.jumlah,
      tersedia: req.body.jumlah,
      cover_buku: coverPath,
      file_ebook: ebookPath,
      isApproval: req.body.isApproval,
      createdAt: new Date(),
    })

    console.log(book)
    res.status(201).json({
      message: 'Buku berhasil ditambahkan',
      data: book,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
    })
  }
}


controller.checkKodeBuku = async function (req, res) {
  try {
    const { kodeBuku } = req.params

    // Check if kodeBuku already exists in the database
    const existingBook = await models.books.findOne({
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

    const book = await models.books.findOne({
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
      Kategori: req.body.Kategori,
      ringkasan: req.body.ringkasan,
      tahun_terbit: req.body.tahun_terbit,
      keterangan: req.body.keterangan,
      jumlah: req.body.jumlah,
      tersedia: newTersedia,
      isApproval: req.body.isApproval,
    }

    if (!req.files.cover_buku && !req.files.file_ebook) {
      // Update only non-file fields when both cover_buku and file_ebook are null
      await models.books.update(updateFields, {
        where: {
          kodeBuku: req.params.kodeBuku,
        },
      })
    } else if (!req.files.cover_buku) {
      // Update fields excluding cover_buku when cover_buku is null
      updateFields.file_ebook = req.files.file_ebook[0].path
      await models.books.update(updateFields, {
        where: {
          kodeBuku: req.body.kodeBuku,
        },
      })
    } else if (!req.files.file_ebook) {
      // Update fields excluding file_ebook when file_ebook is null
      updateFields.cover_buku = req.files.cover_buku[0].path
      await models.books.update(updateFields, {
        where: {
          kodeBuku: req.params.kodeBuku,
        },
      })
    } else {
      // Update all fields when both cover_buku and file_ebook are not null
      updateFields.cover_buku = req.files.cover_buku[0].path
      updateFields.file_ebook = req.files.file_ebook[0].path
      await models.books.update(updateFields, {
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
    const query = await models.books.update(
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
    const query = await models.books.update(
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
    const book = await models.books.findOne({
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

    await models.books.update(
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
    const book = await models.books.findOne({
      where: {
        kodeBuku: req.params.kodeBuku,
      },
    })

    if (!book) {
      return res.status(404).json({
        message: 'Buku tidak ditemukan',
      })
    }

    if (book.cover_buku && book.cover_buku.path !== '' && fs.existsSync(book.cover_buku.path)) {
      fs.unlinkSync(book.cover_buku.path)
    }

    // Hapus file ebook
    if (book.file_ebook && book.file_ebook.path !== '' && fs.existsSync(book.file_ebook.path)) {
      fs.unlinkSync(book.file_ebook.path)
    }

    // Hapus data buku dari database
    await models.books.destroy({
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

controller.getPdf = async function (req, res) {
  console.log('params', req.params)
  console.log('body', req.body)
  try {
    const currentDir = process.cwd() // Get the current working directory

    // Find the PDF in the database based on the ID
    const book = await models.books.findOne({
      where: {
        kodeBuku: req.params.kodeBuku,
      },
    })

    if (book) {
      const filePath = path.join(currentDir, book.file_ebook)

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

module.exports = controller
