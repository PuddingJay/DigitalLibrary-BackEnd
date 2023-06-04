const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(cors({ origin: 'http://localhost:3000' }));

const peminjamanRoutes = require('./routes/peminjaman');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('*/peminjaman', peminjamanRoutes);

app.use((req, res, next) => {
  const error = new Error('Could Not Request');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;