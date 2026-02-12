package com.example.service.game.dto;

import com.example.service.game.entity.Game;
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
public class GameResponse {

    private Long id;
    private String title;
    private String description;

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

