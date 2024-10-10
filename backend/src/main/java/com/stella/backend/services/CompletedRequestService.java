package com.stella.backend.services;

import com.stella.backend.dto.CompletedRequestDTO;
import com.stella.backend.dto.CompletedResponseDTO;
import com.stella.backend.model.GarbageRequest;
import com.stella.backend.repository.CompletedRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CompletedRequestService {
    private final CompletedRequestRepository garbageRequestRepository;

    // Get all pending requests
    public List<CompletedResponseDTO> getAllPendingRequests() {
        List<GarbageRequest> requests = garbageRequestRepository.findByCompletedFalse();
        if (requests.isEmpty()) {
            log.error("Request list is empty");
        }
        log.info("Requests: {}", requests);
        return requests.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Mark a request as completed
    public void markRequestAsCompleted(Long requestId) {
        GarbageRequest request = garbageRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setCompleted(true);
        garbageRequestRepository.save(request);
        log.info("Marked request as completed");
    }

    // Get a specific request by ID
    public CompletedRequestDTO getRequestById(Long requestId) {
        GarbageRequest request = garbageRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        return convertToRequestDTO(request);
    }

    // Get all completed requests for a particular user
    public List<CompletedResponseDTO> getCompletedRequestsByUserId(Long userId) {
        List<GarbageRequest> completedRequests = garbageRequestRepository.findByUserIdAndCompletedTrue(userId);
        if (completedRequests.isEmpty()) {
            log.warn("No completed requests found for user ID: {}", userId);
        }
        log.info("Completed requests for user {}: {}", userId, completedRequests);
        return completedRequests.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Convert GarbageRequest to CompletedRequestDTO
    private CompletedRequestDTO convertToRequestDTO(GarbageRequest request) {
        return CompletedRequestDTO.builder()
                .userId(request.getUserId())
                .area(request.getArea())
                .requestDate(request.getRequestDate())
                .address(request.getAddress())
                .totalWeight(request.getTotalWeight())
                .foodWaste(request.getFoodWaste())
                .eWaste(request.getEWaste())
                .recyclableWaste(request.getRecyclableWaste())
                .regularWaste(request.getRegularWaste())
                .build();
    }

    // Convert GarbageRequest to CompletedResponseDTO
    private CompletedResponseDTO convertToResponseDTO(GarbageRequest request) {
        return CompletedResponseDTO.builder()
                .id(request.getId())
                .area(request.getArea())
                .address(request.getAddress())
                .completed(request.getCompleted())
                .build();
    }
}
