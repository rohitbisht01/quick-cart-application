const express = require("express");
const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add-category", authMiddleware, addCategory);
router.get("/get", authMiddleware, getCategory);
router.put("/update", authMiddleware, updateCategory);
router.delete("/delete", authMiddleware, deleteCategory);

module.exports = router;
