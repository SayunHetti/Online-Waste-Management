package com.stella.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompletedResponseDTO {
    private Long id;
    private String userId;
    private String area;
    private String address;
    private Boolean completed;
    private Double totalWeight;
    private Double foodWaste;
    private Double eWaste;
    private Double recyclableWaste;
    private Double regularWaste;
}
