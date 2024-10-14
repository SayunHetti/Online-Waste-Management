package com.stella.backend.controllers;

import com.stella.backend.dao.User;
import com.stella.backend.services.JwtService;
import com.stella.backend.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final JwtService jwtService;

    // Get the logged-in user profile
    @GetMapping
    public ResponseEntity<User> getProfile(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7); // Remove "Bearer " prefix
        return ResponseEntity.ok(profileService.getProfile(jwtToken));
    }

    // Update the profile of the logged-in user
    @PutMapping
    public ResponseEntity<User> updateProfile(@RequestHeader("Authorization") String token, @RequestBody User updatedUser) {
        String jwtToken = token.substring(7); // Remove "Bearer " prefix
        return ResponseEntity.ok(profileService.updateProfile(jwtToken, updatedUser));
    }

    // Delete the profile of the logged-in user
    @DeleteMapping
    public ResponseEntity<Void> deleteProfile(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7); // Remove "Bearer " prefix
        profileService.deleteProfile(jwtToken);
        return ResponseEntity.noContent().build();
    }
}
