package com.example.service.explore.resource;

import com.example.service.common.response.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/explore/resources")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping
    public ApiResponse<List<Resource>> list() {
        return ApiResponse.success(resourceService.findAll());
    }

    @PostMapping
    public ApiResponse<Resource> create(@Valid @RequestBody Resource resource) {
        return ApiResponse.success(resourceService.save(resource));
    }
}

