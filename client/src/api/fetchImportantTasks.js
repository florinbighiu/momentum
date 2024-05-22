import { fetchAllTasks } from "./fetchAllTasks";

export async function fetchImportantTasks(userId, organizationId = null) {
  try {
    const tasks = await fetchAllTasks(userId, organizationId);
    const importantTasks = tasks.filter((task) => task.important);
    return importantTasks.filter((task) => !task.completed);
  } catch (error) {
    console.error("Error fetching important tasks:", error);
  }
}
