package com.stella.backend.services;



import com.stella.backend.dto.WasteCollectionRequestDTO;
import com.stella.backend.dto.WasteCollectionResponseDTO;
import com.stella.backend.model.GarbageRequest;
import com.stella.backend.model.WasteCollection;
import com.stella.backend.repository.CompletedRequestRepository;
import com.stella.backend.repository.WasteCollectionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class WasteCollectionServiceTest {

    @InjectMocks
    private WasteCollectionService wasteCollectionService;

    @Mock
    private WasteCollectionRepository wasteCollectionRepository;

    @Mock
    private CompletedRequestRepository requestRepository;

    private WasteCollectionRequestDTO wasteCollectionRequestDTO;
    private GarbageRequest garbageRequest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        wasteCollectionRequestDTO = new WasteCollectionRequestDTO();
        wasteCollectionRequestDTO.setImageUrl("http://yasho.com/image.jpg");
        wasteCollectionRequestDTO.setRating(5);

        garbageRequest = new GarbageRequest();
        garbageRequest.setUserId(1L);
    }

    @Test
    void testSaveWasteCollectionSuccess() {
        Long requestId = 1L;

        // Mock the behavior of requestRepository
        when(requestRepository.findById(requestId)).thenReturn(Optional.of(garbageRequest));

        // Mock the behavior of wasteCollectionRepository
        WasteCollection savedWasteCollection = new WasteCollection();
        savedWasteCollection.setId(1L);
        savedWasteCollection.setUserId(garbageRequest.getUserId().toString());
        savedWasteCollection.setImageUrl(wasteCollectionRequestDTO.getImageUrl());
        savedWasteCollection.setCollectedDateTime(LocalDateTime.now());
        savedWasteCollection.setRoute("Nugegoda");
        savedWasteCollection.setRating(wasteCollectionRequestDTO.getRating());
        savedWasteCollection.setRequestId(requestId);

        when(wasteCollectionRepository.save(any(WasteCollection.class))).thenReturn(savedWasteCollection);

        WasteCollectionResponseDTO responseDTO = wasteCollectionService.saveWasteCollection(requestId, wasteCollectionRequestDTO, "Nugegoda");

        assertNotNull(responseDTO);
        assertEquals(1L, responseDTO.getId());
        assertEquals(garbageRequest.getUserId().toString(), responseDTO.getUserId());
        assertEquals(wasteCollectionRequestDTO.getImageUrl(), responseDTO.getImageUrl());
        assertEquals(wasteCollectionRequestDTO.getRating(), responseDTO.getRating());
    }

    @Test
    void testSaveWasteCollectionRequestNotFound() {
        Long requestId = 1L;

        // Mock the behavior of requestRepository to return an empty Optional
        when(requestRepository.findById(requestId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            wasteCollectionService.saveWasteCollection(requestId, wasteCollectionRequestDTO, "Nugegoda");
        });

        assertEquals("Request not found", exception.getMessage());
    }

    @Test
    void testGetWasteCollectionByRequestIdNotFound() {
        Long requestId = 1L;

        // Mock the behavior of wasteCollectionRepository to return an empty Optional
        when(wasteCollectionRepository.findByRequestId(requestId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            wasteCollectionService.getWasteCollectionByRequestId(requestId);
        });

        assertEquals("Waste Collection not found for the given requestId", exception.getMessage());
    }

    @Test
    void testGetWasteCollectionByRequestIdSuccess() {
        Long requestId = 1L;

        // Mock the behavior of wasteCollectionRepository
        WasteCollection wasteCollection = new WasteCollection();
        wasteCollection.setId(1L);
        wasteCollection.setUserId(garbageRequest.getUserId().toString());
        wasteCollection.setImageUrl("http://yasho.com/image.jpg");
        wasteCollection.setCollectedDateTime(LocalDateTime.now());
        wasteCollection.setRoute("Nugegoda");
        wasteCollection.setRating(5);
        wasteCollection.setRequestId(requestId);

        when(wasteCollectionRepository.findByRequestId(requestId)).thenReturn(Optional.of(wasteCollection));

        WasteCollectionResponseDTO responseDTO = wasteCollectionService.getWasteCollectionByRequestId(requestId);

        assertNotNull(responseDTO);
        assertEquals(1L, responseDTO.getId());
        assertEquals("http://yasho.com/image.jpg", responseDTO.getImageUrl());
        assertEquals(5, responseDTO.getRating());
    }
}