package com.example.service.common.exception;

import com.example.service.common.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 전역 예외 처리기.
 * - 비즈니스 예외, Validation 예외, 시스템 예외를 공통 포맷으로 응답한다.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /** 비즈니스 예외 처리. */
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        ErrorResponse error = ErrorResponse.of(
                e.getCode(),
                e.getMessage(),
                e.getStatus().value()
        );
        return ResponseEntity.status(e.getStatus()).body(error);
    }

    /** Bean Validation 실패 처리. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException e) {
        ErrorResponse error = ErrorResponse.of(
                "VALIDATION_ERROR",
                "Invalid request value",
                HttpStatus.BAD_REQUEST.value()
        );
        return ResponseEntity.badRequest().body(error);
    }

    /** 시스템 예외 (최후 방어선). */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception e) {
        ErrorResponse error = ErrorResponse.of(
                "INTERNAL_SERVER_ERROR",
                "Unexpected server error",
                HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        return ResponseEntity.internalServerError().body(error);
    }
}
