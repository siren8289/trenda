package com.example.service.question.repository;

import com.example.service.question.entity.Question;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByGameId(Long gameId);
}

