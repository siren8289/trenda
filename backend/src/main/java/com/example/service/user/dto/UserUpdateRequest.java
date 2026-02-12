package com.example.service.user.dto;

import jakarta.validation.constraints.NotBlank;

/*
 * ============================================================
 * UserUpdateRequest
 *
 * [역할]
 * - 사용자 정보 "수정" 요청 DTO
 * - 현재는 닉네임(displayName) 변경 용도
 *
 * [실무 원칙]
 * - 변경 가능한 필드만 포함
 * - 식별자(email, id)는 수정 대상에서 제외
 * - Request DTO는 입력 검증까지만 책임
 *
 * (정보처리기사/산업기사 이론)
 * - 캡슐화
 * - 계층 분리 (Controller ↔ Service ↔ Domain)
 * ============================================================
 */
public record UserUpdateRequest(

        /*
         * ============================================================
         * displayName
         *
         * - 변경할 사용자 표시 이름
         *
         * @NotBlank
         * - null ❌
         * - "" ❌
         * - "   " ❌
         *
         * [스프링 동작 흐름]
         * 1) HTTP PATCH/PUT 요청
         * 2) JSON → UserUpdateRequest 바인딩
         * 3) @Valid 실행
         * 4) 실패 시 Service 진입 전 예외 발생
         * ============================================================
         */
        @NotBlank
        String displayName
) {

    /*
     * ============================================================
     * normalizedDisplayName()
     *
     * [역할]
     * - 앞뒤 공백 제거
     * - Service 계층에서 바로 사용 가능
     *
     * 왜 DTO에 두는가?
     * - Service에서 매번 trim() 호출 ❌
     * - 입력 데이터에 대한 간단한 가공은 DTO 책임 ⭕
     *
     * (객체지향 관점)
     * - 데이터 + 관련 행위 = 응집도 증가
     * ============================================================
     */
    public String normalizedDisplayName() {
        return displayName.trim();
    }
}