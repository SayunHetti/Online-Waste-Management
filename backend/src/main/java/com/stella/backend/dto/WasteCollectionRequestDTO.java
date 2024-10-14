package com.stella.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WasteCollectionRequestDTO {
    private String imageUrl;   // URL of the image uploaded by the waste collecting employee
    private int rating;        // Rating for the route
}
