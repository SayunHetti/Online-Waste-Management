package com.stella.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class WasteDeleteResponse {

    private String message;

    public WasteDeleteResponse( String message) {
        this.message = message;
    }



}
