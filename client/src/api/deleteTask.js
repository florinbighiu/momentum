import axiosClient from "./axiosClient";

export async function deleteTask(taskId) {
  await axiosClient.delete(`/api/todos/${taskId}`);
}

