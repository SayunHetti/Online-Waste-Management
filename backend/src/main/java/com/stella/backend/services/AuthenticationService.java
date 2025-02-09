package com.stella.backend.services;


import com.stella.backend.config.Role;
import com.stella.backend.dao.User;
import com.stella.backend.dto.AuthenticationRequest;
import com.stella.backend.dto.AuthenticationResponse;
import com.stella.backend.dto.RegisterRequest;
import com.stella.backend.dto.UserAddressResponse;
import com.stella.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {

        var user = User.builder()
                .first_name(registerRequest.getFirstname())
                .last_name(registerRequest.getLastname())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .age(registerRequest.getAge())
                .address(registerRequest.getAddress())
                .gender(registerRequest.getGender())
                .role(Role.USER)
                .build();

        // Save user to database
        userRepository.save(user);

        // Generate JWT token for the user
        var jwtToken = jwtService.generateToken(user);

        // Return the token
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest authRequest) {

        // Authenticate user
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(),
                authRequest.getPassword()
        ));

        // Get user details
        var user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate JWT token
        var jwtToken = jwtService.generateToken(user);

        // Return the token
        return AuthenticationResponse.builder().token(jwtToken).user_id(user.getUser_id()).address(user.getAddress()).role(user.getRole().name()).build();
    }

    public List<UserAddressResponse> getUsersByRole(String role) {
        // Convert string role to enum and retrieve users
        Role userRole = Role.valueOf(role.toUpperCase());
        List<User> users = userRepository.findByRole(userRole);

        // Map users to response DTO
        return users.stream()
                .map(user -> UserAddressResponse.builder()
                        .user_id(user.getUser_id())
                        .address(user.getAddress())
                        .role(user.getRole().name())
                        .build())
                .collect(Collectors.toList());
    }

}
