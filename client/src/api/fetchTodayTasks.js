import { fetchAllTasks } from "./fetchAllTasks";

export async function fetchTodayTasks(userId, organizationId = null) {
  const tasks = await fetchAllTasks(userId, organizationId);
  const today = new Date();
  return tasks.filter((task) => {
    if (task.completed) return false;
    const d = new Date(task.dueDate);
    return d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();
  });
}

