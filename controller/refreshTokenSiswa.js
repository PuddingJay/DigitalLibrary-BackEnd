/* eslint-disable prettier/prettier */
const models = require('../Config/model/index.js')
const jwt = require('jsonwebtoken')

const controller = {}

controller.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.params.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: 'Missing refreshToken' })
    }

    const siswa = await models.siswa.findOne({
      where: {
        refreshToken: refreshToken,
      },
    })

    // eslint-disable-next-line prettier/prettier
    if (!siswa) {
      return res.status(403).json({ message: 'Invalid Data Siswa' })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refreshToken!!' })
      }

      const siswaId = siswa.NIS
      const Nama = siswa.Nama
      const accessToken = jwt.sign({ siswaId, Nama }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '300s',
      })

      res.json({ accessToken })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = controller
