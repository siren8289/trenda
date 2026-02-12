package com.example.service.profile.repository;

import com.example.service.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/** Profile 데이터 접근. 비즈니스/트랜잭션은 Service 책임. */
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    /** User : Profile = 1 : 1. 없을 수 있으므로 Optional. */
    Optional<Profile> findByUserId(Long userId);

    /** 프로필 존재 여부 (중복 생성 방지 등). */
    boolean existsByUserId(Long userId);
}
