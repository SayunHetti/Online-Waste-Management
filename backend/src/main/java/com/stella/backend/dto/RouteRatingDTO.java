package com.stella.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor // Automatically generates an all-args constructor
@Builder
public class RouteRatingDTO {
    private String route;
    private int rating;
}