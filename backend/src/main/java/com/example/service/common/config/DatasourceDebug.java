package com.example.service.common.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DatasourceDebug {

    @Value("${spring.datasource.url:NOT_SET}")
    private String datasourceUrl;

    @PostConstruct
    public void print() {
        System.out.println(">>> DATASOURCE URL = " + datasourceUrl);
    }
}

