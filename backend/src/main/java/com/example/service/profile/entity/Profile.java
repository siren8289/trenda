package com.example.service.profile.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

/** 프로필 도메인 엔티티. DB profiles 테이블과 매핑. 생성/변경은 도메인 메서드로만. */
@Entity
@Table(
        name = "profiles",
        uniqueConstraints = @UniqueConstraint(name = "uk_profiles_user_id", columnNames = "user_id")
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** User와 1:1. ID 참조로 결합도 감소. */
    @Column(name = "user_id", nullable = false, updatable = false)
    private Long userId;

    @Column(length = 50)
    private String nickname;

    @Column(length = 255)
    private String bio;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    private Profile(Long userId) {
        this.userId = userId;
    }

    /** 사용자 프로필 최초 생성. */
    public static Profile create(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("userId must not be null");
        }
        return new Profile(userId);
    }

    /** null은 변경 안 함. 넣은 값만 반영. */
    public void updateProfile(String nickname, String bio, String imageUrl) {
        if (nickname != null) this.nickname = nickname;
        if (bio != null) this.bio = bio;
        if (imageUrl != null) this.imageUrl = imageUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Profile profile)) return false;
        return id != null && id.equals(profile.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
