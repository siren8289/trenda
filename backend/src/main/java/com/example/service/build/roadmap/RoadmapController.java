package com.example.service.build.roadmap;

import com.example.service.common.response.ApiResponse;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/build/roadmaps")
@Validated
public class RoadmapController {

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<Roadmap>> findByUser(@PathVariable Long userId) {
        return ApiResponse.success(roadmapService.findByUser(userId));
    }

    @PostMapping
    public ApiResponse<Roadmap> create(@RequestBody RoadmapRequest request) {
        return ApiResponse.success(
                roadmapService.create(request.userId(), request.title(), request.content()));
    }

    public record RoadmapRequest(
            @NotNull Long userId, @NotBlank String title, @NotBlank String content) {}
}

