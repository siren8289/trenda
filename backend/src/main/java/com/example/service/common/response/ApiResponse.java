package com.example.service.common.response;

import java.time.Instant;

/**
 * API 공통 응답 래퍼.
 * - success: 처리 성공 여부
 * - data: 성공 시 응답 데이터
 * - error: 실패 시 에러 정보
 * - timestamp: 응답 생성 시각
 *
 * HTTP 상태 코드는 ResponseEntity 가 담당하고,
 * ApiResponse 는 Body 구조만 책임진다.
 */
public record ApiResponse<T>(
        boolean success,
        T data,
        ErrorResponse error,
        Instant timestamp
) {

    /** 성공 응답 생성. */
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null, Instant.now());
    }

    /** 실패 응답 생성. */
    public static <T> ApiResponse<T> error(ErrorResponse error) {
        return new ApiResponse<>(false, null, error, Instant.now());
    }
}

