const models = require('../Config/model/index.js');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const siswaController = {};

siswaController.getAll = async function (req, res) {
  try {
    let siswa = await models.siswa.findAll({
      attributes: ['NIS', 'Nama', 'Kelas', 'Jurusan', 'jumlahPinjam', 'waktuPinjam'],
    })
    if (siswa.length > 0) {
      res.status(200).json({
        message: 'Data semua Siswa',
        data: siswa,
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
    let siswa = await models.siswa.findAll({
      where: {
        [Op.or]: [
          {
            NIS: req.params.NIS,
          },
        ],
      },
    })
    // let books = await models.books.findAll({})
    if (siswa.length > 0) {
      res.status(200).json({
        message: 'Data buku ditemukan',
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

siswaController.post = async function (req, res) {
  const { NIS, Nama, Kelas, Jurusan } = req.body
  const salt = await bcrypt.genSalt()
  const hashPassword = await bcrypt.hash(NIS, salt)
  try {
    let siswa = await models.siswa.create({
      Nama: Nama,
      NIS: NIS,
      password: hashPassword,
      Kelas: Kelas,
      Jurusan: Jurusan,
      jumlahPinjam: 0,
    })

    res.status(201).json({
      message: 'Siswa Berhasil Ditambahkan',
    })
  } catch (error) {
    process.on('uncaughtException', function (err) {
      console.log(req.body)
    })
    res.status(404).json({
      message: error,
    })
  }
}

siswaController.put = async function (req, res) {
  try {
    const currentNIS = req.params.NIS; // Current NIS value
    const newNIS = req.body.NIS; // New NIS value

    // Check if the new NIS value is different from the current NIS value
    if (newNIS !== currentNIS) {
      // Update the NIS value in the database for the corresponding anggota
      await models.siswa.update(
        { NIS: newNIS },
        { where: { NIS: currentNIS } }
      );
    }

    // Update the other properties of the anggota
    await models.siswa.update(
      {
        Nama: req.body.Nama,
        Kelas: req.body.Kelas,
        Jurusan: req.body.Jurusan,
      },
      {
        where: {
          NIS: currentNIS,
        },
      }
    );

    res.status(200).json({
      message: 'Berhasil ubah data anggota',
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
    })
    res.status(200).json({
      message: 'Berhasil hapus data buku',
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      message: error,
    })
  }
}

siswaController.getSearch = async function (req, res) {
  const search = req.query.keyword
  try {
    let siswa = await models.siswa.findAll({
      attributes: ['NIS', 'Nama', 'Kelas', 'Jurusan'],
      where: {
        [Op.or]: [
          {
            NIS: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            Nama: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            Kelas: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            Jurusan: {
              [Op.like]: '%' + search + '%',
            },
          },
        ],
      },
    })
    if (siswa.length > 0) {
      res.status(200).json({
        message: 'Data semua Buku',
        data: siswa,
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

// siswaController.login = async (req, res) => {
//   const { Nama, NIS } = req.body

//   try {
//     // Cari pengguna dengan Nama, NIS, dan Kelas yang sesuai dalam tabel "users"
//     const user = await models.siswa.findOne({ where: { Nama, NIS } })

//     // Jika pengguna tidak ditemukan
//     if (!user) {
//       return res.status(401).json({ message: 'Nama, NIS, atau Kelas salah' })
//     }

//     // Membuat token JWT
//     const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' })

//     // Mengirim token sebagai respons
//     res.status(200).json({ token })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Terjadi kesalahan saat login' })
//   }
// }
siswaController.login = async (req, res) => {
  try {
    const siswa = await models.siswa.findAll({
      where: {
        Nama: req.body.Nama,
      },
    })

    const match = await bcrypt.compare(req.body.password, siswa[0].password)
    if (!match) return res.status(400).json({ message: 'Wrong Password' })

    const siswaId = siswa[0].NIS
    const Nama = siswa[0].Nama

    const accessToken = jwt.sign({ siswaId, Nama }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '300s',
    })
    const refreshToken = jwt.sign({ siswaId, Nama }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    })

    await models.siswa.update(
      { refreshToken: refreshToken },
      {
        where: {
          NIS: siswaId,
        },
      },
    )

    res.cookie('refreshTokenSiswa', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure : true
    })
    res.json({ accessToken })
    console.log(refreshToken)
  } catch (err) {
    res.status(404).json({ message: 'Nama atau NIS salah' })
  }
}

siswaController.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshTokenSiswa
    if (!refreshToken) {
      return res.sendStatus(204)
    }

    const siswa = await models.siswa.findOne({
      where: {
        refreshToken: refreshToken,
      },
    })

    if (!siswa) {
      return res.sendStatus(204)
    }

    const siswaId = siswa.NIS

    await models.siswa.update(
      { refreshToken: null },
      {
        where: {
          NIS: siswaId,
        },
      },
    )

    res.clearCookie('refreshTokenSiswa')
    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
module.exports = siswaController;
