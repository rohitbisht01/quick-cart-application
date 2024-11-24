import allApis from "../config";
import network from "./network";

export const isAdminUser = (role) => role === "ADMIN";

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await network({
      ...allApis.uploadImage,
      data: formData,
    });
    return response;
  } catch (error) {
    return error;
  }
};
