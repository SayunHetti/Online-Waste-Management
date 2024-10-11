package com.stella.backend.model;

import com.stella.backend.dao.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class WasteEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true)
    private Long userId;
    private Double totalWeight;
    private Double foodWaste;
    private Double eWaste;
    private Double recyclableWaste;
    private Double regularWaste;
    // Automatically store the date and time when the record is created
    @CreationTimestamp
    @Column(updatable = false) // This makes sure the field is not updated after the entity is created
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(referencedColumnName = "user_id", insertable = false, updatable = false)
    private User user;
    // Getters and Setters

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public Double getTotalWeight() {
//        return totalWeight;
//    }
//
//    public void setTotalWeight(Double totalWeight) {
//        this.totalWeight = totalWeight;
//    }
//
//    public Double getFoodWaste() {
//        return foodWaste;
//    }
//
//    public void setFoodWaste(Double foodWaste) {
//        this.foodWaste = foodWaste;
//    }
//
//    public Double geteWaste() {
//        return eWaste;
//    }
//
//    public void seteWaste(Double eWaste) {
//        this.eWaste = eWaste;
//    }
//
//    public Double getRecyclableWaste() {
//        return recyclableWaste;
//    }
//
//    public void setRecyclableWaste(Double recyclableWaste) {
//        this.recyclableWaste = recyclableWaste;
//    }
//
//    public Double getRegularWaste() {
//        return regularWaste;
//    }
//
//    public void setRegularWaste(Double regularWaste) {
//        this.regularWaste = regularWaste;
//    }
}
