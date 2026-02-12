package com.example.service.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 현재는 저장용 Profile 엔티티를 사용하지 않고,
 * 여러 도메인(user, portfolio, roadmap, playrecord)을 읽어서 조합만 하기 때문에
 * 이 DTO는 확장용 플레이스홀더로 두었다.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileUpdateRequest {

    private String displayName;
}

