package com.manifest.repository;

import com.manifest.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, String> {
    List<Todo> findAllByUserId(String userId);

    List<Todo> findByUserIdAndOrganizationId(String userId, String organizationId);
}
