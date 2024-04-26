import axios from "axios";

export async function markAsImportant(todoId) {
    const url = `http://localhost:8080/api/todos/${todoId}`;
    const updates = { important: true };

    try {
        const response = await axios.patch(url, updates);
        console.log("Todo marked as important successfully:", response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Todo not found:", error);
        } else {
            console.error("Error marking todo as important:", error);
        }
    }
}