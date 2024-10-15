package com.stella.backend.services;

import com.stella.backend.dto.CompletedRequestDTO;
import com.stella.backend.dto.CompletedResponseDTO;
import com.stella.backend.model.GarbageRequest;
import com.stella.backend.repository.CompletedRequestRepository;
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

class CompletedRequestServiceTest {

    @InjectMocks
    private CompletedRequestService completedRequestService;

    @Mock
    private CompletedRequestRepository completedRequestRepository;

    private GarbageRequest garbageRequest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        garbageRequest = new GarbageRequest();
        garbageRequest.setId(1L);
        garbageRequest.setUserId(1L);
        garbageRequest.setArea("Kadawatha");
        garbageRequest.setRequestDate(LocalDate.now());
        garbageRequest.setAddress("mahara");
        garbageRequest.setTotalWeight(10.0);
        garbageRequest.setFoodWaste(2.0);
        garbageRequest.setEWaste(1.0);
        garbageRequest.setRecyclableWaste(3.0);
        garbageRequest.setRegularWaste(4.0);
        garbageRequest.setCompleted(false);
    }

    @Test
    void testGetAllPendingRequests_success() {
        when(completedRequestRepository.findByCompletedFalse()).thenReturn(Collections.singletonList(garbageRequest));

        List<CompletedResponseDTO> requests = completedRequestService.getAllPendingRequests();

        assertNotNull(requests);
        assertEquals(1, requests.size());
        assertEquals("Kadawatha", requests.get(0).getArea());
    }

    @Test
    void testGetAllPendingRequests_empty() {
        when(completedRequestRepository.findByCompletedFalse()).thenReturn(Collections.emptyList());

        List<CompletedResponseDTO> requests = completedRequestService.getAllPendingRequests();

        assertNotNull(requests);
        assertTrue(requests.isEmpty());
    }

    @Test
    void testMarkRequestAsCompleted_success() {
        when(completedRequestRepository.findById(1L)).thenReturn(Optional.of(garbageRequest));

        completedRequestService.markRequestAsCompleted(1L);

        assertTrue(garbageRequest.getCompleted());
        verify(completedRequestRepository, times(1)).save(garbageRequest);
    }

    @Test
    void testMarkRequestAsCompleted_notFound() {
        when(completedRequestRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            completedRequestService.markRequestAsCompleted(1L);
        });

        assertEquals("Request not found", exception.getMessage());
    }

    @Test
    void testGetRequestById_success() {
        when(completedRequestRepository.findById(1L)).thenReturn(Optional.of(garbageRequest));

        CompletedRequestDTO requestDTO = completedRequestService.getRequestById(1L);

        assertNotNull(requestDTO);
        assertEquals("Kadawatha", requestDTO.getArea());
    }

    @Test
    void testGetRequestById_notFound() {
        when(completedRequestRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            completedRequestService.getRequestById(1L);
        });

        assertEquals("Request not found", exception.getMessage());
    }

    @Test
    void testGetCompletedRequestsByUserId_success() {
        when(completedRequestRepository.findByUserIdAndCompletedTrue(1L)).thenReturn(Collections.singletonList(garbageRequest));

        List<CompletedResponseDTO> requests = completedRequestService.getCompletedRequestsByUserId(1L);

        assertNotNull(requests);
        assertEquals(1, requests.size());
        assertEquals("Kadawatha", requests.get(0).getArea());
    }

    @Test
    void testGetCompletedRequestsByUserId_empty() {
        when(completedRequestRepository.findByUserIdAndCompletedTrue(1L)).thenReturn(Collections.emptyList());

        List<CompletedResponseDTO> requests = completedRequestService.getCompletedRequestsByUserId(1L);

        assertNotNull(requests);
        assertTrue(requests.isEmpty());
    }
}
