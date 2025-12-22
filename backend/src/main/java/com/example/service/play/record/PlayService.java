package com.example.service.play.record;

import com.example.service.play.game.Game;
import com.example.service.play.game.GameService;
import com.example.service.user.User;
import com.example.service.user.UserService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class PlayService {

    private final PlayRecordRepository playRecordRepository;
    private final UserService userService;
    private final GameService gameService;

    public PlayService(
            PlayRecordRepository playRecordRepository,
            UserService userService,
            GameService gameService) {
        this.playRecordRepository = playRecordRepository;
        this.userService = userService;
        this.gameService = gameService;
    }

    public List<PlayRecord> findByUser(Long userId) {
        return playRecordRepository.findByUserId(userId);
    }

    @Transactional
    public PlayRecord recordPlay(Long userId, Long gameId, Integer score) {
        User user = userService.findById(userId);
        Game game = gameService.findById(gameId);

        PlayRecord record = PlayRecord.builder()
                .user(user)
                .game(game)
                .score(score)
                .build();

        return playRecordRepository.save(record);
    }
}

