package com.example.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URI;

@SpringBootApplication
public class ServiceApplication {

    public static void main(String[] args) {
        // Render 등에서 DATABASE_URL(PostgreSQL)이 있으면 JDBC로 변환해 사용
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl != null && databaseUrl.startsWith("postgresql://")) {
            try {
                URI uri = new URI(databaseUrl.replace("postgresql://", "http://"));
                String userInfo = uri.getUserInfo();
                if (userInfo != null) {
                    int firstColon = userInfo.indexOf(':');
                    String username = firstColon > 0 ? userInfo.substring(0, firstColon) : userInfo;
                    String password = firstColon > 0 ? userInfo.substring(firstColon + 1) : "";
                    String host = uri.getHost();
                    int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                    String path = uri.getPath() != null && !uri.getPath().isEmpty() ? uri.getPath() : "/";
                    if (path.startsWith("/")) path = path.substring(1);
                    String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + "/" + path;
                    if (uri.getQuery() != null && !uri.getQuery().isEmpty()) {
                        jdbcUrl += "?" + uri.getQuery();
                    }
                    System.setProperty("spring.datasource.url", jdbcUrl);
                    System.setProperty("spring.datasource.username", username);
                    System.setProperty("spring.datasource.password", password);
                    System.setProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");
                    System.setProperty("spring.jpa.database-platform", "org.hibernate.dialect.PostgreSQLDialect");
                }
            } catch (Exception ignored) {
                // DATABASE_URL 파싱 실패 시 application.yml 기본값(PostgreSQL) 사용
            }
        }
        SpringApplication.run(ServiceApplication.class, args);
    }
}

