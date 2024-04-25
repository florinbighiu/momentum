package com.manifest.repository;

import com.manifest.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByUserId(String userId);

    List<Todo> findByOrganizationId(String organizationId);

    List<Todo> findAllByUserIdAndOrganizationIdIsNull(String userId);

    List<Todo> findByUserIdAndOrganizationId(String userId, String organizationId);

}
