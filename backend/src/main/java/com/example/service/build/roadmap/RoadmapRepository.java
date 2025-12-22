package com.example.service.build.roadmap;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    List<Roadmap> findByUserId(Long userId);
}

