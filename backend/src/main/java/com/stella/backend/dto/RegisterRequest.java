package com.stella.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RegisterRequest {

    private String username;
    private String name;
    private String email;
    private String password;
    private String address;
    private String gender;
    private String age;

}
