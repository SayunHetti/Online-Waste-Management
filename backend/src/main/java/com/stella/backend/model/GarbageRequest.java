package com.stella.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class GarbageRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Double totalWeight;
    private Double foodWaste;
    private Double eWaste; // Changed to match getter/setter naming
    private Double recyclableWaste;
    private Double regularWaste;

    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private LocalDate requestDate;

    @Column(nullable = false)
    private String address;

    private String comments;

    @Column(nullable = false)
    private Boolean completed = false;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(Double totalWeight) {
        this.totalWeight = totalWeight;
    }

    public Double getFoodWaste() {
        return foodWaste;
    }

    public void setFoodWaste(Double foodWaste) {
        this.foodWaste = foodWaste;
    }

    public Double getEWaste() { // Corrected getter name
        return eWaste;
    }

    public void setEWaste(Double eWaste) { // Corrected setter name
        this.eWaste = eWaste;
    }

    public Double getRecyclableWaste() {
        return recyclableWaste;
    }

    public void setRecyclableWaste(Double recyclableWaste) {
        this.recyclableWaste = recyclableWaste;
    }

    public Double getRegularWaste() {
        return regularWaste;
    }

    public void setRegularWaste(Double regularWaste) {
        this.regularWaste = regularWaste;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
