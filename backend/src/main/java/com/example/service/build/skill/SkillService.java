package com.example.service.build.skill;

import com.example.service.common.exception.CustomException;
import com.example.service.user.User;
import com.example.service.user.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserService userService;

    @PersistenceContext
    private EntityManager entityManager;

    public SkillService(SkillRepository skillRepository, UserService userService) {
        this.skillRepository = skillRepository;
        this.userService = userService;
    }

    public List<SkillTag> findAllTags() {
        return skillRepository.findAll();
    }

    @Transactional
    public UserScore recordScore(Long userId, Long skillTagId, Integer score) {
        User user = userService.findById(userId);
        SkillTag skillTag = skillRepository.findById(skillTagId)
                .orElseThrow(() -> new CustomException("Skill tag not found", HttpStatus.NOT_FOUND));

        UserScore userScore = UserScore.builder()
                .user(user)
                .skillTag(skillTag)
                .score(score)
                .build();

        entityManager.persist(userScore);
        return userScore;
    }
}

