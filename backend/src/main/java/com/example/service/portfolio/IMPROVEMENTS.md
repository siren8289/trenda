# Portfolio 도메인 개선 사항 (리뷰 반영)

코드·로직, **유지보수**, **기능 추가** 관점에서 적용할 개선 목록. (리뷰: 선우 장)

---

## 1. 계층 분리·DTO 반환

### 하위 Service는 DTO 반환
- **현상**: ProfileService가 User, PlayRecord, Portfolio, Roadmap 등 **Entity**를 받아 조합하는 구조. 하위 Service가 Entity를 반환함.
- **개선**: **각 Service는 DTO 반환**. ProfileService는 **DTO 조합만** 수행. Entity를 계층 경계에서 넘기지 않음.
- **효과**: Lazy Loading / N+1 문제 예방, 여러 도메인 개별 조회 시 연관관계가 API/트랜잭션 경계를 넘지 않음. 계층 간 의존성 역전 방지.

### Controller 반환 타입
- API는 **ProfileResponse** 등 응답 DTO만 반환. Service 내부 record/Entity 타입 노출 금지.

---

## 2. Repository·확장성

### Pageable 기반 조회
- **현상**: `findByUserId` 등 **List 전체 조회**는 데이터 증가 시 메모리·응답 지연 위험.
- **개선**: **Page<Portfolio> + Pageable** 도입. 목록 조회는 분할 조회로 통일.
- **기능 추가**: 정렬·필터 확장 시 Pageable 파라미터만 추가하면 됨.

### 메서드 네이밍 (Spring Data JPA)
- **현상**: `findPublicPortfoliosByUserId`처럼 “의도” 위주 이름은 **필드 기반 쿼리 파싱 규칙**과 맞지 않을 수 있음.
- **개선**: **findByUserIdAndPublicVisibleTrue** 등 **엔티티 필드명·연산자** 기준으로 변경. 공개 여부는 업무 규칙이지만 Repository는 “조회 의도”만 표현, 정책 판단은 Service에서.

---

## 3. Entity 설계

### Builder / AllArgsConstructor 제거
- **현상**: Entity에 @Builder, @AllArgsConstructor 사용 시 **아무 값으로나** 생성 가능. 도메인 무결성 약화.
- **개선**: **정적 팩토리 메서드(create 등)** 로만 생성. 필수값·정규화를 Entity 내부에서 강제.

### userId 설계
- **현상**: 현재는 `Long userId` 하나로만 보유자 식별.
- **개선**: 사용자 정보를 함께 가져올 때 **Join 쿼리**가 필요해지면, **@ManyToOne User** 등 연관관계로 재설계 검토. 지금은 숫자 하나로 두어도 됨.

---

## 4. 도메인 무결성·update

### update() 검증·정규화
- **현상**: `update(title, description, url, publicVisible)` 등에서 **파라미터를 그대로 대입**만 함. 필수값·형식 검증 없음.
- **개선**: **필수값 검증** 추가, **trim 등 정규화**를 update 경로에서도 일관되게 적용. null은 “변경 안 함” 등 도메인 규칙을 메서드 안에 명시.

---

## 5. 입력·응답 검증

### URL 형식 검증
- **현상**: url에 **길이·공백만** 검증하면 잘못된 형식 저장 가능.
- **개선**: **@URL** 또는 **@Pattern**으로 실제 URL 형식 검증 추가. (Request DTO 또는 Entity 생성 시)

### Response getter 일치
- **현상**: `PortfolioResponse.from(portfolio)`에서 **portfolio.isPublic()** 호출 시, Entity에 **isPublicVisible()**만 있으면 Getter 불일치.
- **개선**: Entity 필드명이 `publicVisible`이면 getter는 **getPublicVisible()** / **isPublicVisible()**. DTO 매핑 시 **동일한 getter 이름** 사용.

---

## 6. 정리 (체크리스트)

| 구분 | 개선 항목 |
|------|-----------|
| **계층/로직** | 하위 Service는 DTO 반환, ProfileService는 DTO 조합만, Controller는 ProfileResponse 등 DTO만 반환 |
| **유지보수** | Entity 생성은 정적 팩토리로 제어, update()에 검증·정규화, getter 네이밍 일치 |
| **기능 추가** | Repository에 Pageable, findByUserIdAndPublicVisibleTrue 등 필드 기반 네이밍으로 확장 용이 |
| **확장성** | 목록 조회 Pageable, userId 연관관계는 Join 필요 시 재설계 |
| **검증** | URL @URL/@Pattern, update 시 필수값·trim |

이 순서대로 반영하면 Portfolio 도메인의 계층 분리·유지보수성·확장성이 개선됨.

## 7. OpenAPI 2.0 정렬

- 기존 `/api/portfolio`, `/api/portfolio/{userId}` 엔드포인트는 스펙에서 **deprecated** 로 남기고, 새 구조 `/api/users/{id}/portfolio`, `/api/portfolio/{portfolioId}` 를 추가해 생성/조회/수정/삭제를 나누었습니다.
- 문서 상 요청/응답 스키마(`Portfolio`, `PortfolioCreateRequest`, `PortfolioUpdateRequest`)를 명시해, 실제 Controller/Service 및 DTO 설계와 API 계약이 같은 방향으로 유지되도록 했습니다.
