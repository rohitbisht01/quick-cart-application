const dotenv = require("dotenv");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const sendEmail = require("../config/sendEmail");
const verifyEmailTemplate = require("../utils/verifyEmailTemplate");
const { generateAccessToken, generateRefreshToken } = require("../utils/auth");
const { uploadImageToCloudinary } = require("../config/cloudinary-upload");
const generateOtp = require("../utils/generateOtp");
const forgotPasswordTemplate = require("../utils/forgotPasswordTemplate");
const jwt = require("jsonwebtoken");

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill the required fields",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(500).json({
        success: false,
        message: "User is already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify Your Email Address for QuickCart",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    return res.status(201).json({
      success: true,
      message: "User registered",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    const updatedUser = await User.updateOne(
      { _id: userId },
      {
        verify_email: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Provide all the fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registered",
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "Contact Admin",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter correct credentials",
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const updatedUser = await User.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secret: true,
      sameSite: "None", // frontend and backend are in different domain
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    res.status(200).json({
      success: true,
      message: "User logged in",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const userId = req.userId; // middleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await User.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const userId = req.userId;
    const image = req.file;
    const upload = await uploadImageToCloudinary(image);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        avatar: upload.url,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Avatar upadated",
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const userId = req.userId;

    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(password && { email: hashedPassword }),
        ...(mobile && { mobile: mobile }),
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "User updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const userDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password -refresh_token");

    res.status(200).json({
      success: true,
      message: "User details",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

// forgot password not login
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    const otp = generateOtp();
    const expireTime = new Date() + 60 * 60 * 1000;

    const update = await User.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot password from QuickCart",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    res.status(200).json({
      success: true,
      message: "Forgot password email sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Provide required fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    const currentTime = new Date().toISOString();

    // OTP expired
    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // OTP does not match
    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid OTP",
      });
    }

    // OTP matches
    const updateUser = await User.findByIdAndUpdate(user?._id, {
      forgot_password_expiry: "",
      forgot_password_otp: "",
    });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide required fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password must be same",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findOneAndUpdate(user._id, {
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return res.status(400).json({
        success: false,
        message: "Token is expired",
      });
    }

    const userId = req.userId;
    const newAccessToken = await generateAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken);

    res.status(200).json({
      success: true,
      message: "New access token generated",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

module.exports = {
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
};
