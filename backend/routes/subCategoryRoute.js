const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createSubCategory,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require("../controllers/subCategoryController");
const router = express.Router();

router.post("/create", authMiddleware, createSubCategory);
router.get("/get", getSubcategory);
router.put("/update", authMiddleware, updateSubcategory);
router.delete("/delete", authMiddleware, deleteSubcategory);

module.exports = router;
