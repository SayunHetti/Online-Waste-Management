package com.stella.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class WasteEntryResponse {
    private Long userId;
    private String message;
    private Double totalWeight;
    private Double foodWaste;
    private Double eWaste;
    private Double recyclableWaste;
    private Double regularWaste;

}
