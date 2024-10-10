package com.stella.backend.repository;

import com.stella.backend.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByCompletedFalse(); // Find all pending requests

    List<Request> findByUserIdAndCompletedTrue(String userId); // Find all completed requests for a specific user

    Request findByIdAndUserId(Long id, String userId); // Find a specific request by ID and user ID (optional)
}
