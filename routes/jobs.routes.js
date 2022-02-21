const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

const {
  getAJobById,
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
  searchForJobs,
  getAllJobsByCategory,
} = require("../controllers/jobs.controller");

// .route("/categories/jobs")
router
  .route("/categories/jobs")
  .get(getAllJobs)
  .post(upload.single("jobimage"), createJob);

//.route("/categories/jobs/:id")
router
  .route("/categories/jobs/:id")
  .get(getAJobById)
  .delete(deleteJob)
  .patch(updateJob);

// "/categories/jobs/search/:title"
router.route("/categories/jobs/search/:title").get(searchForJobs);
// "/categories/jobs/categories/:category"
router.route("/categories/jobs/categories/:category").get(getAllJobsByCategory);

module.exports = router;
