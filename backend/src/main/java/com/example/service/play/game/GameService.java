package com.example.service.play.game;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import jakarta.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    // 1. 모든 게임 목록 가져오기
    public List<Game> findAllGames() {
        return gameRepository.findAll();
    }

    // 2. 새로운 게임 저장하기
    public Game createGame(String title, String description) {
        Game newGame = new Game(title, description);
        return gameRepository.save(newGame);
    }
    public Game findById(Long gameId) {
        return gameRepository.findById(gameId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with id = " + gameId));
    }
}