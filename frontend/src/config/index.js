export const baseUrl = "http://localhost:4000";

const allApis = {
  register: {
    url: "/api/v1/user/register",
    method: "post",
  },
  login: {
    url: "/api/v1/user/login",
    method: "post",
  },
  userDetails: {
    url: "/api/v1/user/user-details",
    method: "get",
  },
  forgotPassword: {
    url: "/api/v1/user/forgot-password",
    method: "put",
  },
  verifiyForgotPasswordOtp: {
    url: "/api/v1/user/verify-forgot-password-otp",
    method: "put",
  },
  resetPassword: {
    url: "/api/v1/user/reset-password",
    method: "put",
  },

  logout: {
    url: "/api/v1/user/logout",
    method: "get",
  },

  // User Avatar upload
  uploadAvatar: {
    url: "/api/v1/user/upload-avatar",
    method: "put",
  },
  updateUserInfo: {
    url: "/api/v1/user/update-user",
    method: "put",
  },

  uploadImage: {
    url: "/api/v1/file/upload",
    method: "post",
  },

  // Category
  addCategory: {
    url: "/api/v1/category/add-category",
    method: "post",
  },
  getCategory: {
    url: "/api/v1/category/get",
    method: "get",
  },
  deleteCategory: {
    url: "/api/v1/category/delete",
    method: "delete",
  },
  updateCategory: {
    url: "/api/v1/category/update",
    method: "put",
  },

  // Subcategory
  createSubCategory: {
    url: "/api/v1/subcategory/create",
    method: "post",
  },
  getSubCategory: {
    url: "/api/v1/subcategory/get",
    method: "get",
  },
  updateSubCategory: {
    url: "/api/v1/subcategory/update",
    method: "put",
  },
  deleteSubCategory: {
    url: "/api/v1/subcategory/delete",
    method: "delete",
  },
};

export default allApis;
