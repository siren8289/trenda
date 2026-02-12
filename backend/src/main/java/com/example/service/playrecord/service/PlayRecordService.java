package com.example.service.playrecord.service;

import com.example.service.game.entity.Game;
import com.example.service.game.service.GameService;
import com.example.service.playrecord.entity.PlayRecord;
import com.example.service.playrecord.repository.PlayRecordRepository;
import com.example.service.user.entity.User;
import com.example.service.user.service.UserService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class PlayRecordService {

    private final PlayRecordRepository playRecordRepository;
    private final UserService userService;
    private final GameService gameService;

    public PlayRecordService(
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
        User user = userService.getUserEntity(userId);
        Game game = gameService.findById(gameId);

        PlayRecord record = PlayRecord.builder()
                .user(user)
                .game(game)
                .score(score)
                .build();

        return playRecordRepository.save(record);
    }
}

