package com.example.service.resource.controller;

import com.example.service.resource.entity.Resource;
import com.example.service.resource.service.ResourceService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    @GetMapping
    public List<Resource> listAll() {
        return resourceService.getAllResources();
    }

    @GetMapping("/search")
    public List<Resource> listByCategory(@RequestParam String category) {
        return resourceService.getResourcesByCategory(category);
    }

    @PostMapping
    public Resource create(
            @RequestParam String title,
            @RequestParam String url,
            @RequestParam String category,
            @RequestParam String description) {
        return resourceService.addResource(title, url, category, description);
    }
}

