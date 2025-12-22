package com.example.service.build.portfolio;

import com.example.service.common.response.ApiResponse;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/build/portfolios")
@Validated
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<Portfolio>> findByUser(@PathVariable Long userId) {
        return ApiResponse.success(portfolioService.findByUser(userId));
    }

    @PostMapping
    public ApiResponse<Portfolio> create(@RequestBody PortfolioRequest request) {
        return ApiResponse.success(portfolioService.create(
                request.userId(), request.projectTitle(), request.summary(), request.link()));
    }

    public record PortfolioRequest(
            @NotNull Long userId, @NotBlank String projectTitle, @NotBlank String summary, String link) {}
}

