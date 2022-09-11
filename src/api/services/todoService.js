import axiosInstance from "@/api/axiosInstance";

export default class TodoService {
  static async getTodo() {
    return axiosInstance.get("todos");
  }

  static async newTodo(title, isDone) {
    return axiosInstance.post("todos", { title, isDone });
  }

  static async updateTodo(title, isDone, id) {
    return axiosInstance.put(`todos/${id}`, { title, isDone });
  }

  static async deleteTodo(id) {
    return axiosInstance.delete(`todos/${id}`);
  }
}
