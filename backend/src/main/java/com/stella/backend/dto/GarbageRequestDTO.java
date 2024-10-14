package com.stella.backend.dto;

import java.time.LocalDate;

public class GarbageRequestDTO {
    private String area; // User input
    private LocalDate requestDate; // User input
    private String address; // User input
    private String comments; // User input

    // Getters and setters

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
}
