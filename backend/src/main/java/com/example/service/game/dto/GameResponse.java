package com.example.service.game.dto;

import com.example.service.game.entity.Game;
import lombok.Builder;
import lombok.Getter;

/**
 * 게임 조회 응답 DTO.
 * - Entity 를 숨기고 API 응답 스펙만 표현한다.
 */
@Getter
@Builder
public class GameResponse {

    private final Long id;
    private final String title;
    private final String description;

    public static GameResponse from(Game game) {
        if (game == null) {
            return null;
        }
        return GameResponse.builder()
                .id(game.getId())
                .title(game.getTitle())
                .description(game.getDescription())
                .build();
    }
}

