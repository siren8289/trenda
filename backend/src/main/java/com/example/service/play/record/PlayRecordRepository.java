package com.example.service.play.record;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayRecordRepository extends JpaRepository<PlayRecord, Long> {
    List<PlayRecord> findByUserId(Long userId);
}

