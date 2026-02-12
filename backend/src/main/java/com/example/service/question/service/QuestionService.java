package com.example.service.question.service;

import com.example.service.question.entity.Question;
import com.example.service.question.repository.QuestionRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> findByGame(Long gameId) {
        return questionRepository.findByGameId(gameId);
    }

    @Transactional
    public Question save(Question question) {
        return questionRepository.save(question);
    }
}

