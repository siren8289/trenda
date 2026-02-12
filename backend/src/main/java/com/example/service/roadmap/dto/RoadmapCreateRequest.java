package com.example.service.roadmap.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoadmapCreateRequest {

    @NotNull
    private Long userId;

    @NotBlank
    private String title;

    @NotBlank
    private String content;
}

