const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  //   secure: true,
});

const uploadImageToCloudinary = async (image) => {
  const bufferr = image?.buffer || Buffer.from(await image.ArrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "quickcart",
        },
        (error, uploadResult) => {
          return resolve(uploadResult);
        }
      )
      .end(bufferr);
  });

  return uploadImage;
};

module.exports = { uploadImageToCloudinary };
