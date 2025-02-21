import axios from "axios";
import { Todo } from "../types/todo";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Vite 환경 변수 사용
  headers: {
    "Content-Type": "application/json",
  },
});

export const todosApi = {
  // 데이터 todos 가져오기
  getTodos: async () => {
    const response = await apiClient.get("/api/todos");
    return response.data;
  },

  addTodo: async (todo: Todo) => {
    const response = await apiClient.post("/api/todos", todo);
    return response.data;
  },

  deleteTodo: async (id: string) => {
    await apiClient.delete(`/api/todos/${id}`);
  },
};
