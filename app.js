import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import BookRouter from "./routes/BookRoute.js";
import db from './Config/database/db.js';
// import admin from './Config/model/adminModel.js'
dotenv.config();
const app = express();
app.use(cookieParser());


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
})
try {
  await db.authenticate();
  console.log('Database Connected')
  // await admin.sync();
} catch (err) {
  console.error(err);
}


export default app;
