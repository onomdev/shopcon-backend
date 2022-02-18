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
  searchForProduct,
  getAllProducts,
  getAProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProductsByCategory,
} = require("../controllers/marketplace.controller");

router
  .route(process.env.PRODUCTS_ENDPOINT)
  .get(getAllProducts)
  .post(upload.single("product_image"), createProduct);
router.route(process.env.PRODUCTS_SEARCH_ENDPOINT).get(searchForProduct);
router
  .route(process.env.PRODUCTS_ID_ENDPOINT)
  .get(getAProductById)
  .delete(deleteProduct)
  .patch(updateProduct);

router
  .route(process.env.PRODUCTS_CATEGORY_ENDPOINT)
  .get(getAllProductsByCategory);
module.exports = router;
