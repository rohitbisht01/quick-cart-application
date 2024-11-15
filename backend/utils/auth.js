const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateAccessToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    {
      expiresIn: "5h",
    }
  );

  return token;
};

const generateRefreshToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    {
      expiresIn: "7h",
    }
  );

  const updateRefreshTokenUser = await User.updateOne(
    { _id: userId },
    {
      refresh_token: token,
    }
  );

  return token;
};

module.exports = { generateAccessToken, generateRefreshToken };
