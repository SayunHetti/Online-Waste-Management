package com.stella.backend.controllers;

import com.stella.backend.dto.GarbageRequestDTO;
import com.stella.backend.model.GarbageRequest;
import com.stella.backend.services.GarbageRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/garbage-requests")
public class GarbageRequestController {

    @Autowired
    private GarbageRequestService garbageRequestService;

    @PostMapping("/{userId}")
    public GarbageRequest createGarbageRequest(@PathVariable Long userId, @RequestBody GarbageRequestDTO requestDTO) {
        return garbageRequestService.createGarbageRequest(userId, requestDTO);
    }

    @GetMapping("get/{userId}")
    public List<GarbageRequest> getRequestsByUserId(@PathVariable Long userId) {
        return garbageRequestService.getRequestsByUserId(userId);
    }

    @PutMapping("/{requestId}/{userId}")
    public GarbageRequest updateRequest(@PathVariable Long requestId, @PathVariable Long userId, @RequestBody GarbageRequestDTO requestDTO) {
        return garbageRequestService.updateRequest(requestId, userId, requestDTO);
    }

    @DeleteMapping("/{requestId}/{userId}")
    public void deleteRequest(@PathVariable Long requestId, @PathVariable Long userId) {
        garbageRequestService.deleteRequest(requestId, userId);
    }
}
