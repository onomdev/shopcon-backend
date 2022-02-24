require("dotenv").config();
const mysql = require("mysql");

const conn = mysql.createPool({
  host: "",
  user: "",
  password: "",
  database: "",
  connectionLimit: 50,
});

module.exports = {
  conn,
};
