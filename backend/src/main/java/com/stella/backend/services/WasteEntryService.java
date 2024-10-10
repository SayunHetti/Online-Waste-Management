package com.stella.backend.services;

import com.stella.backend.dto.WasteDeleteResponse;
import com.stella.backend.dto.WasteEntryRequest;
import com.stella.backend.dto.WasteEntryResponse;
import com.stella.backend.dto.WasteUpdateResponse;
import com.stella.backend.model.WasteEntry;
import com.stella.backend.repository.WasteEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WasteEntryService {

    @Autowired
    private WasteEntryRepository wasteEntryRepository;

    public WasteEntryResponse saveWasteEntry(WasteEntryRequest wasteEntryDTO) {


        WasteEntry wasteEntry = new WasteEntry();
        wasteEntry.setUserId(wasteEntryDTO.getUserId());
        wasteEntry.setTotalWeight(wasteEntryDTO.getTotalWeight());
        wasteEntry.setFoodWaste(wasteEntryDTO.getFoodWaste());
        wasteEntry.setEWaste(wasteEntryDTO.geteWaste());
        wasteEntry.setRecyclableWaste(wasteEntryDTO.getRecyclableWaste());
        wasteEntry.setRegularWaste(wasteEntryDTO.getRegularWaste());

        wasteEntryRepository.save(wasteEntry);

        return new WasteEntryResponse(
                wasteEntry.getUserId(),
                "Waste entry created successfully.",
                wasteEntry.getTotalWeight(),
                wasteEntry.getFoodWaste(),
                wasteEntry.getEWaste(),
                wasteEntry.getRecyclableWaste(),
                wasteEntry.getRegularWaste());
    }

    public Optional<WasteEntry> getAllWasteEntriesByUserId(Long userId) {
        return wasteEntryRepository.findByUserId(userId);
    }

    public WasteUpdateResponse updateWasteEntryByUserId(Long userId, WasteEntryRequest wasteEntryDTO) {
        WasteEntry wasteEntry = wasteEntryRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("WasteEntry not found for this userId: " + userId));

        // Update only the weight fields
        wasteEntry.setTotalWeight(wasteEntryDTO.getTotalWeight());
        wasteEntry.setFoodWaste(wasteEntryDTO.getFoodWaste());
        wasteEntry.setEWaste(wasteEntryDTO.geteWaste());
        wasteEntry.setRecyclableWaste(wasteEntryDTO.getRecyclableWaste());
        wasteEntry.setRegularWaste(wasteEntryDTO.getRegularWaste());

        wasteEntryRepository.save(wasteEntry);

        return new WasteUpdateResponse(userId, "Waste entry updated successfully.", wasteEntry.getTotalWeight(), wasteEntry.getFoodWaste(), wasteEntry.getEWaste(), wasteEntry.getRecyclableWaste(), wasteEntry.getRegularWaste());
    }

    public WasteDeleteResponse deleteWasteEntryByUserId(Long userId) {
        WasteEntry wasteEntry = wasteEntryRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("WasteEntry not found for this userId: " + userId));

        wasteEntryRepository.delete(wasteEntry);

        return new WasteDeleteResponse("Waste entry deleted successfully.");
    }
}
