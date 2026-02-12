package com.example.service.user.dto;

public record UserSearchRequest(
    String email,
    String displayName
) {
    // [리뷰 반영] 정규화 로직을 한 곳에 모아 유지보수성 향상
    public String normalizedEmail() {
        return (email != null) ? email.trim().toLowerCase() : null;
    }
}