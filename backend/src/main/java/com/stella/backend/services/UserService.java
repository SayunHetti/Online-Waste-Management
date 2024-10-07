package com.stella.backend.services;

import com.stella.backend.dto.AuthenticationRequest;
import com.stella.backend.dto.AuthenticationResponse;
import com.stella.backend.dto.RegisterRequest;
import com.stella.backend.masterservice.dao.User;
import com.stella.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        var user = User.builder()
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .email(registerRequest.getEmail())
                .name(registerRequest.getName())
                .age(Integer.valueOf(registerRequest.getAge()))
                .gender(registerRequest.getGender())
                .address(registerRequest.getAddress())
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse login(AuthenticationRequest authRequest) {
        // Authenticate user
        log.info("Login request received {}", authRequest);
        log.info(authRequest.getPassword());
        log.info(authRequest.getUsername());

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authRequest.getUsername(), authRequest.getPassword()
        ));

        log.info("Authentication successful");
        // Get user details
        var user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> {
                    log.debug("User not found with username: {}", authRequest.getUsername());
                    return new RuntimeException("User not found");
                });
        log.info(user.getUsername());
        // Generate JWT token
        var jwtToken = jwtService.generateToken(user);
        log.info("JWT token: {}", jwtToken);

        System.out.println(user);
        // Return the token
        return AuthenticationResponse.builder().token(jwtToken).role(user.getRole().name()).build();
    }
}
