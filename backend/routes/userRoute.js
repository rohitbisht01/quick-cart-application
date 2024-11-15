const express = require("express");
const {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  uploadAvatar,
  updateUser,
  userDetails,
  forgotPassword,
  verifyForgotPasswordOtp,
  resetPassword,
  refreshToken,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multerMiddleware");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/login", loginUser);
userRouter.get("/logout", authMiddleware, logoutUser);
userRouter.put(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatar
);
userRouter.put("/update-user", authMiddleware, updateUser);
userRouter.put("/forgot-password", forgotPassword);
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.get("/user-details", authMiddleware, userDetails);
userRouter.put("/reset-password", resetPassword);
userRouter.put("/refresh-token", refreshToken);

module.exports = userRouter;
