package com.stella.backend.services;

import com.stella.backend.dto.WasteCollectionRequestDTO;
import com.stella.backend.dto.WasteCollectionResponseDTO;
import com.stella.backend.model.Request;
import com.stella.backend.model.WasteCollection;
import com.stella.backend.repository.RequestRepository;  // Import the Request repository
import com.stella.backend.repository.WasteCollectionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j // Enables logging using @Slf4j
public class WasteCollectionService {
    private final WasteCollectionRepository wasteCollectionRepository;
    private final RequestRepository requestRepository;  // Inject Request repository

    // Save Waste Collection with a Request DTO
    public WasteCollectionResponseDTO saveWasteCollection(Long requestId, WasteCollectionRequestDTO wasteCollectionRequestDTO, String route) {
        try {
            // Retrieve the Request using requestId
            Request request = requestRepository.findById(requestId)
                    .orElseThrow(() -> new RuntimeException("Request not found"));

            // Create a WasteCollection entity from the DTO
            WasteCollection wasteCollection = WasteCollection.builder()
                    .userId(request.getUserId())  // Get userId from the retrieved Request
                    .imageUrl(wasteCollectionRequestDTO.getImageUrl())
                    .collectedDateTime(LocalDateTime.now())  // Set current time as collection time
                    .route(route)                             // Set route from query parameter
                    .rating(wasteCollectionRequestDTO.getRating())
                    .build();

            WasteCollection savedCollection = wasteCollectionRepository.save(wasteCollection);

            log.info("Successfully saved Waste Collection with ID: {}", savedCollection.getId());

            // Return a Response DTO
            return WasteCollectionResponseDTO.builder()
                    .id(savedCollection.getId())
                    .userId(savedCollection.getUserId())
                    .imageUrl(savedCollection.getImageUrl())
                    .collectedDateTime(savedCollection.getCollectedDateTime())
                    .route(savedCollection.getRoute())
                    .rating(savedCollection.getRating())
                    .build();
        } catch (Exception e) {
            log.error("Failed to save Waste Collection: {}", e.getMessage());
            throw e;
        }
    }
}
