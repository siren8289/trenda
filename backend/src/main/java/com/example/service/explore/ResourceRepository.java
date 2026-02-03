package com.example.service.explore;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    // 특정 카테고리(예: 동영상만) 자료만 찾는 기능 추가
    List<Resource> findByCategory(String category);
}
