import { fetchAllTasks } from "./fetchAllTasks";

export async function fetchCompletedTasks(userId, organizationId = null) {
  try {
    const tasks = await fetchAllTasks(userId, organizationId);
    const completedTasks = tasks.filter((task) => task.completed);
    return completedTasks;
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
  }
}
