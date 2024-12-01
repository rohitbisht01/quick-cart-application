const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getProducts,
  createProduct,
  updateProductDetails,
  deleteProduct,
  searchProduct,
  getProductByCategory,
  getProductDetails,
  getProductByCategoryAndSubcategory,
} = require("../controllers/productController");
const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, createProduct);
router.post("/get", getProducts);
router.post("/get-product-by-category", getProductByCategory);
router.post(
  "/get-product-by-category-and-subcategory",
  getProductByCategoryAndSubcategory
);
router.post("/get-product-details", getProductDetails);

router.put(
  "/update-product-details",
  authMiddleware,
  adminMiddleware,
  updateProductDetails
);
router.delete(
  "/delete-product-details",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);
router.post("/search-product", searchProduct);

module.exports = router;
