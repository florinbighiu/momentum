import axiosClient from "./axiosClient";

export async function markAsImportant(todoId) {
  const response = await axiosClient.patch(`/api/todos/${todoId}`, { important: true });
  return response.data;
}

