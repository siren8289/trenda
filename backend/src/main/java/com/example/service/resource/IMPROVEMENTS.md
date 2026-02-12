# Resource 도메인 개선 사항 (리뷰 반영)

코드·로직, **유지보수**, **기능 추가** 관점에서 적용할 개선 목록. (리뷰: 선우 장)

---

## 1. API·계층

### Entity 그대로 반환 금지
- **현상**: Controller/Service가 `List<Resource>`, `Resource`를 그대로 반환.
- **개선**: 응답은 항상 **ResourceResponse** 등 DTO로 변환. Entity 노출 방지, API 스펙 명확화, 필드 변경 시 한 곳만 수정.
- **적용**: `getAllResources()`, `getResourcesByCategory()`, `addResource()` → `ResourceResponse` / `List<ResourceResponse>` 반환.

### 잘못된 입력 vs 데이터 없음 구분
- **현상**: `category`가 null/blank일 때 빈 리스트 반환 시, "조건 오류"와 "결과 없음"을 구분 못함.
- **개선**: **잘못된 입력** → 예외 처리 (예: 400 BAD_REQUEST), **의미 있는 에러 메시지** 반환. 유효한 조건으로 조회했을 때만 빈 리스트.
- **유지보수**: API 계약이 명확해져 클라이언트/디버깅이 쉬움.

---

## 2. 성능·조회 방식

### Pageable 기반 Pagination
- **현상**: `findAll()` 기반 전체 조회 → 데이터 증가 시 메모리·응답 지연 위험.
- **개선**: **Pageable 기반 분할 조회 필수**. `Page<ResourceResponse>` 반환, 대량 데이터는 반드시 페이징.
- **기능 추가**: 정렬·필터 확장 시 Pageable 파라미터만 추가하면 됨.

### Repository 반환 타입
- **현상**: `List<Resource>` 반환 시 데이터 증가에 따라 성능 문제.
- **개선**: 카테고리별 조회도 **Page<Resource> + Pageable** 구조로 변경, 분할 조회 적용.

---

## 3. 타입 안전성·도메인 정책

### category / type → Enum
- **현상**: `category`를 String으로 처리하면 오타·잘못된 값이 **런타임에만** 검출됨.
- **개선**: **Enum 타입으로 강제** → 컴파일 타임 안정성, 도메인 정책을 타입으로 보장.
- **적용**: Entity는 `@Enumerated`로 Enum 저장, Request/Response도 Enum 사용. API 문서에 허용 값 고정.
- **유지보수**: 허용 값 추가·변경 시 Enum 한 곳만 수정.

---

## 4. 정규화·단일 책임

### 정규화 로직 일원화
- **현상**: trim, uppercase 등 정규화가 Controller/Service/DTO에 흩어지면 유지보수 비용 증가.
- **개선**: **정규화 정책은 Entity.create() 내부에서 단일 책임**으로 처리. 저장 시점에 한 번만 정규화.
- **적용**: `Resource.create(title, url, category, description)` 안에서 trim, category 대문자 등 통일. Request는 필요 시 최소한만 전달.

### Repository 조회와 인덱스
- **현상**: `findByCategoryIgnoreCase` 사용 시 DB에서 함수 기반 비교 → 인덱스 미사용 가능성.
- **개선**: **저장 시 대문자(또는 소문자)로 정규화**하고, 조회는 **findByCategory()** 단순 비교로 인덱스 활용.

---

## 5. 보안·요청 DTO

### userId는 요청값으로 받지 않기
- **현상**: userId를 요청 바디/파라미터로 받으면 클라이언트가 다른 사용자 ID로 위조 가능.
- **개선**: **userId는 JWT/세션 등 인증 정보에서 추출**, Request DTO에서는 제거. 인증 기반 API라면 사용자 정보는 토큰 기반 처리.

### URL 검증
- **현상**: url에 길이·공백만 검증하면 잘못된 형식 저장 가능.
- **개선**: **@URL** 또는 정규식으로 실제 URL 형식 검증 추가.

---

## 6. 응답 DTO·API 스펙

### 내부 식별자 최소 노출
- **현상**: userId를 응답에 그대로 노출하면 내부 PK/식별자가 API 스펙에 과도하게 묶임.
- **개선**: **내부 PK/식별자는 최소 노출**. 인증 기반 API라면 사용자 정보는 토큰 기반으로 처리하고, 응답에는 꼭 필요한 필드만.

### type/category를 String이 아닌 Enum 또는 문서화
- **현상**: type/category를 String으로 노출하면 API 스펙이 모호해짐.
- **개선**: **Enum 그대로 노출**하거나, **API 문서에 허용 값 목록 명시**.

---

## 7. Entity·JPA

### equals / hashCode와 JPA 프록시
- **현상**: `instanceof` 기반 비교는 JPA 프록시 환경에서 문제 발생 가능.
- **개선**: **getClass() 비교 방식** 또는 **Hibernate 권장 equals 전략** 사용. 엔티티 동일성은 PK(id) 기준 유지.

### exists 메서드 역할
- **현상**: existsByCategory 등은 “사전 확인용”.
- **개선**: **동시성 환경에서 최종 보장은 DB 제약 조건**에 의존. exists는 **UX 개선용**, **무결성은 DB 레벨**에서 보장.

---

## 8. 정리 (체크리스트)

| 구분 | 개선 항목 |
|------|-----------|
| **코드/로직** | Entity → DTO 반환, 잘못된 입력 시 400 예외, category/type Enum, 정규화는 Entity.create()에 집중, equals/hashCode는 getClass() 또는 Hibernate 권장 |
| **유지보수** | 정규화 일원화, Enum으로 허용 값 한 곳 관리, API 스펙 명확화 |
| **기능 추가** | Pageable 페이징, 검색/필터 확장 시 Pageable·Enum 확장만으로 대응 |
| **성능** | findAll/카테고리 조회 페이징, 저장 시 정규화 후 단순 findByCategory로 인덱스 활용 |
| **보안** | userId는 인증에서 추출, URL 형식 검증, 내부 식별자 최소 노출 |

이 순서대로 반영하면 Resource 도메인의 품질·유지보수성·확장성이 개선됨.

## 9. OpenAPI 2.0 정렬

- OpenAPI 경로 `/api/resources`, `/api/resources/{id}`, `/api/resources/search`를 정의해 목록 조회/생성/수정/삭제/검색 흐름을 문서로 고정했습니다.
- 생성/수정 요청은 `ResourceCreateRequest`/`ResourceUpdateRequest` 스키마, 응답은 `Resource` 스키마 + 필요 시 `ApiResponse` 래퍼로 표현하여, 도메인 설계와 API 계약이 일관되게 유지되도록 했습니다.
