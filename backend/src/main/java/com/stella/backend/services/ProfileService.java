package com.stella.backend.services;

import com.stella.backend.dao.User;
import com.stella.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    // Fetch logged-in user profile
    public User getProfile(String token) {
        String email = jwtService.extractUsername(token);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Update user profile
    public User updateProfile(String token, User updatedUser) {
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirst_name(updatedUser.getFirst_name());
        user.setLast_name(updatedUser.getLast_name());
        user.setAge(updatedUser.getAge());
        user.setAddress(updatedUser.getAddress());
        user.setGender(updatedUser.getGender());

        return userRepository.save(user);
    }

    // Delete user profile
    public void deleteProfile(String token) {
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.delete(user);
    }
}
