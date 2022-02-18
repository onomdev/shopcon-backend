require("dotenv").config();
const mysql = require("mysql");

const conn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 30,
});

module.exports = {
  conn,
};
