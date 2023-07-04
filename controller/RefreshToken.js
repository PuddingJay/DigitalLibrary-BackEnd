const models = require('../Config/model/index')
// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken')

const controller = {}

controller.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: 'Missing refreshToken' })
    }

    const admin = await models.admin.findOne({
      where: {
        refreshToken: refreshToken,
      },
    })

    if (!admin) {
      return res.status(403).json({ message: 'Invalid refreshToken' })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refreshToken' })
      }

      const adminId = admin.id
      const name = admin.name
      const username = admin.username
      const accessToken = jwt.sign({ adminId, name, username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s',
      })

      res.json({ accessToken })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = controller
