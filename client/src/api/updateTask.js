import axiosClient from "./axiosClient";

export const updateTask = async (todoId, updates) => {
  const response = await axiosClient.patch(`/api/todos/${todoId}`, updates);
  return response.data;
};

