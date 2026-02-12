package com.example.service.resource.service;

import com.example.service.resource.entity.Resource;
import com.example.service.resource.repository.ResourceRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public List<Resource> getResourcesByCategory(String category) {
        return resourceRepository.findByCategory(category);
    }

    public Resource addResource(String title, String url, String category, String description) {
        Resource resource = new Resource(title, url, category, description);
        return resourceRepository.save(resource);
    }
}

