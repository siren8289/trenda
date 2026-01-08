package com.example.service.build.portfolio;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/{userId}")
    public Portfolio view(@PathVariable Long userId) {
        return portfolioService.getPortfolio(userId);
    }

    @PostMapping
    public Portfolio generate(@RequestParam Long userId,
                              @RequestParam String title,
                              @RequestParam String summary) {
        return portfolioService.createOrUpdatePortfolio(userId, title, summary);
    }
}