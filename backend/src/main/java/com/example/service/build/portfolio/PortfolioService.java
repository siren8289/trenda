package com.example.service.build.portfolio;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    // ✅ ProfileService가 이미 호출하는 메서드 (필수)
    public List<Portfolio> findByUser(Long userId) {
        return portfolioRepository.findByUserId(userId);
    }

    // ✅ 대표 포트폴리오 1개 조회
    public Portfolio getPortfolio(Long userId) {
        return portfolioRepository.findTopByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new RuntimeException("포트폴리오가 아직 생성되지 않았습니다."));
    }

    // ✅ 생성/수정(대표 1개 기준 upsert)
    public Portfolio createOrUpdatePortfolio(Long userId, String title, String summary) {
        Portfolio portfolio = portfolioRepository.findTopByUserIdOrderByCreatedAtDesc(userId)
                .orElseGet(() -> new Portfolio(userId, title, summary));

        portfolio.update(title, summary);
        return portfolioRepository.save(portfolio);
    }
}
