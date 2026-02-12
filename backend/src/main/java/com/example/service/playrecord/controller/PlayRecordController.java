package com.example.service.playrecord.controller;

import com.example.service.common.response.ApiResponse;
import com.example.service.playrecord.entity.PlayRecord;
import com.example.service.playrecord.service.PlayRecordService;
import jakarta.validation.constraints.Min;
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
@RequestMapping("/api/play/records")
@Validated
public class PlayRecordController {

    private final PlayRecordService playRecordService;

    public PlayRecordController(PlayRecordService playRecordService) {
        this.playRecordService = playRecordService;
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<PlayRecord>> findByUser(@PathVariable Long userId) {
        return ApiResponse.success(playRecordService.findByUser(userId));
    }

    @PostMapping
    public ApiResponse<PlayRecord> record(@RequestBody @Validated PlayRecordRequest request) {
        return ApiResponse.success(
                playRecordService.recordPlay(request.userId(), request.gameId(), request.score()));
    }

    public record PlayRecordRequest(
            @NotNull Long userId, @NotNull Long gameId, @NotNull @Min(0) Integer score) {}
}

