const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getProducts,
  createProduct,
} = require("../controllers/productController");
const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, createProduct);
router.post("/get", getProducts);

module.exports = router;
