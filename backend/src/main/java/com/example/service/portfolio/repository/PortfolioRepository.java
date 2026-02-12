package com.example.service.portfolio.repository;

import com.example.service.portfolio.entity.Portfolio;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    List<Portfolio> findByUserId(Long userId);

    Optional<Portfolio> findTopByUserIdOrderByCreatedAtDesc(Long userId);
}

