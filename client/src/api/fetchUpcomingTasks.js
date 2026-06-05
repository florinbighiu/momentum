import { fetchAllTasks } from "./fetchAllTasks";

export async function fetchUpcomingTasks(userId, organizationId = null) {
  const tasks = await fetchAllTasks(userId, organizationId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return tasks.filter((task) => !task.completed && new Date(task.dueDate) > today);
}

