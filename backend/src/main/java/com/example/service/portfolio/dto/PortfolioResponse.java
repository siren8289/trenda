package com.example.service.portfolio.dto;

import com.example.service.portfolio.entity.Portfolio;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioResponse {

    private Long id;
    private Long userId;
    private String title;
    private String summary;
    private LocalDateTime createdAt;

    public static PortfolioResponse from(Portfolio portfolio) {
        if (portfolio == null) {
            return null;
        }
        return PortfolioResponse.builder()
                .id(portfolio.getId())
                .userId(portfolio.getUserId())
                .title(portfolio.getTitle())
                .summary(portfolio.getSummary())
                .createdAt(portfolio.getCreatedAt())
                .build();
    }
}

