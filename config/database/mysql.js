var Sequelize = require('sequelize');
var db = new Sequelize('digital_library', 'root', '12345678', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
})


// var mysql = require('mysql2')

// var con = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '12345678',
//   database: 'digital_library'
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Koneksi Berhasil")
// })

module.exports = db;