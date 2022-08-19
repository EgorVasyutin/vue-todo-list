import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: " http://localhost:1000/api/",
  timeout: 1000,
});
