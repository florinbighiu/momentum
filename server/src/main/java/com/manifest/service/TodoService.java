package com.manifest.service;

import com.manifest.model.Todo;

import java.util.List;
import java.util.Map;

public interface TodoService {
    List<Todo> getTodos(String userId, String organizationId);
    Todo createTodo(Todo todo);
    Todo patchTodo(Long id, Map<String, Object> updates);
    void deleteTodo(Long id);

}
