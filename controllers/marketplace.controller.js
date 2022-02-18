const { conn } = require("../db/db.config");

const searchForProduct = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * FROM marketplace WHERE product_name LIKE '%${req.params.product_name}%' ORDER BY id DESC`,
      [req.params.product_name],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};

const getAllProductsByCategory = async (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * from marketplace WHERE category = ? ORDER BY id DESC`,
      [req.params.category],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};

const getAllProducts = (req, res, next) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * from marketplace ORDER BY id DESC",
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};

const getAProductById = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "SELECT * from marketplace WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection to pool

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};

const createProduct = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    const params = {
      product_name: req.body.product_name,
      description: req.body.description,
      created_at: req.body.created_at,
      posted_by: req.body.posted_by,
      product_image: req.file.filename,
      contact_nr: req.body.contact_nr,
      category: req.body.category,
    };

    connection.query("INSERT INTO marketplace SET ?", params, (err, rows) => {
      connection.release();

      if (!err) {
        res.send(
          `Product with the name: ${params.product_name} has been added.`
        );
      } else {
        console.log(err);
      }
    });
  });
};

const deleteProduct = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    connection.query(
      "DELETE from marketplace WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(`Product with ID: ${[req.params.id]} has been removed.`);
        } else {
          console.log(err);
        }
      }
    );
  });
};

const updateProduct = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const {
      id,
      product_image,
      description,
      product_name,
      posted_by,
      created_at,
      contact_nr,
      category,
    } = req.body;

    connection.query(
      "UPDATE marketplace SET product_name = ?, description = ?, product_image = ?, posted_by = ?, created_at = ?, contact_nr = ?, category = ? WHERE id = ?",
      [
        product_name,
        description,
        product_image,
        posted_by,
        created_at,
        contact_nr,
        req.params.id,
        category,
      ],
      (err, rows) => {
        if (!err) {
          res.send(`Product with id: ${req.params.id} has been updated`);
        } else {
          console.log(err);
        }
      }
    );
    console.log(req.body);
  });
};

module.exports = {
  searchForProduct,
  getAllProducts,
  getAProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProductsByCategory,
};
