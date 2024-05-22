import { fetchAllTasks } from "./fetchAllTasks";

export async function fetchUpcomingTasks(userId, organizationId = null) {
  try {
    const tasks = await fetchAllTasks(userId, organizationId);
    const upcomingTasks = tasks.filter((task) => new Date(task.dueDate) > new Date());
    return upcomingTasks.filter((task) => !task.completed);
  } catch (error) {
    console.error("Error fetching upcoming tasks:", error);
  }
}
