package com.manifest.service;

import com.manifest.model.Todo;
import com.manifest.repository.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Override
    public Todo createTodo(Todo todo) {
        if (todo.getUserId() == null) {
            throw new IllegalArgumentException("userId cannot be null");
        }
        todo.setCreatedAt(LocalDateTime.now());
        return todoRepository.save(todo);
    }

    @Override
    public List<Todo> getTodos(String userId, String organizationId) {
        if (userId == null) {
            throw new IllegalArgumentException("userId cannot be null");
        }

        if (organizationId == null) {
            return todoRepository.findAllByUserIdAndOrganizationIdIsNull(userId);
        } else {
            return todoRepository.findByOrganizationId(organizationId);
        }
    }


    @Override
    public void deleteTodo(Long id) {
        Optional<Todo> existingTodo = todoRepository.findById(id);
        if (existingTodo.isEmpty()) {
            throw new IllegalArgumentException("Todo with ID " + id + " not found");
        }

        Todo todo = existingTodo.get();
        todoRepository.delete(todo);
    }

    @Override
    public Todo patchTodo(Long id, Map<String, Object> updates) {
        Optional<Todo> existingTodo = todoRepository.findById(id);
        if (existingTodo.isEmpty()) {
            throw new IllegalArgumentException("Todo with ID " + id + " not found");
        }

        Todo todo = existingTodo.get();
        updateTodoFields(todo, updates);

        todoRepository.save(todo);
        return todo;
    }

    private void updateTodoFields(Todo todo, Map<String, Object> updates) {
        for (String key : updates.keySet()) {
            switch (key) {
                case "name":
                    todo.setName((String) updates.get(key));
                    break;
                case "completed":
                    todo.setCompleted((Boolean) updates.get(key));
                    break;
                case "important":
                    todo.setImportant((Boolean) updates.get(key));
                    break;
                case "description":
                    todo.setDescription((String) updates.get(key));
                    break;
            }
        }
    }
}
