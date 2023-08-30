const models = require("../Config/model/index.js")
const { format } = require('date-fns');
const { Op } = require("sequelize");

const controller = {};

controller.post = async (req, res) => {
  try {
    // const currentTime = new Date();
    // const formattedTime = format(currentTime, "yyyy-MM-dd, HH:mm:ss");

    const { nama, tipePengunjung, asal } = req.body;

    const existingRecord = await models.pengunjung.findOne({
      where: {
        nama,
        tipePengunjung,
        asal,
        waktuKunjung: {
          [Op.gte]: new Date().setHours(0, 0, 0, 0),
          [Op.lt]: new Date().setHours(24, 0, 0, 0),
        },
      },
    });

    if (existingRecord) {
      return res.status(400).json({
        message: "Anda telah mengisi formulir ini hari ini. Silakan mencoba kembali besok",
      });
    }

    let pengunjung = await models.pengunjung.create({
      nama,
      tipePengunjung,
      asal,
      waktuKunjung: new Date(),
    })
    res.status(201).json({
      message: "Selamat Berkunjung di Perpustakaan SMA Yuppentek 1 Kota Tangerang",
      data: pengunjung,
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      message: "Terjadi kesalahan. Silahkan periksa data dan coba kembali"
    })
  }
}

controller.getAll = async (req, res) => {
  try {
    const dataPengunjung = await models.pengunjung.findAll();
    res.status(200).json({
      message: "Data Seluruh Pengunjung",
      data: dataPengunjung,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data pengunjung"
    });
  }
}

controller.delete = async function (req, res) {
  try {
    const pengunjung = await models.pengunjung.findOne({
      where: {
        idPengunjung: req.params.idPengunjung,
      },
    })

    if (!pengunjung) {
      return res.status(404).json({
        message: 'Data tidak ditemukan',
      })
    }

    await models.pengunjung.destroy({
      where: {
        idPengunjung: req.params.idPengunjung,
      },
    })

    res.status(200).json({
      message: 'Berhasil Hapus Data Peminjaman',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = controller