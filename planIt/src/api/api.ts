import axios from "axios";

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

  addTodo: async (todo: { title: string; completed: boolean }) => {
    const response = await apiClient.post("/api/todos", todo);
    return response.data;
  },

  deleteTodo: async (id: number) => {
    await apiClient.delete(`/api/todos/${id}`);
  },
};
