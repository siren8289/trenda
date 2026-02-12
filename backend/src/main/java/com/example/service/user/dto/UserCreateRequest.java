package com.example.service.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserCreateRequest(
    @NotBlank @Email String email,
    @NotBlank String displayName
) {
    public String normalizedEmail() {
        return email.trim().toLowerCase();
    }
    
    public String normalizedDisplayName() {
        return displayName.trim();
    }
}