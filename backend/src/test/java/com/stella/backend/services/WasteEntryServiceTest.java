package com.stella.backend.services;

import com.stella.backend.dto.WasteDeleteResponse;
import com.stella.backend.dto.WasteEntryRequest;
import com.stella.backend.dto.WasteEntryResponse;
import com.stella.backend.dto.WasteUpdateResponse;
import com.stella.backend.model.WasteEntry;
import com.stella.backend.repository.WasteEntryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class WasteEntryServiceTest {

    @InjectMocks
    private WasteEntryService wasteEntryService;

    @Mock
    private WasteEntryRepository wasteEntryRepository;

    private WasteEntryRequest wasteEntryRequest;
    private WasteEntry wasteEntry;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        wasteEntryRequest = new WasteEntryRequest();
        wasteEntryRequest.setUserId(1L);
        wasteEntryRequest.setTotalWeight(10.0);
        wasteEntryRequest.setFoodWaste(2.0);
        wasteEntryRequest.seteWaste(1.0);
        wasteEntryRequest.setRecyclableWaste(3.0);
        wasteEntryRequest.setRegularWaste(4.0);

        wasteEntry = new WasteEntry();
        wasteEntry.setUserId(1L);
        wasteEntry.setTotalWeight(10.0);
        wasteEntry.setFoodWaste(2.0);
        wasteEntry.setEWaste(1.0);
        wasteEntry.setRecyclableWaste(3.0);
        wasteEntry.setRegularWaste(4.0);
    }

    @Test
    void testSaveWasteEntry_success() {
        when(wasteEntryRepository.save(any(WasteEntry.class))).thenReturn(wasteEntry);

        WasteEntryResponse response = wasteEntryService.saveWasteEntry(wasteEntryRequest);

        assertNotNull(response);
        assertEquals("Waste entry created successfully.", response.getMessage());
        assertEquals(10.0, response.getTotalWeight());
        assertEquals(1L, response.getUserId());
    }

    @Test
    void testGetAllWasteEntriesByUserId_success() {
        when(wasteEntryRepository.findByUserId(1L)).thenReturn(Optional.of(wasteEntry));

        Optional<WasteEntry> retrievedEntry = wasteEntryService.getAllWasteEntriesByUserId(1L);

        assertTrue(retrievedEntry.isPresent());
        assertEquals(1L, retrievedEntry.get().getUserId());
        assertEquals(10.0, retrievedEntry.get().getTotalWeight());
    }

    @Test
    void testGetAllWasteEntriesByUserId_notFound() {
        when(wasteEntryRepository.findByUserId(1L)).thenReturn(Optional.empty());

        Optional<WasteEntry> retrievedEntry = wasteEntryService.getAllWasteEntriesByUserId(1L);

        assertFalse(retrievedEntry.isPresent());
    }

    @Test
    void testUpdateWasteEntryByUserId_success() {
        when(wasteEntryRepository.findByUserId(1L)).thenReturn(Optional.of(wasteEntry));
        when(wasteEntryRepository.save(any(WasteEntry.class))).thenReturn(wasteEntry);

        WasteUpdateResponse response = wasteEntryService.updateWasteEntryByUserId(1L, wasteEntryRequest);

        assertNotNull(response);
        assertEquals("Waste entry updated successfully.", response.getMessage());
        assertEquals(10.0, response.getTotalWeight());
    }

    @Test
    void testUpdateWasteEntryByUserId_notFound() {
        when(wasteEntryRepository.findByUserId(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            wasteEntryService.updateWasteEntryByUserId(1L, wasteEntryRequest);
        });

        assertEquals("WasteEntry not found for this userId: 1", exception.getMessage());
    }

    @Test
    void testDeleteWasteEntryByUserId_success() {
        when(wasteEntryRepository.findByUserId(1L)).thenReturn(Optional.of(wasteEntry));

        WasteDeleteResponse response = wasteEntryService.deleteWasteEntryByUserId(1L);

        assertNotNull(response);
        assertEquals("Waste entry deleted successfully.", response.getMessage());
        verify(wasteEntryRepository, times(1)).delete(wasteEntry);
    }

    @Test
    void testDeleteWasteEntryByUserId_notFound() {
        when(wasteEntryRepository.findByUserId(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            wasteEntryService.deleteWasteEntryByUserId(1L);
        });

        assertEquals("WasteEntry not found for this userId: 1", exception.getMessage());
    }
}
