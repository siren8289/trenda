# Game 도메인 개선 사항

## 1. 계층 분리

- **Controller (`GameController`)**
  - `GET /api/play/games` → `ApiResponse<Page<GameResponse>>`
  - `POST /api/play/games` → `ApiResponse<GameResponse>`
  - 역할: HTTP 요청/응답만 담당. Service 가 DTO를 반환하도록 위임해, Controller에서 Entity/매핑 로직을 제거.

- **Service (`GameService`)**
  - `findAll(Pageable)`:
    - `Page<Game>` → `Page<GameResponse>` 로 매핑.
    - Pageable 기반 목록 조회로 대량 데이터에도 안전.
  - `create(GameCreateRequest)`:
    - `Game.create(...)` 로 엔티티 생성 규칙을 위임.
    - 저장 후 `GameResponse.from(...)` 으로 응답 DTO 생성.

- **Repository (`GameRepository`)**
  - `JpaRepository<Game, Long>` 상속, 기본 CRUD만 담당.

## 2. Entity 설계·도메인 규칙

- **정적 팩토리 `Game.create(...)`**
  - 제목 필수값 검증 (`null/blank` 방지).
  - 제목·설명에 `trim()` 정규화 적용.
  - 생성 경로를 한 곳으로 모아 무결성 유지.

- **update 메서드**
  - `null` 은 \"변경 없음\" 으로 처리.
  - 제목이 들어오면 다시 한 번 `blank` 검증 + trim 후 반영.
  - 설명도 trim 후 저장.

- **Lombok 정리**
  - `@Setter`, `@AllArgsConstructor`, `@Builder` 제거.
  - 엔티티는 외부에서 임의로 변경/생성할 수 없고, 도메인 메서드만 통해 상태 변경.

## 3. DTO 설계

- **`GameCreateRequest`**
  - `@NotBlank @Size(max = 100) title`, `@Size(max = 500) description`.
  - `normalizedTitle()`, `normalizedDescription()` 으로 공백 제거 로직을 DTO에 모아 Service 코드 단순화.

- **`GameResponse`**
  - Entity 를 직접 반환하지 않고, 응답 스펙(id/title/description)만 표현.
  - `GameResponse.from(Game)` 에서 변환 책임을 가지도록 해 매핑 로직 중복 제거.

## 4. 예외 처리·REST 규격

- `findById(Long id)`:
  - 기존 `IllegalArgumentException` → `CustomException("Game not found", HttpStatus.NOT_FOUND)` 로 변경.
  - REST 응답 코드(404)와 메시지를 명확하게 맞춤.

## 5. 정리

- Controller는 **입출력과 간단한 흐름 제어**만 담당.
- Service는 **비즈니스 유스케이스 + DTO 반환**을 담당.
- Entity는 **생성·수정 시 규칙/정규화**를 책임.
- DTO는 **검증·매핑**에 집중.

이 구조를 유지하면:
- 게임 목록에 필터/정렬을 추가할 때 Pageable 확장만으로 대응 가능하고,
- 게임 스펙 변경(필드 추가/삭제) 시 GameResponse/GameCreateRequest 중심으로 수정하여 영향 범위를 최소화할 수 있다.

## 6. OpenAPI 2.0 정렬

- OpenAPI 에서 `/api/play/games` 를 **deprecated** 경로로 남기고, 새 엔드포인트 `/api/games`, `/api/games/{id}` 를 정의해 게임 조회/생성/수정/삭제 흐름을 정리했습니다.
- 생성/수정 요청은 `GameCreateRequest`/`GameUpdateRequest`, 응답은 `ApiResponse` 래퍼 + Game 관련 스키마를 사용하도록 명세하여, 실제 Game 도메인 코드와 API 문서가 같은 계약을 바라보도록 했습니다.

