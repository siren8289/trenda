package com.example.service.explore;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResourceService {
    private final ResourceRepository resourceRepository;

    // 1. 모든 리소스 가져오기
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    // 2. 카테고리별 리소스 보기
    public List<Resource> getResourcesByCategory(String category) {
        return resourceRepository.findByCategory(category);
    }

    // 3. 새로운 리소스 추가하기
    public Resource addResource(String title, String url, String category, String description) {
        Resource resource = new Resource(title, url, category, description);
        return resourceRepository.save(resource);
    }
}
