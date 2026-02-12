# User 도메인 개선 사항

코드 품질, 로직 명확화, **유지보수**, **기능 추가**에 초점을 둔 개선 내용 정리.

---

## 1. 코드·로직

### 계층 분리
- **Controller**: HTTP·검증만. `ApiResponse` / `ResponseEntity`로 응답 형식 통일.
- **Service**: 비즈니스 규칙·트랜잭션. Repository만 사용, 도메인 규칙은 Entity에 위임.
- **Repository**: 조회/저장만. `findByEmail`은 이미 소문자로 저장된 값 전제로 단순화(인덱스 활용).

### Entity 노출 방지
- API는 **UserResponse**만 반환. Entity 필드 추가/변경 시 API 스펙을 DTO에서만 관리 가능.
- 다른 서비스 연동: **getById(Long)** → UserResponse, **getUserEntity(Long)** → User(내부 연관관계용). 용도가 나뉘어 있어 오용을 줄임.

### 정규화 일원화
- 이메일: `UserCreateRequest.normalizedEmail()`, `UserSearchRequest.normalizedEmail()`에서 trim + toLowerCase. 검색/생성 모두 같은 규칙.
- displayName: `UserCreateRequest.normalizedDisplayName()`, `UserUpdateRequest.normalizedDisplayName()`에서 trim. 정규화가 DTO에 모여 있어 **한 곳만 수정하면 됨**.

### 예외·동시성
- 이메일 중복: DB `uk_users_email` + `DataIntegrityViolationException` → `CustomException("Email already exists", CONFLICT)`. DB 제약과 예외 처리로 동시 가입 시에도 안전.
- 미존재: `CustomException("User not found", NOT_FOUND)`. HTTP 상태와 메시지 일관.

---

## 2. 유지보수

### Request/Response 분리
- **생성**: UserCreateRequest (email, displayName + 정규화 메서드).
- **검색**: UserSearchRequest (email 등 + normalizedEmail). 조건 추가 시 DTO만 확장하면 됨.
- **수정**: UserUpdateRequest (displayName 등). 수정 가능 필드만 노출.
- **응답**: UserResponse (id, email, displayName, createdAt). API 스펙이 한 DTO에 고정.

→ 역할별로 DTO가 나뉘어 있어, “검색 조건 바뀜 / 수정 필드 추가됨” 같은 변경 시 **영향 범위가 작음**.

### Entity 생성/변경 제어
- `User.create(...)` 정적 팩토리로만 생성. 빈 값 검증·정규화를 Entity 진입 전에 강제.
- `changeDisplayName(...)`으로 표시이름만 변경. 무분별한 setter 없음 → **도메인 규칙 위반 가능성 감소**.

### Repository 단순화
- `findByEmail(String)`만 사용. 소문자 저장 전제이므로 IgnoreCase 제거로 쿼리·인덱스 단순.  
  정규화 정책이 바뀌면 **DTO 정규화 메서드 + 저장 로직**만 맞추면 됨.

---

## 3. 기능 추가·확장

### 페이징
- `findAll(Pageable)` → `Page<UserResponse>`. 목록이 커져도 Full Table Scan 방지, 이후 정렬/필터 추가 시 Pageable만 활용하면 됨.

### 검색
- `UserSearchRequest`로 검색 조건 수집. 이메일 외 조건(displayName 등) 추가 시 DTO 필드 + Repository 메서드만 확장하면 됨.

### 다른 도메인 연동
- **getById(Long)**: 프로필·대시보드 등에서 “사용자 정보만 필요할 때” UserResponse로 조회.
- **getUserEntity(Long)**: PlayRecord·Skill 등에서 User 연관관계가 필요할 때만 사용.  
  → 조회 목적에 따라 메서드를 나눠 두어 **기능 추가 시 호출부가 명확**함.

### 수정 API 확장
- `UserUpdateRequest`에 필드 추가하면 PATCH/PUT 핸들러에서 동일한 패턴으로 확장 가능.
- Service에서는 `getUserEntity(id)` 후 `user.changeDisplayName(request.normalizedDisplayName())` 등 **Entity 도메인 메서드만 호출**하도록 유지하면 됨.

---

## 4. 정리

| 관점 | 개선 포인트 |
|------|-------------|
| **코드** | 계층 분리, DTO 일원화, 정규화·예외 처리 명확화 |
| **로직** | Entity는 생성/변경 메서드로만 제어, Repository는 조회/존재 여부만 |
| **유지보수** | Request/Response 역할 분리, 정규화·검색 조건을 DTO에 집중 |
| **기능 추가** | Pageable·검색 DTO·getById/getUserEntity 분리로 확장 포인트 명확, 수정용 DTO 준비 |

이 구조를 유지하면 “검색 조건 추가”, “수정 필드 추가”, “다른 도메인에서 사용자 정보 사용” 같은 변경이 **한 계층·한 DTO 단위**로 들어가기 쉬움.

## 5. OpenAPI 2.0 정렬

- OpenAPI `openapi.yaml` 에서 `/api/users`, `/api/users/{id}`, `/api/users/search` 등 User 관련 엔드포인트를 **현재 Controller/Service 구조에 맞게 정의**했습니다.
- 목록 조회는 `Get all users (list / search)` 로, 생성/조회/수정/삭제는 각각 201/200/204 상태 코드와 `ApiResponse`/`ErrorResponse` 스키마로 명시해 **문서상 계약과 실제 구현이 일치**하도록 맞췄습니다.
