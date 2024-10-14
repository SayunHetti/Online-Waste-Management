package com.stella.backend.controllers;

import com.stella.backend.dto.AuthenticationRequest;
import com.stella.backend.dto.AuthenticationResponse;
import com.stella.backend.dto.RegisterRequest;
import com.stella.backend.dto.UserAddressResponse;
import com.stella.backend.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest registerRequest){
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PostMapping("/authenticate")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authRequest){
        return ResponseEntity.ok(authenticationService.authenticate(authRequest));
    }

    @GetMapping("/by-role")
    public ResponseEntity<List<UserAddressResponse>> getUsersByRole(@RequestParam String role) {
        List<UserAddressResponse> response = authenticationService.getUsersByRole(role);
        return ResponseEntity.ok(response);
    }

}

