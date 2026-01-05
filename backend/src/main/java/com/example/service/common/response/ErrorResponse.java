package com.example.service.common.response;

import java.time.Instant;

public record ErrorResponse(
        String message,
        int status,
        Instant timestamp
) {}
