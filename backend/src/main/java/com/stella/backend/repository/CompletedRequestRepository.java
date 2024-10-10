package com.stella.backend.repository;

import com.stella.backend.model.GarbageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CompletedRequestRepository extends JpaRepository<GarbageRequest, Long> {
    List<GarbageRequest> findByCompletedFalse();

    List<GarbageRequest> findByUserIdAndCompletedTrue(Long userId);

    GarbageRequest findByIdAndUserId(Long id, Long userId);
}
