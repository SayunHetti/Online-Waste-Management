package com.stella.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "t_waste_collection")
public class WasteCollection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId;

    @Lob // Allows for storage of large objects
    @Column(nullable = false)
    private String imageUrl;  // Base64 encoded image

    @Column(nullable = false)
    private LocalDateTime collectedDateTime;

    @Column(nullable = false)
    private String route;     // Route taken from map

    @Column(nullable = false)
    private int rating;       // Rating of the route

    @Column(nullable = false)
    private Long requestId;   // Added requestId field
}
