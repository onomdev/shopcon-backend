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
  .route(process.env.JOBS_ENDPOINT)
  .get(getAllJobs)
  .post(upload.single("jobimage"), createJob);

//.route("/categories/jobs/:id")
router
  .route(process.env.JOBS_ID_ENDPOINT)
  .get(getAJobById)
  .delete(deleteJob)
  .patch(updateJob);

// "/categories/jobs/search/:title"
router.route(process.env.JOBS_SEARCH_ENDPOINT).get(searchForJobs);
// "/categories/jobs/categories/:category"
router.route(process.env.JOBS_CATEGORY_ENDPOINT).get(getAllJobsByCategory);

module.exports = router;
