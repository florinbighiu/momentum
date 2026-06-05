import axiosClient from "./axiosClient";

export async function removeImportantState(todoId) {
  const response = await axiosClient.patch(`/api/todos/${todoId}`, { important: false });
  return response.data;
}

