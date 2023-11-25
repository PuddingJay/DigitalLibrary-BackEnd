const models = require('../Config/model/index.js')
const { Op, Sequelize } = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const xlsx = require('xlsx')

const siswaController = {}

siswaController.getAll = async function (req, res) {
  try {
    const siswa = await models.siswa.findAll({
      include: [{ model: models.akun, as: 'akun' }],
      // where: { role: 'siswa' },
    })

    const flattenedData = siswa.map((item) => ({
      idAkun: item.akun.idAkun,
      nama: item.akun.nama,
      username: item.akun.username,
      role: item.akun.role,
      siswa_NIS: item.NIS,
      status: item.status,
      jumlahPinjam: item.jumlahPinjam,
      waktuPinjam: item.waktuPinjam,
    }))

    // console.log('Siswa data fetched:', siswa)
    if (flattenedData.length > 0) {
      res.status(200).json({
        message: 'Data semua Siswa',
        data: flattenedData,
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

siswaController.getOne = async function (req, res) {
  try {
    console.log(req.params)
    let siswa = await models.akun.findAll({
      include: [{
        model: models.siswa,
        as: 'siswa',
        attributes: ['NIS'],
      }],
      attributes: ['nama', 'role', 'refreshToken'],
      where: {
        refreshToken: req.params.refreshToken,
      },
    })
    // let books = await models.books.findAll({})
    if (siswa.length > 0) {
      res.status(200).json({
        message: 'Data siswa ditemukan',
        data: siswa,
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

siswaController.register = async function (req, res) {
  const { NIS, nama } = req.body
  try {
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(NIS, salt)

    const akun = await models.akun.create({
      nama: nama,
      username: nama,
      password: hashPassword,
      role: 'siswa',
    })

    await models.siswa.create({
      NIS: NIS,
      jumlahPinjam: 0,
      akun_idAkun: akun.idAkun
    })

    res.status(201).json({
      message: 'Siswa Berhasil Ditambahkan',
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      message: error,
    })
  }
  // const { NIS, Nama, Kelas, Jurusan } = req.body
  // try {
  //   const existingSiswa = await models.akun.findOne({
  //     include: {
  //       model: models.siswa,
  //       as: 'siswa'
  //     },
  //     where: {
  //       NIS: NIS,
  //     },
  //   })

  //   if (existingSiswa) {
  //     return res.status(400).json({
  //       message: 'NIS already exists in the table',
  //     })
  //   }

  //   const salt = await bcrypt.genSalt()
  //   const hashPassword = await bcrypt.hash(NIS, salt)
  //   let siswa = await models.siswa.create({
  //     Nama: Nama,
  //     NIS: NIS,
  //     password: hashPassword,
  //     Kelas: Kelas,
  //     Jurusan: Jurusan,
  //     jumlahPinjam: 0,
  //   })

  //   res.status(201).json({
  //     message: 'Siswa Berhasil Ditambahkan',
  //   })
  // } catch (error) {
  //   process.on('uncaughtException', function (err) {
  //     console.log(req.body)
  //   })
  //   res.status(404).json({
  //     message: error,
  //   })
  // }
}

siswaController.put = async function (req, res) {
  try {
    const currentNIS = req.params.NIS
    const newNIS = req.body.NIS

    await models.siswa.update(
      {
        NIS: newNIS,
      },
      { where: { NIS: currentNIS } },
    )
    await models.akun.update(
      {
        nama: req.body.nama,
      },
      {
        where: { siswa_NIS: currentNIS },
      },
    )

    // await models.meminjam.update({ namaPeminjam: req.body.Nama }, { where: { NIS: currentNIS } })

    // await models.pengunjung.update(
    //   {
    //     nama: req.body.nama,
    //     kelas: req.body.Kelas,
    //   },
    //   { where: { NIS: currentNIS } },
    // )

    res.status(200).json({
      message: 'Berhasil ubah data anggota',
    })
  } catch (error) {
    res.status(404).json({
      message: error,
    })
  }
}

siswaController.delete = async function (req, res) {
  try {
    const akunToDelete = await models.siswa.findByPk(req.params.id, {
      include: [{ model: models.akun, as: 'akun' }],
    })
    console.log(akunToDelete)
    if (akunToDelete) {
      await akunToDelete.destroy()
      await akunToDelete.akun.destroy()

      res.status(200).json({
        message: 'Berhasil hapus data siswa',
      })
    } else {
      res.status(404).json({
        message: 'Data Siswa tidak ditemukan',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error,
    })
  }
}

siswaController.login = async (req, res) => {
  try {
    const siswa = await models.siswa.findAll({
      include: [{
        model: models.akun,
        as: 'akun',
        where: {
          nama: req.body.nama,
        },
      }],
    })
    console.log(siswa);

    const match = await bcrypt.compare(req.body.password, siswa[0].akun.password)
    if (!match) return res.status(400).json({ message: 'Wrong Password' })

    const siswaId = siswa[0].NIS
    const nama = siswa[0].nama
    const username = siswa[0].username
    const role = siswa[0].role

    const accessToken = jwt.sign(
      { siswaId, nama, username, role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '300s',
      },
    )
    const refreshToken = jwt.sign(
      { siswaId, nama, username, role },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d',
      },
    )

    await models.akun.update(
      { refreshToken: refreshToken },
      {
        where: {
          idAkun: siswa[0].akun_idAkun,
        },
      },
    )

    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    //   // secure : true
    // })
    res.json({ accessToken, refreshToken })
    console.log(refreshToken)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

siswaController.updatePassword = async (req, res) => {
  try {
    const { prevPassword, newPassword, confirmNewPassword } = req.body
    const siswaId = req.params.siswaId

    if (!siswaId) {
      return res.status(400).json({ message: 'Invalid siswa ID' })
    }

    const siswa = await models.akun.findOne({
      where: {
        siswa_NIS: siswaId,
      },
    })

    if (!siswa) {
      return res.status(404).json({ message: 'siswa not found' })
    }

    if (!prevPassword) {
      return res.status(400).json({ message: 'Password sebelumnya harus diisi' })
    }

    if (!prevPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: 'Semua kolom harus diisi' })
    }

    // If prevPassword is provided, check if it matches the existing password
    if (prevPassword) {
      const match = await bcrypt.compare(prevPassword, siswa.password)
      if (!match) {
        return res.status(400).json({ message: 'Password sebelumnya salah' })
      }
    }

    // Check if newPassword and confirmNewPassword match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'Password baru dan konfirmasi password tidak cocok' })
    }

    if (newPassword.length < 5) {
      return res
        .status(400)
        .json({ message: 'Password baru harus terdiri dari minimal 5 karakter' })
    }

    // Update the siswa data
    await models.akun.update(
      {
        password: newPassword
          ? await bcrypt.hash(newPassword, await bcrypt.genSalt())
          : siswa.password,
      },
      {
        where: {
          siswa_NIS: siswaId,
        },
      },
    )

    res.json({ message: 'Berhasil ubah password' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

siswaController.logout = async (req, res) => {
  try {
    const refreshToken = req.params.refreshToken
    if (!refreshToken) {
      return res.sendStatus(204)
    }

    const siswa = await models.akun.findOne({
      include: [{
        model: models.siswa,
        as: 'siswa'
      }],
      where: {
        refreshToken: refreshToken,
      },
    })

    if (!siswa) {
      return res.status(204).json({ message: 'Akun tidak ditemukan' })
    }

    await models.akun.update(
      { refreshToken: null },
      {
        where: {
          idAkun: siswa.idAkun,
        },
      },
    )

    // res.clearCookie('refreshToken');
    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

siswaController.importExcel = async (req, res) => {
  const file = req.file
  if (!file) {
    return res.status(400).json({ error: 'No file provided' })
  }

  const workbook = xlsx.readFile(file.path)
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const jsonData = xlsx.utils.sheet_to_json(sheet)

  return res.json(jsonData)
}

siswaController.postExcel = async (req, res) => {
  const studentsData = req.body // Get the array of student objects from the request body

  try {
    const saltRounds = 10

    for (const studentData of studentsData) {
      const { NIS, nama } = studentData
      const hashPassword = await bcrypt.hash(NIS.toString(), saltRounds)

      try {
        const akun = await models.akun.create({
          nama: nama,
          username: nama,
          password: hashPassword,
          role: 'siswa',
        })

        await models.siswa.create({
          NIS: NIS,
          jumlahPinjam: 0,
          akun_idAkun: akun.idAkun
        })
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          res.status(500).json({ message: 'Duplicate entry for NIS:', NIS })
        } else {
          throw error
        }
      }
    }

    res.status(201).json({
      message: 'Siswa Berhasil Ditambahkan',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'An error occurred while adding the students.',
    })
  }
}

siswaController.naikKelas = async (req, res) => {
  try {
    await models.siswa.update(
      {
        Kelas: Sequelize.literal('Kelas + 1'),
      },
      {
        where: {
          Kelas: {
            [Op.in]: ['10', '11'],
          },
        },
      },
    )
    return res.status(200).json({ message: 'Berhasil naik kelas' })
  } catch (err) {
    console.error('Error updating Kelas values:', err)
    return res.status(500).json({ err: 'An error occurred while updating Kelas values' })
  }
}
module.exports = siswaController
