package com.example.service.portfolio.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String title;
    private String summary;
    private LocalDateTime createdAt;

    public Portfolio(Long userId, String title, String summary) {
        this.userId = userId;
        this.title = title;
        this.summary = summary;
        this.createdAt = LocalDateTime.now();
    }

    public void update(String title, String summary) {
        this.title = title;
        this.summary = summary;
    }
}

