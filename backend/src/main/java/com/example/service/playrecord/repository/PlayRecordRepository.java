package com.example.service.playrecord.repository;

import com.example.service.playrecord.entity.PlayRecord;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayRecordRepository extends JpaRepository<PlayRecord, Long> {

    List<PlayRecord> findByUserId(Long userId);
}

