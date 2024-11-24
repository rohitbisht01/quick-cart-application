const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multerMiddleware");
const { uploadImageFun } = require("../controllers/uploadController");

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("image"), uploadImageFun);

module.exports = router;
