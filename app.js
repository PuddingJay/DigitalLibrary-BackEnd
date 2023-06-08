const express = require("express");
// const morgan = require("morgan");a
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')

const BookRouter = require("./routes/BookRoute");

const app = express();
// app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/asset/cover", express.static(path.join(__dirname, 'asset/cover')));
app.use("/BookRoute", BookRouter);

app.use((req, res, next) => {
  const error = new Error("Could Not Request");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});


module.exports = app;

