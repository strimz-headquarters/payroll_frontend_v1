import axios from "axios";
import { userManager } from "./ManageUser";

// Default instance for non-authenticated requests
export const defaultAxiosInstance = axios.create({
  baseURL: "https://strimz-backend.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Authenticated instance with token management
const axiosInstanceWithToken = axios.create({
  baseURL: "https://strimz-backend.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceWithToken.interceptors.request.use(
  (config) => {
    try {
      const userData = userManager.getUser();

      if (userData?.accessToken) {
        config.headers.Authorization = `Bearer ${userData.accessToken}`;
      } else {
        console.warn("No access token found in session");
        userManager.clearSession();
      }

      return config;
    } catch (error) {
      console.error("Session retrieval error:", error);
      userManager.clearSession();
      window.location.href = "/login";
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
axiosInstanceWithToken.interceptors.response.use(
  (response) => response,
  (error) => {
    if (401 === error.response?.status) {
      userManager.clearSession();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceWithToken;
