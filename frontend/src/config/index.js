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
};

export default allApis;
