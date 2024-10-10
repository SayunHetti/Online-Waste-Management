package com.stella.backend.controllers;

import com.stella.backend.model.Request;
import com.stella.backend.services.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/requests")
public class RequestController {
    private final RequestService requestService;

    // Get all pending requests
    @GetMapping("/pending")
    public List<Request> getAllPendingRequests() {
        return requestService.getAllPendingRequests();
    }

    // Mark a request as completed
    @PutMapping("/complete/{id}")
    public void completeRequest(@PathVariable Long id) {
        requestService.markRequestAsCompleted(id);
    }

    // Get a specific request by ID
    @GetMapping("/{id}")
    public Request getRequestById(@PathVariable Long id) {
        return requestService.getRequestById(id);
    }

    // Get completed requests by user ID
    @GetMapping("/completed")
    public List<Request> getCompletedRequestsByUserId(@RequestParam String userId) {
        return requestService.getCompletedRequestsByUserId(userId);
    }
}
