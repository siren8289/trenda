package com.example.service.play.game;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/games") // "주소/api/games"로 들어오라는 뜻
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    // 모든 게임 보기: GET http://localhost:8080/api/games
    @GetMapping
    public List<Game> getAllGames() {
        return gameService.findAllGames();
    }

    // 게임 등록하기: POST http://localhost:8080/api/games
    @PostMapping
    public Game addGame(@RequestParam String title, @RequestParam String description) {
        return gameService.createGame(title, description);
    }
}