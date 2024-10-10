package com.stella.backend.controllers;

import com.stella.backend.dto.WasteCollectionRequestDTO;
import com.stella.backend.dto.WasteCollectionResponseDTO;
import com.stella.backend.services.WasteCollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/waste-collection")
public class WasteCollectionController {
    private final WasteCollectionService wasteCollectionService;

    @PostMapping("/submit/{requestId}")
    public WasteCollectionResponseDTO submitWasteCollection(@PathVariable Long requestId,
                                                            @RequestBody WasteCollectionRequestDTO wasteCollectionRequestDTO,
                                                            @RequestParam String route) {
        return wasteCollectionService.saveWasteCollection(requestId, wasteCollectionRequestDTO, route);
    }
}
