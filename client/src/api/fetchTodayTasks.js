import { fetchAllTasks } from "./fetchAllTasks";

export async function fetchTodayTasks(userId, organizationId = null) {
  try {
    const tasks = await fetchAllTasks(userId, organizationId);
    const todayTasks = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      return dueDate.getDate() === today.getDate() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getFullYear() === today.getFullYear();
    });
    return todayTasks.filter((task) => !task.completed);
  } catch (error) {
    console.error("Error fetching today's tasks:", error);
  }
}
