package com.example.service.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * User 엔티티
 *
 * - DB의 users 테이블과 매핑되는 JPA 엔티티
 * - 이메일은 소문자/trim 정규화 정책을 따름
 */
@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_users_email", columnNames = "email")
        }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @NotBlank
    @Column(nullable = false, length = 80)
    private String displayName;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    private User(String email, String displayName) {
        this.email = email;
        this.displayName = displayName;
    }

    /**
     * 정규화 정책( trim + toLowerCase )을 포함하여 User 를 생성하는 정적 팩토리 메서드.
     */
    public static User create(String email, String displayName) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("email must not be blank");
        }
        if (displayName == null || displayName.isBlank()) {
            throw new IllegalArgumentException("displayName must not be blank");
        }
        String normalizedEmail = email.trim().toLowerCase();
        String normalizedName = displayName.trim();
        return new User(normalizedEmail, normalizedName);
    }

    public void changeDisplayName(String newDisplayName) {
        if (newDisplayName == null || newDisplayName.isBlank()) {
            throw new IllegalArgumentException("displayName must not be blank");
        }
        this.displayName = newDisplayName.trim();
    }

    @PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return id != null && id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
