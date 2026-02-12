package com.example.service.game.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Game 엔티티.
 * - 제목/설명을 가진 게임 도메인 모델.
 * - 생성/수정 시 도메인 무결성을 스스로 보장한다.
 */
@Entity
@Table(name = "games")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Game(String title, String description) {
        this.title = title;
        this.description = description;
    }

    /** 신규 게임 생성 (필수값 검증 + 정규화 포함). */
    public static Game create(String title, String description) {
        if (title == null || title.trim().isBlank()) {
            throw new IllegalArgumentException("title must not be blank");
        }
        String normalizedTitle = title.trim();
        String normalizedDescription = description == null ? null : description.trim();
        return new Game(normalizedTitle, normalizedDescription);
    }

    /** 게임 정보 수정. null 은 '변경 없음', 값이 있으면 검증 후 반영. */
    public void update(String title, String description) {
        if (title != null) {
            String normalizedTitle = title.trim();
            if (normalizedTitle.isBlank()) {
                throw new IllegalArgumentException("title must not be blank");
            }
            this.title = normalizedTitle;
        }
        if (description != null) {
            this.description = description.trim();
        }
    }
}

