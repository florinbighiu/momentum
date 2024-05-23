import axios from "axios";

export const updateTask = async (todoId, updates) => {
  const url = `http://localhost:8080/api/todos/${todoId}`;

  try {
    const response = await axios.patch(url, updates);
    console.log("Todo updated successfully:", response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("Todo not found:", error);
    } else {
      console.error("Error updating todo:", error);
    }
  }
}