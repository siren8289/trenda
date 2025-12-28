package com.example.service.play.game;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity // "이 클래스는 데이터베이스 테이블이야"라고 알려주는 거예요.
@Getter
@NoArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 게임의 고유 번호 (자동 생성)

    private String title;   // 게임 제목
    private String description; // 게임 설명

    // 새로운 게임을 만들 때 사용하는 생성자
    public Game(String title, String description) {
        this.title = title;
        this.description = description;
    }
}