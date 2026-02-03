package com.example.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URI;

@SpringBootApplication
public class ServiceApplication {

    public static void main(String[] args) {
        String databaseUrl = System.getenv("DATABASE_URL");
        String springUrl = System.getenv("SPRING_DATASOURCE_URL");
        String springUser = System.getenv("SPRING_DATASOURCE_USERNAME");
        String springPass = System.getenv("SPRING_DATASOURCE_PASSWORD");

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
                    setDatasourceProperties(jdbcUrl, username, password);
                    System.out.println(">>> [ServiceApplication] Using DATABASE_URL -> " + host + ":" + port + "/" + path);
                } else {
                    fallbackToLocalOrFail(springUrl, springUser, springPass);
                }
            } catch (Exception e) {
                System.err.println(">>> [ServiceApplication] DATABASE_URL parse failed: " + e.getMessage());
                fallbackToLocalOrFail(springUrl, springUser, springPass);
            }
        } else {
            if (springUrl != null && !springUrl.isBlank()) {
                setDatasourceProperties(springUrl, springUser != null ? springUser : "", springPass != null ? springPass : "");
                System.out.println(">>> [ServiceApplication] Using SPRING_DATASOURCE_URL");
            } else {
                fallbackToLocalOrFail(springUrl, springUser, springPass);
            }
        }
        SpringApplication.run(ServiceApplication.class, args);
    }

    private static void fallbackToLocalOrFail(String springUrl, String springUser, String springPass) {
        if (System.getenv("PORT") != null && !System.getenv("PORT").isEmpty()) {
            System.err.println(">>> [ServiceApplication] Render/PaaS detected (PORT set) but DATABASE_URL and SPRING_DATASOURCE_URL are missing. Set DATABASE_URL in Render Environment.");
            throw new IllegalStateException("DATABASE_URL or SPRING_DATASOURCE_URL required when PORT is set (e.g. Render). Add DATABASE_URL in Render → Environment.");
        }
        setDatasourceProperties(
            "jdbc:postgresql://localhost:5432/trenda",
            "trenda",
            "trenda_password"
        );
        System.out.println(">>> [ServiceApplication] Using local default (localhost:5432/trenda)");
    }

    private static void setDatasourceProperties(String url, String username, String password) {
        System.setProperty("spring.datasource.url", url);
        System.setProperty("spring.datasource.username", username);
        System.setProperty("spring.datasource.password", password);
        System.setProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");
        System.setProperty("spring.jpa.database-platform", "org.hibernate.dialect.PostgreSQLDialect");
    }
}

