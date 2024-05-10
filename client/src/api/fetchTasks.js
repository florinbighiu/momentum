export async function fetchTasks(userId, organizationId = null) {
  const url = new URL("http://localhost:8080/api/todos", window.location.origin);
  url.searchParams.append("userId", userId);
  if (organizationId) {
    url.searchParams.append("organizationId", organizationId);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }

  const data = await response.json();

  const todayTasks = data.filter((todo) => {
    const dueDate = new Date(todo.dueDate).getDate();

    const today = new Date().getDate();

    return dueDate === today;
  });

  return todayTasks;
}
