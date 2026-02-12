# Common 모듈 개선 사항

## 1. 예외·응답 표준화

- **CustomException**
  - 기존: `message + HttpStatus` 만 보유.
  - 변경: `code + message + HttpStatus` 구조로 확장, 원인 추적용 `cause` 포함 생성자 추가.
  - 효과: 도메인별 에러 코드를 구분해 로그/클라이언트 처리에 활용 가능.

- **ErrorResponse**
  - 필드: `code`, `message`, `status`, `timestamp`.
  - `ErrorResponse.of(code, message, status)` 정적 팩토리에서 `Instant.now()` 를 직접 생성해, 핸들러마다 `Instant.now()` 를 반복 호출하지 않도록 책임을 한 곳으로 집중.

- **ApiResponse**
  - 구조: `success`, `data`, `error`, `timestamp`.
  - HTTP 상태 코드는 `ResponseEntity` 가 담당하고, `ApiResponse` 는 **Body 구조만 담당**하도록 역할을 명확히 분리.

- **GlobalExceptionHandler**
  - `CustomException` → `ErrorResponse.of(e.getCode(), e.getMessage(), e.getStatus().value())`.
  - `MethodArgumentNotValidException` 전용 핸들러 추가 (`VALIDATION_ERROR`, 400).
  - 최종 방어선으로 `Exception` 핸들러에서 `INTERNAL_SERVER_ERROR`, 500 응답.

## 2. JPA / Config

- **JpaConfig**
  - `@EnableJpaAuditing` 설정을 별도 설정 클래스로 분리해, 생성일/수정일 자동 관리에 대비.
  - AuditorAware 구현은 추후 필요 시 확장 가능.

- **DatasourceDebug**
  - 프로파일: `local`, `dev` 에서만 동작하도록 제한.
  - 기존: `System.out.println` 으로 전체 URL 출력 → 비밀번호 등 민감 정보 노출 가능.
  - 변경: `@Slf4j` 로그 사용, URL 전체 대신 **일부만 마스킹해 출력**.

- **WebConfig (CORS)**
  - 프로파일: `local`, `dev` 전용 설정으로 변경.
  - 기존: `*` 와일드카드 Origin 허용.
  - 변경: `http://localhost:3000` 만 허용 (로컬 개발용), 메서드/헤더도 필요한 것만 허용.
  - 운영 환경에서는 `application.yml` 등 외부 설정으로 Origin 을 관리할 수 있도록 분리하는 것을 가정.

## 3. 정리

- 공통 모듈에서 **예외·응답·설정**을 정리해 두어,
  - 도메인 서비스에서는 `CustomException` 만 던지면 되고,
  - 컨트롤러 단에서는 `ApiResponse` 를 일관된 포맷으로 사용 가능.
- Datasource/CORS 설정은 프로파일과 마스킹을 통해 **보안·환경 분리**를 의식한 구조로 개선.

## 4. OpenAPI 2.0 정렬

- OpenAPI `openapi.yaml` 상단에 `tags`, `components.schemas.ApiResponse / ErrorResponse` 를 정의해, 공통 응답 래퍼와 에러 포맷을 문서 레벨에서 표준화했습니다.
- 각 엔드포인트의 responses 가 `ApiResponse` / `ErrorResponse` 를 참조하도록 정리되어, GlobalExceptionHandler·CustomException·ApiResponse 설계와 스펙이 같은 규칙을 공유합니다.

