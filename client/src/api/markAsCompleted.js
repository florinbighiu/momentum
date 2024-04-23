import axios from 'axios';

export async function handleMarkComplete(todoId) {
  const url = `http://localhost:8080/api/todos/${todoId}`; 
  const updates = { completed: true }; 

  try {
    const response = await axios.patch(url, updates);
    console.log("Todo marked complete successfully:", response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("Todo not found:", error);
    } else {
      console.error("Error marking todo complete:", error);
    }
  }
}