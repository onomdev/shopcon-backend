require("dotenv").config();
const mysql = require("mysql");

const conn = mysql.createPool({
  host: "localhost:3306",
  user: "algridal_orgito",
  password: "0L9u2jd^",
  database: "algridal_shopcon",
  connectionLimit: 50,
});

module.exports = {
  conn,
};
