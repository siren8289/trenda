package com.example.service.question.dto;

import com.example.service.question.entity.Question;
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
public class QuestionResponse {

    private Long id;
    private Long gameId;
    private String content;
    private String answer;
    private String difficulty;

    public static QuestionResponse from(Question question) {
        if (question == null) {
            return null;
        }
        return QuestionResponse.builder()
                .id(question.getId())
                .gameId(question.getGame().getId())
                .content(question.getContent())
                .answer(question.getAnswer())
                .difficulty(question.getDifficulty())
                .build();
    }
}

