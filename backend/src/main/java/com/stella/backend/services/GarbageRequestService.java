package com.stella.backend.services;

import com.stella.backend.dto.GarbageRequestDTO;
import com.stella.backend.model.GarbageRequest;
import com.stella.backend.model.WasteEntry;
import com.stella.backend.repository.GarbageRequestRepository;
import com.stella.backend.repository.WasteEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GarbageRequestService {

    @Autowired
    private GarbageRequestRepository garbageRequestRepository;

    @Autowired
    private WasteEntryRepository wasteEntryRepository;

    public GarbageRequest createGarbageRequest(Long userId, GarbageRequestDTO requestDTO) {
        Optional<WasteEntry> wasteEntry = wasteEntryRepository.findByUserId(userId);

        if (wasteEntry.isPresent()) {
            GarbageRequest garbageRequest = new GarbageRequest();
            garbageRequest.setUserId(userId);
            garbageRequest.setTotalWeight(wasteEntry.get().getTotalWeight());
            garbageRequest.setFoodWaste(wasteEntry.get().getFoodWaste());
            garbageRequest.setEWaste(wasteEntry.get().getEWaste());
            garbageRequest.setRecyclableWaste(wasteEntry.get().getRecyclableWaste());
            garbageRequest.setRegularWaste(wasteEntry.get().getRegularWaste());

            // Set the fields from user input
            garbageRequest.setArea(requestDTO.getArea());
            garbageRequest.setRequestDate(requestDTO.getRequestDate());
            garbageRequest.setAddress(requestDTO.getAddress());
            garbageRequest.setComments(requestDTO.getComments());

            return garbageRequestRepository.save(garbageRequest);
        } else {
            throw new RuntimeException("Waste data not found for userId: " + userId);
        }
    }

    public List<GarbageRequest> getRequestsByUserId(Long userId) {
        return garbageRequestRepository.findAllByUserId(userId);
    }

    public void deleteRequest(Long requestId, Long userId) {
        GarbageRequest request = garbageRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (request.getUserId().equals(userId)) {
            garbageRequestRepository.delete(request);
        } else {
            throw new RuntimeException("You can only delete your own requests");
        }
    }

    public GarbageRequest updateRequest(Long requestId, Long userId, GarbageRequestDTO requestDTO) {
        GarbageRequest request = garbageRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (request.getUserId().equals(userId)) {
            request.setArea(requestDTO.getArea());
            request.setRequestDate(requestDTO.getRequestDate());
            request.setAddress(requestDTO.getAddress());
            request.setComments(requestDTO.getComments());
            return garbageRequestRepository.save(request);
        } else {
            throw new RuntimeException("You can only update your own requests");
        }
    }
}
