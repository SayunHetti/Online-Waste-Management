package com.stella.backend.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/employeelog")
public class EmployeeController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class); // Create a logger

    @Value("${employee.verification.code}")
    private String employeeCode;  // Retrieved from configuration file

    @PostMapping("/verify")
    public boolean verifyEmployee(@RequestParam String code) {
        logger.info("Received verification request with code: {}", code); // Log the incoming request

        if (employeeCode.equals(code)) {
            logger.info("Employee verification successful for code: {}", code);
            return true;
        } else {
            logger.error("Employee verification failed for code: {}", code);
            return false;
        }
    }
}
