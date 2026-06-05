import axiosClient from "./axiosClient";

export async function setCompleted(todoId) {
  const response = await axiosClient.patch(`/api/todos/${todoId}`, { completed: true });
  return response.data;
}

