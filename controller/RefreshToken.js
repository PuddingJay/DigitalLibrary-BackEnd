const models = require('../Config/model/index.js')
const jwt = require('jsonwebtoken')

const controller = {}

controller.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.params.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: 'Missing refreshToken' })
    }

    const admin = await models.akun.findOne({
      where: {
        refreshToken: refreshToken,
        role: ['admin', 'superadmin'],
      },
    })

    if (!admin) {
      return res.status(403).json({ message: 'Bukan Admin' })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refreshToken' })
      }

      const adminId = admin.idAkun
      const name = admin.nama
      const username = admin.username
      const role = admin.role
      const accessToken = jwt.sign(
        { adminId, name, username, role },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '15s',
        },
      )
      req.adminId = decoded.id
      res.json({ accessToken })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = controller
