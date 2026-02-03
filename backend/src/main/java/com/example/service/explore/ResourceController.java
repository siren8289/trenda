package com.example.service.explore;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {
    private final ResourceService resourceService;

    // 전체 조회: GET http://localhost:8080/api/resources
    @GetMapping
    public List<Resource> listAll() {
        return resourceService.getAllResources();
    }

    // 카테고리별 조회: GET http://localhost:8080/api/resources/search?category=VIDEO
    @GetMapping("/search")
    public List<Resource> listByCategory(@RequestParam String category) {
        return resourceService.getResourcesByCategory(category);
    }

    // 리소스 등록: POST http://localhost:8080/api/resources
    @PostMapping
    public Resource create(@RequestParam String title, 
                           @RequestParam String url, 
                           @RequestParam String category, 
                           @RequestParam String description) {
        return resourceService.addResource(title, url, category, description);
    }
}
