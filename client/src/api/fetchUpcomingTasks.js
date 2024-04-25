export async function fetchUpcomingTasks(userId, organizationId = null) {
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

  const today = new Date();
  const upcomingTodos = data.filter((todo) => new Date(todo.dueDate) > today);

  return upcomingTodos;
}
