const { conn } = require("../db/db.config");

const searchForJobs = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * FROM jobs WHERE title LIKE '%${req.params.title}%' ORDER BY id DESC`,
      [req.params.title],
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

const getAllJobs = async (req, res, next) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query("SELECT * from jobs ORDER BY id DESC", (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
};

const getAllJobsByCategory = async (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * from jobs WHERE category = ? ORDER BY id DESC`,
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

const getAJobById = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "SELECT * from jobs WHERE id = ?",
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

const deleteJob = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "DELETE from jobs WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection to pool

        if (!err) {
          res.send(
            `Job with the Record ID: ${[req.params.id]} has been removed.`
          );
        } else {
          console.log(err);
        }
      }
    );
  });
};

const createJob = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const params = {
      title: req.body.title,
      description: req.body.description,
      created_at: req.body.created_at,
      posted_by: req.body.posted_by,
      jobimage: req.file.filename,
      contact_nr: req.body.contact_nr,
      category: req.body.category,
    };

    connection.query("INSERT INTO jobs SET ?", params, (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(`Job with the title: ${params.title} has been added.`);
      } else {
        console.log(err);
      }
    });

    console.log(req.body);
  });
};

const updateJob = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const {
      id,
      title,
      description,
      jobimage,
      posted_by,
      created_at,
      contact_nr,
      category,
    } = req.body;

    connection.query(
      "UPDATE jobs SET title = ?, description = ?, jobimage = ?, posted_by = ?, created_at = ?, contact_nr = ?, category = ? WHERE id = ?",
      [
        title,
        description,
        jobimage,
        posted_by,
        created_at,
        contact_nr,
        req.params.id,
        category,
      ],
      (err, rows) => {
        connection.release(); // return the connection to pool

        if (!err) {
          res.send(`Job with id: ${req.params.id} has been updated.`);
        } else {
          console.log(err);
        }
      }
    );

    console.log(req.body);
  });
};

module.exports = {
  getAJobById,
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
  searchForJobs,
  getAllJobsByCategory,
};
