import { fetchAllTasks } from "./fetchAllTasks";

export async function fetchCompletedTasks(userId, organizationId = null) {
  const tasks = await fetchAllTasks(userId, organizationId);
  return tasks.filter((task) => task.completed);
}

