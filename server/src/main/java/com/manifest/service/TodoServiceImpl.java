package com.manifest.service;

import com.manifest.model.Todo;
import com.manifest.repository.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
            return todoRepository.findAllByUserId(userId);
        } else {
            return todoRepository.findByUserIdAndOrganizationId(userId, organizationId);
        }
    }
}
