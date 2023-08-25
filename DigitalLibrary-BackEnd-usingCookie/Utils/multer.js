/* eslint-disable no-underscore-dangle */
const multer = require("multer");

class DiskSTorage {
  constructor(folder) {
    this._storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, folder);
      },
      filename: (req, file, cb) => {
        const exten = file.originalname; // .split(".").pop();

        const timeStamp = new Date().getTime();
        const newFileName = `img-${timeStamp}.${exten}`;
        cb(null, newFileName);
      },
    });

    this._limits = {
      fileSize: 6000000, // 5MB
      files: 5,
    };

    this._filterFile = (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "file/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Tidak mendukung file tersebut hanya jpg, jpeg, png yang mendukung"));
      }
    };
  }
}

module.exports = DiskSTorage;
