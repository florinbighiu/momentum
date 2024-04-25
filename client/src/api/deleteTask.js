export async function deleteTask(taskId) {
    const url = new URL(`http://localhost:8080/api/todos/${taskId}`, window.location.origin);

    const response = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
    }
}