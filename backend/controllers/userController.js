const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const sendEmail = require("../config/sendEmail");
const verifyEmailTemplate = require("../utils/verifyEmailTemplate");

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

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "",
      html: verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
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

module.exports = { registerUser };
