package com.example.service.resource.dto;

import com.example.service.resource.entity.Resource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceResponse {

    private Long id;
    private String title;
    private String url;
    private String category;
    private String description;

    public static ResourceResponse from(Resource resource) {
        if (resource == null) {
            return null;
        }
        return ResourceResponse.builder()
                .id(resource.getId())
                .title(resource.getTitle())
                .url(resource.getUrl())
                .category(resource.getCategory())
                .description(resource.getDescription())
                .build();
    }
}

