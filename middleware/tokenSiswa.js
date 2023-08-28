/* eslint-disable prettier/prettier */
const jwt = require('jsonwebtoken')

function tokenSiswa(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.Nama = decoded.Nama
    next()
  })
}

// eslint-disable-next-line prettier/prettier
module.exports = tokenSiswa
