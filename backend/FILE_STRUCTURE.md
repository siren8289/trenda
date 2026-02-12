# 백엔드 기능별 파일 구조

`backend/src/main/java/com/example/service/` 기준

---

## 진입점

| 파일 | 설명 |
|------|------|
| `ServiceApplication.java` | Spring Boot 메인 클래스 |

---

## 공통 (common)

| 경로 | 파일 | 설명 |
|------|------|------|
| **config/** | `WebConfig.java` | CORS 등 웹 설정 |
| | `JpaConfig.java` | JPA 설정 |
| | `DatasourceDebug.java` | DB URL 로깅 (디버그) |
| **exception/** | `CustomException.java` | 커스텀 예외 |
| | `GlobalExceptionHandler.java` | 전역 예외 처리 |
| **response/** | `ApiResponse.java` | API 공통 응답 래퍼 |
| | `ErrorResponse.java` | 에러 응답 DTO |

---

## 사용자 (user)

| 파일 | 설명 |
|------|------|
| `User.java` | 사용자 엔티티 |
| `UserController.java` | 회원가입·조회 API |
| `UserRepository.java` | 사용자 JPA 리포지토리 |
| `UserService.java` | 사용자 비즈니스 로직 |

---

## 프로필 (profile)

| 파일 | 설명 |
|------|------|
| `ProfileController.java` | 프로필 조회 API (유저+플레이기록+포트폴리오+로드맵) |
| `ProfileService.java` | 프로필 통합 조회 로직 |

---

## 탐색/리소스 (explore)

| 파일 | 설명 |
|------|------|
| `Resource.java` | 리소스 엔티티 |
| `ResourceController.java` | 리소스 목록/조회 API |
| `ResourceRepository.java` | 리소스 JPA 리포지토리 |
| `ResourceService.java` | 리소스 비즈니스 로직 |

---

## 빌드 (build)

### 포트폴리오 (build/portfolio)

| 파일 | 설명 |
|------|------|
| `Portfolio.java` | 포트폴리오 엔티티 |
| `PortfolioController.java` | 포트폴리오 CRUD API |
| `PortfolioRepository.java` | 포트폴리오 JPA 리포지토리 |
| `PortfolioService.java` | 포트폴리오 비즈니스 로직 |

### 로드맵 (build/roadmap)

| 파일 | 설명 |
|------|------|
| `Roadmap.java` | 로드맵 엔티티 |
| `RoadmapController.java` | 로드맵 CRUD API |
| `RoadmapRepository.java` | 로드맵 JPA 리포지토리 |
| `RoadmapService.java` | 로드맵 비즈니스 로직 |

### 스킬 (build/skill)

| 파일 | 설명 |
|------|------|
| `SkillTag.java` | 스킬 태그 엔티티 |
| `UserScore.java` | 사용자 점수 엔티티 |
| `SkillRepository.java` | 스킬 JPA 리포지토리 |
| `SkillService.java` | 스킬·점수 비즈니스 로직 |

---

## 플레이 (play)

### 게임 (play/game)

| 파일 | 설명 |
|------|------|
| `Game.java` | 게임 엔티티 |
| `GameController.java` | 게임 목록/조회 API |
| `GameRepository.java` | 게임 JPA 리포지토리 |
| `GameService.java` | 게임 비즈니스 로직 |

### 문제 (play/question)

| 파일 | 설명 |
|------|------|
| `Question.java` | 문제 엔티티 |
| `QuestionController.java` | 문제 목록/조회 API |
| `QuestionRepository.java` | 문제 JPA 리포지토리 |
| `QuestionService.java` | 문제 비즈니스 로직 |

### 플레이 기록 (play/record)

| 파일 | 설명 |
|------|------|
| `PlayRecord.java` | 플레이 기록 엔티티 |
| `PlayController.java` | 플레이 기록 저장/조회 API |
| `PlayRecordRepository.java` | 플레이 기록 JPA 리포지토리 |
| `PlayService.java` | 플레이 기록 비즈니스 로직 |

---

## 리소스 파일 (src/main/resources)

| 경로/파일 | 설명 |
|-----------|------|
| `application.yml` | 애플리케이션 설정 |
| `openapi.yaml` | OpenAPI 명세 |
| `db/migration/V1__init_tables.sql` | 초기 테이블 마이그레이션 |
| `db/migration/V2__add_skill_tables.sql` | 스킬 테이블 마이그레이션 |
| `db/migration/V3__add_indexes.sql` | 인덱스 마이그레이션 |
