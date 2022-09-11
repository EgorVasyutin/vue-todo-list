import axios from "axios";
import AuthService from "@/api/services/authService";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:1000/api/",
  withCredentials: true,
  timeout: 1000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        // const response = await axios.get("api/refresh", {
        //   withCredentials: true,
        // });
        // const response = await AuthService.refresh();
        // console.log(response);
        // localStorage.setItem("accessToken", response.data.accessToken);
        // return axiosInstance.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
    throw error;
  }
);

export default axiosInstance;
