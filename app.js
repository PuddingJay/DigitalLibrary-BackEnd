#!/opt/alt/alt-nodejs12/root/usr/bin/node
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const { fileURLToPath } = require('url');
const BookRouter = require("./routes/BookRoute.js");
const db = require('./Config/database/db.js');
// const admin = require('./Config/model/adminModel.js');
dotenv.config();
app.use(cookieParser());

const allowedOrigins = ['http://localhost:3000', 'https://librarysmayuppentek.sch.id'];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  next();
});


// Remove the following line, as __dirname is already predefined in CommonJS modules
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use("/asset/cover", express.static(path.join(__dirname, 'asset/cover')));
app.use(BookRouter);

app.use((req, res, next) => {
  const error = new Error("Could Not Request");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
});

db.authenticate()
  .then(() => {
    console.log('Database Connected');
    // admin.sync();
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;
