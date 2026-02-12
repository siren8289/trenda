package com.example.service.playrecord.dto;

import com.example.service.playrecord.entity.PlayRecord;
import java.time.Instant;
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
public class PlayRecordResponse {

    private Long id;
    private Long userId;
    private Long gameId;
    private Integer score;
    private Instant playedAt;

    public static PlayRecordResponse from(PlayRecord record) {
        if (record == null) {
            return null;
        }
        return PlayRecordResponse.builder()
                .id(record.getId())
                .userId(record.getUser().getId())
                .gameId(record.getGame().getId())
                .score(record.getScore())
                .playedAt(record.getPlayedAt())
                .build();
    }
}

