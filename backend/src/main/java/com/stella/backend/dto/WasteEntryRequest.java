package com.stella.backend.dto;

public class WasteEntryRequest {
    private Long userId;
    private Double totalWeight;
    private Double foodWaste;
    private Double eWaste;
    private Double recyclableWaste;
    private Double regularWaste;

    // Getters and Setters = did not use the inbuilt getters and setters coz when retrieving only for e-waste null val is being recorded reason is: unknown.
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

    public Double geteWaste() {
        return eWaste;
    }

    public void seteWaste(Double eWaste) {
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
}
