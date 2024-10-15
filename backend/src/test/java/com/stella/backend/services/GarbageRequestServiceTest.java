package com.stella.backend.services;

import com.stella.backend.dto.GarbageRequestDTO;
import com.stella.backend.dto.WasteStatsDTO;
import com.stella.backend.model.GarbageRequest;
import com.stella.backend.model.WasteEntry;
import com.stella.backend.repository.GarbageRequestRepository;
import com.stella.backend.repository.WasteEntryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class GarbageRequestServiceTest {

    @InjectMocks
    private GarbageRequestService garbageRequestService;

    @Mock
    private GarbageRequestRepository garbageRequestRepository;

    @Mock
    private WasteEntryRepository wasteEntryRepository;

    private GarbageRequestDTO garbageRequestDTO;
    private WasteEntry wasteEntry;
    private GarbageRequest garbageRequest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        garbageRequestDTO = new GarbageRequestDTO();
        garbageRequestDTO.setArea("Kadawatha");
        garbageRequestDTO.setRequestDate(LocalDate.now());
        garbageRequestDTO.setAddress("123 Main St");
        garbageRequestDTO.setComments("Please pick up by noon");

        wasteEntry = new WasteEntry();
        wasteEntry.setUserId(1L);
        wasteEntry.setTotalWeight(10.0);
        wasteEntry.setFoodWaste(2.0);
        wasteEntry.setEWaste(1.0);
        wasteEntry.setRecyclableWaste(3.0);
        wasteEntry.setRegularWaste(4.0);

        garbageRequest = new GarbageRequest();
        garbageRequest.setUserId(1L);
        garbageRequest.setArea("Kadawatha");
        garbageRequest.setRequestDate(LocalDate.now());
        garbageRequest.setAddress("123 Main St");
        garbageRequest.setComments("Please pick up by noon");
    }

    @Test
    void testCreateGarbageRequest_success() {
        when(wasteEntryRepository.findByUserId(1L)).thenReturn(Optional.of(wasteEntry));
        when(garbageRequestRepository.save(any(GarbageRequest.class))).thenReturn(garbageRequest);

        GarbageRequest result = garbageRequestService.createGarbageRequest(1L, garbageRequestDTO);

        assertNotNull(result);
        assertEquals("Kadawatha", result.getArea());
        assertEquals("123 Main St", result.getAddress());
        verify(garbageRequestRepository, times(1)).save(any(GarbageRequest.class));
    }

    @Test
    void testCreateGarbageRequest_wasteDataNotFound() {
        when(wasteEntryRepository.findByUserId(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            garbageRequestService.createGarbageRequest(1L, garbageRequestDTO);
        });

        assertEquals("Waste data not found for userId: 1", exception.getMessage());
    }

    @Test
    void testGetRequestsByUserId_success() {
        when(garbageRequestRepository.findAllByUserId(1L)).thenReturn(Collections.singletonList(garbageRequest));

        List<GarbageRequest> requests = garbageRequestService.getRequestsByUserId(1L);

        assertNotNull(requests);
        assertEquals(1, requests.size());
        assertEquals("Kadawatha", requests.get(0).getArea());
    }

    @Test
    void testDeleteRequest_success() {
        when(garbageRequestRepository.findById(1L)).thenReturn(Optional.of(garbageRequest));

        garbageRequestService.deleteRequest(1L, 1L);

        verify(garbageRequestRepository, times(1)).delete(garbageRequest);
    }

    @Test
    void testDeleteRequest_notFound() {
        when(garbageRequestRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            garbageRequestService.deleteRequest(1L, 1L);
        });

        assertEquals("Request not found", exception.getMessage());
    }

    @Test
    void testDeleteRequest_notOwner() {
        when(garbageRequestRepository.findById(1L)).thenReturn(Optional.of(garbageRequest));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            garbageRequestService.deleteRequest(1L, 2L);
        });

        assertEquals("You can only delete your own requests", exception.getMessage());
    }

    @Test
    void testUpdateRequest_success() {
        when(garbageRequestRepository.findById(1L)).thenReturn(Optional.of(garbageRequest));
        when(garbageRequestRepository.save(any(GarbageRequest.class))).thenReturn(garbageRequest); // Mock save method

        GarbageRequest updatedRequest = garbageRequestService.updateRequest(1L, 1L, garbageRequestDTO);

        assertNotNull(updatedRequest);
        assertEquals("Kadawatha", updatedRequest.getArea());
        verify(garbageRequestRepository, times(1)).save(garbageRequest);
    }


    @Test
    void testUpdateRequest_notFound() {
        when(garbageRequestRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            garbageRequestService.updateRequest(1L, 1L, garbageRequestDTO);
        });

        assertEquals("Request not found", exception.getMessage());
    }

    @Test
    void testUpdateRequest_notOwner() {
        when(garbageRequestRepository.findById(1L)).thenReturn(Optional.of(garbageRequest));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            garbageRequestService.updateRequest(1L, 2L, garbageRequestDTO);
        });

        assertEquals("You can only update your own requests", exception.getMessage());
    }

    @Test
    void testGetAreaWiseWasteStatistics() {
        when(garbageRequestRepository.getAreaWiseWasteStats()).thenReturn(Collections.emptyList());

        List<WasteStatsDTO> stats = garbageRequestService.getAreaWiseWasteStatistics();

        assertNotNull(stats);
        assertTrue(stats.isEmpty());
    }
}
