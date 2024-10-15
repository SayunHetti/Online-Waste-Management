package com.stella.backend.controllers;

import com.stella.backend.dto.RouteRatingDTO;
import com.stella.backend.dto.WasteCollectionResponseDTO;
import com.stella.backend.dto.WasteStatsDTO;
import com.stella.backend.services.GarbageRequestService;
import com.stella.backend.services.WasteCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * AdminController handles all administrative requests for waste management statistics and routes.
 */
@CrossOrigin(origins = "http://localhost:5173") // Allow cross-origin requests from localhost:5173 (typically used in development)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final GarbageRequestService garbageRequestService;
    private final WasteCollectionService wasteCollectionService;

    @Autowired
    public AdminController(GarbageRequestService garbageRequestService, WasteCollectionService wasteCollectionService) {
        this.garbageRequestService = garbageRequestService;
        this.wasteCollectionService = wasteCollectionService;
    }

    /**
     * Endpoint to fetch area-wise waste statistics.
     *
     * @return List of WasteStatsDTO containing waste statistics.
     */
    @GetMapping("/waste-statistics")
    public ResponseEntity<List<WasteStatsDTO>> getAreaWiseWasteStatistics() {
        List<WasteStatsDTO> wasteStatistics = garbageRequestService.getAreaWiseWasteStatistics();
        if (wasteStatistics.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Return 204 No Content if no data found
        }
        return new ResponseEntity<>(wasteStatistics, HttpStatus.OK);
    }

    /**
     * Endpoint to fetch top-rated routes based on waste collection ratings.
     *
     * @return List of WasteCollectionResponseDTO containing top-rated routes.
     */
    @GetMapping("/top-rated-routes")
    public ResponseEntity<List<RouteRatingDTO>> getTopRatedRoutes() {
        List<RouteRatingDTO> topRatedRoutes = wasteCollectionService.getTopRatedRoutes();
        return new ResponseEntity<>(topRatedRoutes, HttpStatus.OK);
    }

}