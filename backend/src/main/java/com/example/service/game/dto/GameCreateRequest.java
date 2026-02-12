package com.example.service.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 게임 생성 요청 DTO.
 * - 입력값 검증과 간단한 정규화(공백 제거)만 담당한다.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameCreateRequest {

    @NotBlank
    @Size(max = 100)
    private String title;

    @Size(max = 500)
    private String description;

    /** 앞뒤 공백 제거한 제목. */
    public String normalizedTitle() {
        return title == null ? null : title.trim();
    }

    /** 앞뒤 공백 제거한 설명. */
    public String normalizedDescription() {
        return description == null ? null : description.trim();
    }
}

