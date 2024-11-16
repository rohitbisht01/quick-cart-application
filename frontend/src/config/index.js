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
};

export default allApis;
