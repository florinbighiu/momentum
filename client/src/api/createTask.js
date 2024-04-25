import axios from "axios"; 

export const createTodo = async (todoData) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/todos/create`, todoData);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error; 
  }
};
