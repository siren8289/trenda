package com.example.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URI;

@SpringBootApplication
public class ServiceApplication {

    public static void main(String[] args) {
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
                    setDatasourceProperties(jdbcUrl, username, password);
                }
            } catch (Exception ignored) {
                setDatasourceProperties(
                    "jdbc:postgresql://localhost:5432/trenda",
                    "trenda",
                    "trenda_password"
                );
            }
        } else {
            setDatasourceProperties(
                "jdbc:postgresql://localhost:5432/trenda",
                "trenda",
                "trenda_password"
            );
        }
        SpringApplication.run(ServiceApplication.class, args);
    }

    private static void setDatasourceProperties(String url, String username, String password) {
        System.setProperty("spring.datasource.url", url);
        System.setProperty("spring.datasource.username", username);
        System.setProperty("spring.datasource.password", password);
        System.setProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");
        System.setProperty("spring.jpa.database-platform", "org.hibernate.dialect.PostgreSQLDialect");
    }
}

