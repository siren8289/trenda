package com.example.service.user.repository;

import com.example.service.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    // [리뷰 반영] 인덱스 성능을 위해 IgnoreCase 제거 (소문자 저장 전제)
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
