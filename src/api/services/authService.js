import axiosInstance from "@/api/axiosInstance";
import axios from "axios";

export default class AuthService {
  static async login(email, password) {
    return axiosInstance.post("sign-in", { email, password });
  }

  static async registration(username, email, password) {
    return axiosInstance.post("sign-up", { username, email, password });
  }

  static async logout() {
    return axiosInstance.post("logout");
  }

  static async refresh() {
    return axiosInstance.get("refresh");
  }
}
