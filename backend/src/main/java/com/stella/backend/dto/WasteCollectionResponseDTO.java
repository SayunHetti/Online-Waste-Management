package com.stella.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WasteCollectionResponseDTO {
    private Long id;                      // ID of the waste collection record
    private String userId;                // User ID linked to the request
    private LocalDateTime collectedDateTime; // Date and time when waste was collected
    private String route;                 // Route taken during collection
    private int rating;                   // Rating for the route
    private Long requestId;               // Added requestId field
    private String imageUrl;              // URL of the image uploaded
}
