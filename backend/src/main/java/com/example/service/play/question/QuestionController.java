package com.example.service.play.question;

import com.example.service.common.response.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/play/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/game/{gameId}")
    public ApiResponse<List<Question>> findByGame(@PathVariable Long gameId) {
        return ApiResponse.success(questionService.findByGame(gameId));
    }

    @PostMapping
    public ApiResponse<Question> create(@Valid @RequestBody Question question) {
        return ApiResponse.success(questionService.save(question));
    }
}

