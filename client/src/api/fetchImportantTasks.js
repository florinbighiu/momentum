import { fetchAllTasks } from "./fetchAllTasks";

export async function fetchImportantTasks(userId, organizationId = null) {
  const tasks = await fetchAllTasks(userId, organizationId);
  return tasks.filter((task) => task.important && !task.completed);
}

