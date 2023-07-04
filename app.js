const express = require('express')
// const morgan = require("morgan");
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const { fileURLToPath } = require('url')
const db = require('./Config/database/db.js')
const BookRouter = require('./routes/BookRoute')

dotenv.config()
const app = express()
app.use(cookieParser())
// app.use(morgan("dev"));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

app.use('/asset/cover', express.static(path.join(__dirname, 'asset/cover')))
app.use('/asset/file_ebook', express.static(path.join(__dirname, 'asset/file_ebook')))
app.use(BookRouter)

app.use((req, res, next) => {
  const error = new Error('Could Not Request')
  error.status = 404
  next(error)
})
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})
async function connectToDatabase() {
  try {
    await db.authenticate()
    console.log('Database Connected')
    // await admin.sync();
  } catch (err) {
    console.error(err)
  }
}

connectToDatabase()

module.exports = app
