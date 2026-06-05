import axiosClient from "./axiosClient";

export async function fetchAllTasks(userId, organizationId = null) {
  const params = { userId };
  if (organizationId) params.organizationId = organizationId;
  const response = await axiosClient.get("/api/todos", { params });
  return response.data;
}

