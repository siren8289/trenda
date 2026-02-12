package com.example.service.user.dto;

import com.example.service.user.entity.User;

import java.time.Instant;

/*
 * ============================================================
 * UserResponse
 *
 * [역할]
 * - API 응답(Response) 전용 DTO
 * - Entity(User)를 외부(API)로 직접 노출하지 않기 위해 사용
 *
 * [실무 목적]
 * 1) Entity 구조 변경 시 API 영향 최소화
 * 2) 민감 필드(password 등) 노출 방지
 * 3) API 응답 스펙을 명확히 고정
 *
 * (정보처리기사/산업기사 이론)
 * - 캡슐화
 * - 계층 분리
 * ============================================================
 */
public record UserResponse(

        Long id,
        String email,
        String displayName,
        Instant createdAt
) {

    /*
     * ============================================================
     * from(User user)
     *
     * [역할]
     * - Entity(User) → Response DTO 변환
     *
     * 왜 static 메서드인가?
     * - 변환 로직이 명확
     * - Controller/Service 코드 단순화
     *
     * 실무 관례:
     * - Response DTO가 "자기 자신을 만드는 방법"을 아는 구조
     * ============================================================
     */
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getDisplayName(),
                user.getCreatedAt()
        );
    }
}