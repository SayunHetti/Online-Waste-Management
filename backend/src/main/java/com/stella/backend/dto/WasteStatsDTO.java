package com.stella.backend.dto;

public class WasteStatsDTO {

    private String area;
    private double eWaste;
    private double foodWaste;
    private double recyclableWaste;
    private double regularWaste;
    private double totalWeight;

    // Constructor
    public WasteStatsDTO(String area, double eWaste, double foodWaste, double recyclableWaste, double regularWaste, double totalWeight) {
        this.area = area;
        this.eWaste = eWaste;
        this.foodWaste = foodWaste;
        this.recyclableWaste = recyclableWaste;
        this.regularWaste = regularWaste;
        this.totalWeight = totalWeight;
    }

    // Getters and setters
    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public double geteWaste() {
        return eWaste;
    }

    public void seteWaste(double eWaste) {
        this.eWaste = eWaste;
    }

    public double getFoodWaste() {
        return foodWaste;
    }

    public void setFoodWaste(double foodWaste) {
        this.foodWaste = foodWaste;
    }

    public double getRecyclableWaste() {
        return recyclableWaste;
    }

    public void setRecyclableWaste(double recyclableWaste) {
        this.recyclableWaste = recyclableWaste;
    }

    public double getRegularWaste() {
        return regularWaste;
    }

    public void setRegularWaste(double regularWaste) {
        this.regularWaste = regularWaste;
    }

    public double getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(double totalWeight) {
        this.totalWeight = totalWeight;
    }
}