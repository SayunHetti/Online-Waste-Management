package com.stella.backend.services;

import com.stella.backend.model.Request;
import com.stella.backend.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RequestService {
    private final RequestRepository requestRepository;

    // Get all pending requests
    public List<Request> getAllPendingRequests() {
        List<Request> requests = requestRepository.findByCompletedFalse();
        if (requests.isEmpty()) {
            log.error("Request list is empty");
        }
        log.info("Requests: {}", requests);
        return requests;
    }

    // Mark a request as completed
    public void markRequestAsCompleted(Long requestId) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setCompleted(true);
        requestRepository.save(request);
        log.info("Marked request as completed");
    }

    // Get a specific request by ID
    public Request getRequestById(Long requestId) {
        return requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    // Get all completed requests for a particular user
    public List<Request> getCompletedRequestsByUserId(String userId) {
        List<Request> completedRequests = requestRepository.findByUserIdAndCompletedTrue(userId);
        if (completedRequests.isEmpty()) {
            log.warn("No completed requests found for user ID: {}", userId);
        }
        log.info("Completed requests for user {}: {}", userId, completedRequests);
        return completedRequests;
    }
}
