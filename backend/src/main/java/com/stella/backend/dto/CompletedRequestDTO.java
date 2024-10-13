package com.stella.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompletedRequestDTO {
    private Long userId;
    private String area;
    private LocalDate requestDate;
    private String address;
    private Double totalWeight;
    private Double foodWaste;
    private Double eWaste;
    private Double recyclableWaste;
    private Double regularWaste;
}
