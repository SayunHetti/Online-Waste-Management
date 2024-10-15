package com.stella.backend.services;

import com.stella.backend.dao.User;
import com.stella.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ProfileServiceTest {

    @InjectMocks
    private ProfileService profileService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    private User user;
    private String token;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = new User();
        user.setEmail("sayuntest@gmail.com");
        user.setFirst_name("Sayun");
        user.setLast_name("Hetti");
        user.setAge("30");
        user.setAddress("123 Main St");
        user.setGender("Male");

        token = "valid.jwt.token";
    }

    @Test
    void testGetProfile_success() {
        when(jwtService.extractUsername(token)).thenReturn("sayuntest@gmail.com");
        when(userRepository.findByEmail("sayuntest@gmail.com")).thenReturn(Optional.of(user));

        User fetchedUser = profileService.getProfile(token);

        assertNotNull(fetchedUser);
        assertEquals("Sayun", fetchedUser.getFirst_name());
        assertEquals("Hetti", fetchedUser.getLast_name());
    }

    @Test
    void testGetProfile_userNotFound() {
        when(jwtService.extractUsername(token)).thenReturn("sayuntest@gmail.com");
        when(userRepository.findByEmail("sayuntest@gmail.com")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            profileService.getProfile(token);
        });

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void testUpdateProfile_success() {
        when(jwtService.extractUsername(token)).thenReturn("sayuntest@gmail.com");
        when(userRepository.findByEmail("sayuntest@gmail.com")).thenReturn(Optional.of(user));

        User updatedUser = new User();
        updatedUser.setFirst_name("Ravi");
        updatedUser.setLast_name("TEst1");
        updatedUser.setAge("31"); // Keep as String
        updatedUser.setAddress("Adress");
        updatedUser.setGender("Female");

        // Mock the save method to return the updated user
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        User updatedProfile = profileService.updateProfile(token, updatedUser);

        assertNotNull(updatedProfile);
        assertEquals("Ravi", updatedProfile.getFirst_name());
        assertEquals("TEst1", updatedProfile.getLast_name());
        assertEquals("31", updatedProfile.getAge()); // Check age as String
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testUpdateProfile_userNotFound() {
        when(jwtService.extractUsername(token)).thenReturn("sayuntest@gmail.com");
        when(userRepository.findByEmail("sayuntest@gmail.com")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            profileService.updateProfile(token, new User());
        });

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void testDeleteProfile_success() {
        when(jwtService.extractUsername(token)).thenReturn("sayuntest@gmail.com");
        when(userRepository.findByEmail("sayuntest@gmail.com")).thenReturn(Optional.of(user));

        profileService.deleteProfile(token);

        verify(userRepository, times(1)).delete(user);
    }

    @Test
    void testDeleteProfile_userNotFound() {
        when(jwtService.extractUsername(token)).thenReturn("sayuntest@gmail.com");
        when(userRepository.findByEmail("sayuntest@gmail.com")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            profileService.deleteProfile(token);
        });

        assertEquals("User not found", exception.getMessage());
    }
}
