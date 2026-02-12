# Question 도메인 설계/개선 정리

## 1. 계층 구조

- **Controller (`QuestionController`)**
  - `GET /api/questions` : 검색(키워드) + 페이징 조회 → `ApiResponse<Page<QuestionResponse>>`.
  - `GET /api/questions/{id}` : 단건 조회 → `ApiResponse<QuestionResponse>`.
  - `POST /api/questions` : 생성 → `201 CREATED + ApiResponse<QuestionResponse>`.
  - 역할: HTTP 요청/응답, 검증(@Valid)만 담당. 비즈니스 로직은 모두 Service 로 위임.

- **Service (`QuestionService`)**
  - 비즈니스 유스케이스 담당 (목록·검색·단건 조회·생성).
  - `Page<Question>` → `Page<QuestionResponse>` 매핑, Entity 직접 노출 금지.
  - 예외 상황에서 `CustomException` 사용해 HTTP 상태 코드까지 함께 관리.

- **Repository (`QuestionRepository`)**
  - `JpaRepository<Question, Long>` 기반 CRUD.
  - `findByTitleContainingIgnoreCase(String keyword, Pageable pageable)` 로 검색 의도를 메서드 이름에 드러냄.

- **DTO (`QuestionCreateRequest`, `QuestionResponse`)**
  - Request: 입력값 검증 + 간단한 정규화(공백 제거).
  - Response: Entity 구조와 분리된 API 응답 스펙 고정.

- **Entity (`Question`)**
  - DB `questions` 테이블과 매핑.
  - 생성/수정 규칙을 스스로 책임지는 도메인 모델.

## 2. Entity 설계 포인트 (`Question`)

- **정적 팩토리 `create(...)`**
  - 제목 필수값 검증 (`null/blank` 방지).
  - `title.trim()`, `content.trim()` 으로 정규화 후 저장.
  - 생성 경로를 한 곳으로 모아 무결성 유지.

- **update(...) 메서드**
  - `null` 파라미터는 \"변경 없음\" 으로 처리.
  - 제목이 들어오면 다시 한 번 `blank` 검증 + trim.
  - 내용도 trim 후 저장.

- **동등성(equals/hashCode)**
  - PK(`id`) 기준 비교.
  - JPA 엔티티 규칙(식별자 기반 동일성)에 맞게 구현.

## 3. DTO 설계 포인트

- **`QuestionCreateRequest`**
  - `@NotBlank @Size(max = 150)` 제목, `@Size(max = 5000)` 내용.
  - `normalizedTitle()`, `normalizedContent()` 로 정규화 로직을 DTO에 모아 Service 코드를 단순화.
  - [정보처리기사] 입력 데이터 검증·전달 역할에 충실한 DTO.

- **`QuestionResponse`**
  - `Question` 엔티티에서 필요한 필드만 뽑아서 응답.
  - Entity 변경(필드 추가/삭제)이 있어도 Response 스펙을 이 파일에서만 조정 가능.

## 4. Service 설계 포인트

- **검색 + 페이징**
  - `findAll(String keyword, Pageable pageable)` :
    - keyword 가 비어 있으면 `findAll(pageable)`,
    - 있으면 `findByTitleContainingIgnoreCase(keyword, pageable)` 호출.
  - 대량 데이터에서도 Page 객체로 나눠서 조회 → 성능·메모리 안정성 확보.

- **예외 처리**
  - 존재하지 않는 ID 조회 시 `CustomException("QUESTION_NOT_FOUND", "Question not found", HttpStatus.NOT_FOUND)` 사용.
  - GlobalExceptionHandler 와 연결되어 일관된 에러 응답 구조 유지.

- **트랜잭션**
  - 클래스 레벨 `@Transactional(readOnly = true)`.
  - 쓰기 작업(`create`)에는 메서드 레벨 `@Transactional` 로 readOnly 해제.

## 5. Controller 설계 포인트

- **책임 분리**
  - Request DTO 바인딩 + 검증, Response DTO 래핑(`ApiResponse`)만 담당.
  - 비즈니스 로직이나 Entity 직접 접근은 모두 Service/Entity 로 위임.

- **표현 계층 표준화**
  - 모든 응답을 `ApiResponse<T>` 로 감싸 API 응답 형식 통일.
  - 생성 API는 `ResponseEntity.status(HttpStatus.CREATED)` 를 사용해 HTTP 상태 코드 의미를 명확히 표현.

## 6. 요약

- [정보처리기사 관점]
  - 프레젠테이션 계층(Controller), 비즈니스 로직 계층(Service), 데이터 접근 계층(Repository), 도메인(Entity), DTO 가 명확히 분리된 **계층형 아키텍처**.
  - 응집도는 높이고, 결합도는 낮추는 구조.

- [실무/스프링 관점]
  - DTO 정규화, 정적 팩토리/도메인 메서드를 통한 Entity 보호,
  - Pageable 기반 조회, CustomException·GlobalExceptionHandler와 연계된 일관된 에러 처리 등
  - 유지보수·확장에 유리한 기본 템플릿으로 사용 가능.

## 7. OpenAPI 2.0 정렬

- OpenAPI 스펙에서 Question 관련 경로를 `/api/games/{id}/questions`, `/api/questions/{id}` 로 정의하고, 기존 `/api/play/questions*` 계열은 **DEPRECATED** 로 분리했습니다.
- 생성/수정 요청은 `QuestionCreateRequest`/`QuestionUpdateRequest`, 응답은 `ApiResponse` + `Question` 스키마를 따르도록 명시해, Question 도메인 코드와 API 문서가 동일한 리소스 모델을 공유하도록 했습니다.

