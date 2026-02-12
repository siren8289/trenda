package com.example.service.common.config;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * 개발 환경에서 Datasource 설정을 확인하기 위한 컴포넌트.
 * - 민감 정보 노출을 막기 위해 전체 URL 대신 마스킹된 정보만 로그로 남긴다.
 */
@Slf4j
@Profile({"local", "dev"})
@Component
public class DatasourceDebug {

    @Value("${spring.datasource.url:NOT_SET}")
    private String datasourceUrl;

    @PostConstruct
    public void print() {
        if ("NOT_SET".equals(datasourceUrl)) {
            log.warn("DATASOURCE URL is NOT_SET");
            return;
        }
        // 전체 URL 대신 일부 정보만 로그로 남김
        String masked = datasourceUrl.length() > 20
                ? datasourceUrl.substring(0, 20) + "... (masked)"
                : "(masked)";
        log.info("DATASOURCE URL configured: {}", masked);
    }
}

