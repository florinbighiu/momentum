import axiosClient from "./axiosClient";

export const createTodo = async (todoData) => {
  const response = await axiosClient.post("/api/todos/create", todoData);
  return response.data;
};

