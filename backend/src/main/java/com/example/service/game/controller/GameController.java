package com.example.service.game.controller;

import com.example.service.common.response.ApiResponse;
import com.example.service.game.entity.Game;
import com.example.service.game.service.GameService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/play/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public ApiResponse<List<Game>> list() {
        return ApiResponse.success(gameService.findAll());
    }

    @PostMapping
    public ApiResponse<Game> create(@Valid @RequestBody Game game) {
        return ApiResponse.success(gameService.save(game));
    }
}

