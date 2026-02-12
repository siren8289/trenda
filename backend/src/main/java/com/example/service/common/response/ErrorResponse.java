package com.example.service.common.response;

import java.time.Instant;

/**
 * API 실패 응답 표준 포맷.
 * - code: 에러 식별 코드 (ex. USER_NOT_FOUND)
 * - message: 클라이언트 표시용 메시지
 * - status: HTTP 상태 코드 값
 * - timestamp: 에러 발생 시각
 */
public record ErrorResponse(
        String code,
        String message,
        int status,
        Instant timestamp
) {

    /** ErrorResponse 생성 책임을 한 곳으로 모으는 정적 팩토리. */
    public static ErrorResponse of(String code, String message, int status) {
        return new ErrorResponse(code, message, status, Instant.now());
    }
}
