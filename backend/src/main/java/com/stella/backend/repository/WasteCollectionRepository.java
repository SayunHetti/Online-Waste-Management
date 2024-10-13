package com.stella.backend.repository;

import com.stella.backend.model.WasteCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface WasteCollectionRepository extends JpaRepository<WasteCollection, Long> {
    Optional<WasteCollection> findByRequestId(Long requestId); // Method to find by requestId
}

