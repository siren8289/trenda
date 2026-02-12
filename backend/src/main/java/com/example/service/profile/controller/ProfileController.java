package com.example.service.profile.controller;

import com.example.service.common.response.ApiResponse;
import com.example.service.profile.dto.ProfileResponse;
import com.example.service.profile.service.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** 프로필 API. HTTP 요청/응답만 담당, 비즈니스 로직·Service 내부 타입 노출 없음. */
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    /** GET /api/profile/{userId}. 반환은 ProfileResponse DTO로 고정해 계층 분리 유지. */
    @GetMapping("/{userId}")
    public ApiResponse<ProfileResponse> profile(@PathVariable Long userId) {
        return ApiResponse.success(profileService.getProfile(userId));
    }
}

