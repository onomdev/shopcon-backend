require("dotenv").config();
const mysql = require("mysql");

const conn = mysql.createPool({
  host: "linux18.host.al",
  user: "algridal_shopcon1",
  password: "Ae36du~2",
  database: "algridal_shopcon1",
  connectionLimit: 50,
});

module.exports = {
  conn,
};
