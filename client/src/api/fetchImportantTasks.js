export async function fetchImportantTasks(userId, organizationId = null) {
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

  const importantTodos = data.filter((todo) => todo.important);

  return importantTodos;
}
