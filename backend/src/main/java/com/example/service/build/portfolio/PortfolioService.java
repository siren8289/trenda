package com.example.service.build.portfolio;

import com.example.service.user.User;
import com.example.service.user.UserService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserService userService;

    public PortfolioService(PortfolioRepository portfolioRepository, UserService userService) {
        this.portfolioRepository = portfolioRepository;
        this.userService = userService;
    }

    public List<Portfolio> findByUser(Long userId) {
        return portfolioRepository.findByUserId(userId);
    }

    @Transactional
    public Portfolio create(Long userId, String projectTitle, String summary, String link) {
        User user = userService.findById(userId);
        Portfolio portfolio = Portfolio.builder()
                .user(user)
                .projectTitle(projectTitle)
                .summary(summary)
                .link(link)
                .build();
        return portfolioRepository.save(portfolio);
    }
}

