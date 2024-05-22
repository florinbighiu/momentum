import { fetchAllTasks } from "./fetchAllTasks";

export async function fetchTasks(userId, organizationId = null) {
    try {
        const tasks = await fetchAllTasks(userId, organizationId);
        return tasks.filter((task) => !task.completed);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}