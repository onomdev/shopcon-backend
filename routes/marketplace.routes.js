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
  .route("/categories/marketplace/products")
  .get(getAllProducts)
  .post(upload.single("product_image"), createProduct);
router
  .route("/categories/marketplace/products/search/:product_name")
  .get(searchForProduct);
router
  .route("/categories/marketplace/products/:id")
  .get(getAProductById)
  .delete(deleteProduct)
  .patch(updateProduct);

router
  .route("/categories/marketplace/products/categories/:category")
  .get(getAllProductsByCategory);
module.exports = router;
