package com.example.service.roadmap.controller;

import com.example.service.roadmap.entity.Roadmap;
import com.example.service.roadmap.service.RoadmapService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/roadmap")
@RequiredArgsConstructor
public class RoadmapController {

    private final RoadmapService roadmapService;

    @GetMapping("/{userId}")
    public List<Roadmap> getMyRoadmap(@PathVariable Long userId) {
        return roadmapService.getUserRoadmaps(userId);
    }

    @PostMapping
    public Roadmap addRoadmap(
            @RequestParam Long userId,
            @RequestParam String title,
            @RequestParam String content) {
        return roadmapService.createRoadmap(userId, title, content);
    }
}

