import axios from "axios";

// Create an Axios instance with default settings
// This instance can be used to make HTTP requests with a base URL and default headers
// The base URL is set to the Strimz backend API endpoint
// The headers specify that the content type is JSON
export const defaultAxiosInstance = axios.create({
  baseURL: "https://strimz-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
