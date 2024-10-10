package com.stella.backend.controllers;

import com.stella.backend.dto.WasteDeleteResponse;
import com.stella.backend.dto.WasteEntryRequest;
import com.stella.backend.dto.WasteEntryResponse;
import com.stella.backend.dto.WasteUpdateResponse;
import com.stella.backend.model.WasteEntry;
import com.stella.backend.services.WasteEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/user/waste")
public class WasteEntryController {

    @Autowired
    private WasteEntryService wasteEntryService;

    @PostMapping("/save")
    public WasteEntryResponse saveWasteEntry(@RequestBody WasteEntryRequest wasteEntryDTO) {
        return wasteEntryService.saveWasteEntry(wasteEntryDTO);
    }

    @GetMapping("/getWasteData/{userId}")
    public Optional<WasteEntry> getAllWasteEntries(@PathVariable Long userId) {
        return wasteEntryService.getAllWasteEntriesByUserId(userId);
    }

    @PutMapping("/update/{userId}")
    public WasteUpdateResponse updateWasteEntry(@PathVariable Long userId, @RequestBody WasteEntryRequest wasteEntryDTO) {
        return wasteEntryService.updateWasteEntryByUserId(userId, wasteEntryDTO);
    }

    @DeleteMapping("/delete/{userId}")
    public WasteDeleteResponse deleteWasteEntry(@PathVariable Long userId) {
        return wasteEntryService.deleteWasteEntryByUserId(userId);
    }
}
