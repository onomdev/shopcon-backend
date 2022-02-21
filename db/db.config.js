require("dotenv").config();
const mysql = require("mysql");

const conn = mysql.createPool({
  host: "localhost",
  user: "algridal_shopcon",
  password: "0L9u2jd^",
  database: "shopcon",
  connectionLimit: 50,
});

module.exports = {
  conn,
};
