import axios from "axios";
import { Todo } from "../types/todo";
import { Topic } from "../types/modal";

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

  // state값이 pre인 데이터 todos 가져오기
  getPreTodos: async () => {
    const response = await apiClient.get("/api/todos/pre");
    return response.data;
  },

  // 데이터 todo 추가
  addTodo: async (todo: Todo) => {
    const response = await apiClient.post("/api/todos", todo);
    return response.data;
  },

  // 데이터 todo 삭제
  deleteTodo: async (id: string) => {
    await apiClient.delete(`/api/todos/${id}`);
  },

  // 데이터 todo 수정
  updateTodo: async (id: string, todo: Partial<Todo>) => {
    await apiClient.put(`/api/todos/${id}`, todo);
  },
};

// topic 관련 api
export const topicApi = {
  // topic 가져오기
  getTopic: async () => {
    const response = await apiClient.get("/api/topic");
    return response.data;
  },

  // topic 추가
  addTopic: async (topic: Topic) => {
    const response = await apiClient.post("/api/topic", topic);
    return response.data;
  },

  // topic 삭제
  removeTopic: async (id: string) => {
    await apiClient.delete(`/api/topic/${id}`);
  },
};
