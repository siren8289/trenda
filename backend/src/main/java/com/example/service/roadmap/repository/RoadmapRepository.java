package com.example.service.roadmap.repository;

import com.example.service.roadmap.entity.Roadmap;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {

    List<Roadmap> findByUserId(Long userId);
}

