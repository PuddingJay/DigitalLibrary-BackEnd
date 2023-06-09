import models from '../Config/model/index.js';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';

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
  try {
    let siswa = await models.siswa.create({
      NIS: req.body.NIS,
      Nama: req.body.Nama,
      Kelas: req.body.Kelas,
      Jurusan: req.body.Jurusan,
      jumlahPinjam: 0,
    })
    res.status(201).json({
      message: 'Buku berhasil ditambahkan',
      data: siswa,
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

siswaController.login = async (req, res) => {
  const { Nama, NIS } = req.body

  try {
    // Cari pengguna dengan Nama, NIS, dan Kelas yang sesuai dalam tabel "users"
    const user = await models.siswa.findOne({ where: { Nama, NIS } })

    // Jika pengguna tidak ditemukan
    if (!user) {
      return res.status(401).json({ message: 'Nama, NIS, atau Kelas salah' })
    }

    // Membuat token JWT
    const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' })

    // Mengirim token sebagai respons
    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Terjadi kesalahan saat login' })
  }
}
export default siswaController
