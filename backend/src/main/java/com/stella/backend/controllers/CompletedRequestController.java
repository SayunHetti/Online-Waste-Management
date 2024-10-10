package com.stella.backend.controllers;

import com.stella.backend.dto.CompletedRequestDTO;
import com.stella.backend.dto.CompletedResponseDTO;
import com.stella.backend.services.CompletedRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/garbage-requests")
public class CompletedRequestController {
    private final CompletedRequestService garbageRequestService;

    // Get all pending requests
    @GetMapping("/pending")
    public List<CompletedResponseDTO> getAllPendingRequests() {
        return garbageRequestService.getAllPendingRequests();
    }

    // Mark a request as completed
    @PutMapping("/complete/{id}")
    public void completeRequest(@PathVariable Long id) {
        garbageRequestService.markRequestAsCompleted(id);
    }

    // Get a specific request by ID
    @GetMapping("/{id}")
    public CompletedRequestDTO getRequestById(@PathVariable Long id) {
        return garbageRequestService.getRequestById(id);
    }

    // Get completed requests by user ID
    @GetMapping("/completed")
    public List<CompletedResponseDTO> getCompletedRequestsByUserId(@RequestParam Long userId) {
        return garbageRequestService.getCompletedRequestsByUserId(userId);
    }
}
