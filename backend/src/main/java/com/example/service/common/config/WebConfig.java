package com.example.service.common.config;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * 로컬/개발 환경용 CORS 설정.
 * - 운영에서는 application.yml 등으로 Origin 을 분리 관리하는 것을 권장.
 */
@Configuration
@Profile({"local", "dev"})
public class WebConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // 인증 정보 허용 (쿠키/Authorization 헤더 등)
        config.setAllowCredentials(true);

        // 허용 Origin 명시 (로컬 개발용)
        config.setAllowedOriginPatterns(List.of("http://localhost:3000"));

        // 필요한 헤더만 허용
        config.setAllowedHeaders(List.of("Content-Type", "Authorization"));

        // 필요한 메서드만 허용
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

        // 노출할 헤더
        config.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);

        return new CorsFilter(source);
    }
}
