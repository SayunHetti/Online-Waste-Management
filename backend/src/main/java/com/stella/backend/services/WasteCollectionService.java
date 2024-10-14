package com.stella.backend.services;

import com.stella.backend.dto.WasteCollectionRequestDTO;
import com.stella.backend.dto.WasteCollectionResponseDTO;
import com.stella.backend.model.GarbageRequest;
import com.stella.backend.model.WasteCollection;
import com.stella.backend.repository.CompletedRequestRepository;  // Import the Request repository
import com.stella.backend.repository.WasteCollectionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j // Enables logging using @Slf4j
public class WasteCollectionService {
    private final WasteCollectionRepository wasteCollectionRepository;
    private final CompletedRequestRepository requestRepository;  // Inject Request repository

    // Save Waste Collection with a Request DTO
    public WasteCollectionResponseDTO saveWasteCollection(Long requestId, WasteCollectionRequestDTO wasteCollectionRequestDTO, String route) {
        try {
            // Retrieve the Request using requestId
            GarbageRequest request = requestRepository.findById(requestId)
                    .orElseThrow(() -> new RuntimeException("Request not found"));

            // Create a WasteCollection entity from the DTO
            WasteCollection wasteCollection = WasteCollection.builder()
                    .userId(request.getUserId().toString())  // Get userId from the retrieved Request
                    .imageUrl(wasteCollectionRequestDTO.getImageUrl())
                    .collectedDateTime(LocalDateTime.now())  // Set current time as collection time
                    .route(route)                             // Set route from query parameter
                    .rating(wasteCollectionRequestDTO.getRating())
                    .requestId(requestId)                     // Save the requestId
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
                    .requestId(savedCollection.getRequestId()) // Include requestId in response
                    .build();
        } catch (Exception e) {
            log.error("Failed to save Waste Collection: {}", e.getMessage());
            throw e;
        }
    }
    @Transactional
    public WasteCollectionResponseDTO getWasteCollectionByRequestId(Long requestId) {
        WasteCollection wasteCollection = wasteCollectionRepository.findByRequestId(requestId)
                .orElseThrow(() -> new RuntimeException("Waste Collection not found for the given requestId"));

        return WasteCollectionResponseDTO.builder()
                .id(wasteCollection.getId())
                .userId(wasteCollection.getUserId())
                .imageUrl(wasteCollection.getImageUrl())
                .collectedDateTime(wasteCollection.getCollectedDateTime())
                .route(wasteCollection.getRoute())
                .rating(wasteCollection.getRating())
                .requestId(wasteCollection.getRequestId()) // Include requestId in response
                .build();
    }

}
