package com.example.service.profile;

import com.example.service.build.portfolio.Portfolio;
import com.example.service.build.portfolio.PortfolioService;
import com.example.service.build.roadmap.Roadmap;
import com.example.service.build.roadmap.RoadmapService;
import com.example.service.play.record.PlayRecord;
import com.example.service.play.record.PlayService;
import com.example.service.user.User;
import com.example.service.user.UserService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ProfileService {

    private final UserService userService;
    private final PlayService playService;
    private final PortfolioService portfolioService;
    private final RoadmapService roadmapService;

    public ProfileService(
            UserService userService,
            PlayService playService,
            PortfolioService portfolioService,
            RoadmapService roadmapService) {
        this.userService = userService;
        this.playService = playService;
        this.portfolioService = portfolioService;
        this.roadmapService = roadmapService;
    }

    public ProfileView getProfile(Long userId) {
        User user = userService.findById(userId);
        List<PlayRecord> playRecords = playService.findByUser(userId);
        List<Portfolio> portfolios = portfolioService.findByUser(userId);
        List<Roadmap> roadmaps = roadmapService.findByUser(userId);
        return new ProfileView(user, playRecords, portfolios, roadmaps);
    }

    public record ProfileView(
            User user, List<PlayRecord> playRecords, List<Portfolio> portfolios, List<Roadmap> roadmaps) {}
}

