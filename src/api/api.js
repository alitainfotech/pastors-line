import axios from "axios";

const API_URL = "https://api.dev.pastorsline.com/api/";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      `Bearer ${process.env.REACT_APP_TOKEN}`
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
