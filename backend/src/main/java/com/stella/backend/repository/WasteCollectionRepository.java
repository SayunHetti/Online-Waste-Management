package com.stella.backend.repository;

import com.stella.backend.dto.RouteRatingDTO;
import com.stella.backend.model.WasteCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WasteCollectionRepository extends JpaRepository<WasteCollection, Long> {
    Optional<WasteCollection> findByRequestId(Long requestId);// Method to find by requestId

    @Query("SELECT new com.stella.backend.dto.RouteRatingDTO(wc.route, wc.rating) FROM WasteCollection wc ORDER BY wc.rating DESC")
    List<RouteRatingDTO> findAllOrderByRatingDesc();
}

