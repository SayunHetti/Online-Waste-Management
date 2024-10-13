package com.stella.backend.repository;

import com.stella.backend.model.GarbageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository // Marks this interface as a Spring Data repository
public interface GarbageRequestRepository extends JpaRepository<GarbageRequest, Long> {

    // Custom query to find all GarbageRequest records by userId
    List<GarbageRequest> findAllByUserId(Long userId);
}