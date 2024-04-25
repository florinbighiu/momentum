package com.manifest.controller;

import com.manifest.model.Todo;
import com.manifest.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private final TodoService todoService;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<Todo>> getTodos(@RequestParam String userId,
            @RequestParam(required = false) String organizationId) {
        try {
            List<Todo> todos = todoService.getTodos(userId, organizationId);
            return ResponseEntity.ok(todos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoById(@PathVariable Long id) {
        try {
            todoService.deleteTodo(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/create")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        try {
            Todo createdTodo = todoService.createTodo(todo);
            return ResponseEntity.ok(createdTodo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Todo> patchTodo(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        try {
            Todo updatedTodo = todoService.patchTodo(id, updates);
            return ResponseEntity.ok(updatedTodo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}

// Why do i get this error?
// GET http://localhost:8080/api/todos/upcoming 403 (Forbidden)
// Access to XMLHttpRequest at
// 'http://localhost:8080/api/todos/upcoming?userId=1' from origin
// 'http://localhost:5173' has been blocked by CORS policy: No
// 'Access-Control-Allow-Origin' header is present on the requested resource.
// I have added the @CrossOrigin annotation to the controller and the method,
// but it still doesn't work. What am I missing?
