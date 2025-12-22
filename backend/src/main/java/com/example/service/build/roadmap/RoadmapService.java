package com.example.service.build.roadmap;

import com.example.service.user.User;
import com.example.service.user.UserService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class RoadmapService {

    private final RoadmapRepository roadmapRepository;
    private final UserService userService;

    public RoadmapService(RoadmapRepository roadmapRepository, UserService userService) {
        this.roadmapRepository = roadmapRepository;
        this.userService = userService;
    }

    public List<Roadmap> findByUser(Long userId) {
        return roadmapRepository.findByUserId(userId);
    }

    @Transactional
    public Roadmap create(Long userId, String title, String content) {
        User user = userService.findById(userId);
        Roadmap roadmap = Roadmap.builder()
                .user(user)
                .title(title)
                .content(content)
                .build();
        return roadmapRepository.save(roadmap);
    }
}

