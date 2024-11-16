import axios from "axios";
import { baseUrl } from "../config";

const network = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// using interceptors to send the access token with the request from local storage
network.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default network;
