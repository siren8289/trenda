package com.example.service.resource.repository;

import com.example.service.resource.entity.Resource;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findByCategory(String category);
}

