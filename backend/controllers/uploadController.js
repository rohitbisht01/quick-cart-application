const { uploadImageToCloudinary } = require("../config/cloudinary-upload");

const uploadImageFun = async (req, res) => {
  try {
    const file = req.file;
    const response = await uploadImageToCloudinary(file);

    res.status(200).json({
      success: true,
      message: "Image uploded",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

module.exports = { uploadImageFun };
