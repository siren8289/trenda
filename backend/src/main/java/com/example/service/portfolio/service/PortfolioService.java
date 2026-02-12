package com.example.service.portfolio.service;

import com.example.service.portfolio.entity.Portfolio;
import com.example.service.portfolio.repository.PortfolioRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public List<Portfolio> findByUser(Long userId) {
        return portfolioRepository.findByUserId(userId);
    }

    public Portfolio getPortfolio(Long userId) {
        return portfolioRepository.findTopByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new RuntimeException("포트폴리오가 아직 생성되지 않았습니다."));
    }

    public Portfolio createOrUpdatePortfolio(Long userId, String title, String summary) {
        Portfolio portfolio = portfolioRepository.findTopByUserIdOrderByCreatedAtDesc(userId)
                .orElseGet(() -> new Portfolio(userId, title, summary));

        portfolio.update(title, summary);
        return portfolioRepository.save(portfolio);
    }
}

