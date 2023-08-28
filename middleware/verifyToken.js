/* eslint-disable prettier/prettier */
const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.username = decoded.username
    next()
  })
}

// eslint-disable-next-line prettier/prettier
module.exports = verifyToken
