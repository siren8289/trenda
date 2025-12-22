package com.example.service.explore.scrap;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    List<Scrap> findByUserId(Long userId);
}

