package com.example.service.build.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    // 프로필에서 목록으로 쓰는 용도
    List<Portfolio> findByUserId(Long userId);

    // 대표 1개(최신)
    Optional<Portfolio> findTopByUserIdOrderByCreatedAtDesc(Long userId);
}
