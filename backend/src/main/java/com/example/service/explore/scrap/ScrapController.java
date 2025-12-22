package com.example.service.explore.scrap;

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
@RequestMapping("/api/explore/scraps")
@Validated
public class ScrapController {

    private final ScrapService scrapService;

    public ScrapController(ScrapService scrapService) {
        this.scrapService = scrapService;
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<Scrap>> findByUser(@PathVariable Long userId) {
        return ApiResponse.success(scrapService.findByUser(userId));
    }

    @PostMapping
    public ApiResponse<Scrap> create(@RequestBody ScrapRequest request) {
        return ApiResponse.success(
                scrapService.create(request.userId(), request.resourceId(), request.note()));
    }

    public record ScrapRequest(
            @NotNull Long userId, @NotNull Long resourceId, @NotBlank String note) {}
}

