const User = require("../models/userModel");

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (user.role !== "ADMIN") {
      return res.status(400).json({
        message: "Permission Denied",
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Permission Denied",
      success: false,
    });
  }
};

module.exports = adminMiddleware;
