package com.example.service.common.exception;

import org.springframework.http.HttpStatus;

/**
 * 비즈니스 예외를 표현하는 공통 예외 타입.
 * - code: 에러 식별 코드 (도메인/상황별 구분용)
 * - status: HTTP 상태 코드
 */
public class CustomException extends RuntimeException {

    private final String code;
    private final HttpStatus status;

    public CustomException(String code, String message, HttpStatus status) {
        super(message);
        this.code = code;
        this.status = status;
    }

    public CustomException(String code, String message, HttpStatus status, Throwable cause) {
        super(message, cause);
        this.code = code;
        this.status = status;
    }

    /** 편의 생성자: 코드가 따로 없을 때 사용. */
    public CustomException(String message, HttpStatus status) {
        this("ERROR", message, status);
    }

    public String getCode() {
        return code;
    }

    public HttpStatus getStatus() {
        return status;
    }
}

