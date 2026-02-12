package com.example.service.roadmap.service;

import com.example.service.roadmap.entity.Roadmap;
import com.example.service.roadmap.repository.RoadmapRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoadmapService {

    private final RoadmapRepository roadmapRepository;

    public List<Roadmap> getUserRoadmaps(Long userId) {
        return roadmapRepository.findByUserId(userId);
    }

    public Roadmap createRoadmap(Long userId, String title, String content) {
        Roadmap roadmap = new Roadmap(userId, title, content);
        return roadmapRepository.save(roadmap);
    }
}

