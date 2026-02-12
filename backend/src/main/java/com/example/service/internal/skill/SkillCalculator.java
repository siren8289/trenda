package com.example.service.internal.skill;

/**
 * 스킬 점수/레벨 계산과 같이
 * DB에 의존하지 않는 순수 비즈니스 로직을 모아두는 유틸 클래스.
 *
 * 지금은 간단한 예시 메서드만 두고,
 * 실제 점수 산정 규칙이 정해지면 여기서 확장할 수 있습니다.
 */
public final class SkillCalculator {

    private SkillCalculator() {
        // util class
    }

    /**
     * 점수(0~100)를 단순 레벨(1~5)로 변환하는 예시 메서드.
     */
    public static int toLevel(int score) {
        if (score < 20) return 1;
        if (score < 40) return 2;
        if (score < 60) return 3;
        if (score < 80) return 4;
        return 5;
    }
}

