package com.example.service.common.exception;

import com.example.service.common.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.Instant;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        ErrorResponse error = new ErrorResponse(
                e.getMessage(),
                e.getStatus().value(),
                Instant.now()
        );

        return ResponseEntity.status(e.getStatus()).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception e) {
        ErrorResponse error = new ErrorResponse(
                "Unexpected server error",
                500,
                Instant.now()
        );

        return ResponseEntity.internalServerError().body(error);
    }
}
