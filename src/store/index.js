import AuthService from "@/api/services/authService";
// import TodoService from "@/api/services/todoService";
import axios from "axios";
import TodoService from "@/api/services/todoService";
import axiosInstance from "@/api/axiosInstance";
// паттерн singleton
// export class SingletonStore {
//   storeInstance = null;
//
//   constructor() {
//     if (this.storeInstance) {
//       return this.storeInstance;
//     }
//     this.storeInstance = new Index();
//   }
// }

export class Store {
  user = {};
  isAuth = false;

  constructor() {}

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  async login(email, password) {
    const response = await AuthService.login(email, password);
    localStorage.setItem("accessToken", response.data.accessToken);
    this.setAuth(true);
    this.setUser(response.data.user);
  }

  async registration(username, email, password) {
    try {
      const response = await AuthService.registration(
        username,
        email,
        password
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    const response = await AuthService.refresh();
    localStorage.setItem("accessToken", response.data.accessToken);
    this.setAuth(true);
    this.setUser(response.data.user);
  }

  async getTodos() {
    return await TodoService.getTodo();
  }

  async newTodo(title, isDone) {
    return await TodoService.newTodo(title, isDone);
  }

  async updateTodo(title, isDone, id) {
    return await TodoService.updateTodo(title, isDone, id);
  }

  async deleteTodo(id) {
    return await TodoService.deleteTodo(id);
  }
}
