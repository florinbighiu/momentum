package com.manifest.service;

import com.manifest.model.Todo;

import java.util.List;

public interface TodoService {
    List<Todo> getTodos(String userId, String organizationId);

    Todo createTodo(Todo todo);



}
