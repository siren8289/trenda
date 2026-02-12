package com.example.service.portfolio.controller;

import com.example.service.portfolio.entity.Portfolio;
import com.example.service.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public Portfolio generate(
            @RequestParam Long userId,
            @RequestParam String title,
            @RequestParam String summary) {
        return portfolioService.createOrUpdatePortfolio(userId, title, summary);
    }
}

