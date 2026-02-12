package com.example.service.profile.controller;

import com.example.service.common.response.ApiResponse;
import com.example.service.profile.dto.ProfileResponse;
import com.example.service.profile.service.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** 프로필 API. 표현 계층, GET /api/profile/{userId} 조회. */
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{userId}")
    public ApiResponse<ProfileResponse> profile(@PathVariable Long userId) {
        return ApiResponse.success(profileService.getProfile(userId));
    }
}

