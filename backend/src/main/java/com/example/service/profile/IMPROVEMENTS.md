# Profile 도메인 개선 사항

## 1. 계층 분리
- **Controller**: HTTP 요청/응답만 담당. `ApiResponse<ProfileResponse>`로 일관된 응답 형식.
- **Service**: 프로필 조회 유스케이스 오케스트레이션. User/PlayRecord/Portfolio/Roadmap 각 서비스에 위임, Repository 직접 접근 없음.
- **Repository**: Profile 엔티티에 대한 데이터 접근만. `JpaRepository` 기반, `findByUserId`, `existsByUserId` 제공.

## 2. Entity vs DTO
- **Entity 노출 방지**: API는 `ProfileResponse`(UserResponse + PlayRecordResponse 등)만 반환. Entity를 그대로 노출하지 않음.
- **Profile 엔티티**: DB `profiles` 테이블 매핑. `create(userId)`, `updateProfile(nickname, bio, imageUrl)` 등 도메인 메서드로 생성/변경 제어.

## 3. 주석 정리
- 긴 블록 주석 대신 한 줄 또는 짧은 설명으로 통일.
- 패키지/역할/핵심 원칙만 남기고 가독성 향상.

## 4. REST·일관성
- `GET /api/profile/{userId}` 명사 기반 리소스.
- 다른 API와 동일하게 `ApiResponse` 래퍼 사용.

## 5. 구조 정리
- **ProfileResponse.from(...)**: 여러 도메인 조회 결과를 한 DTO로 조합. 변환 책임을 DTO에 두어 Service는 조회·조합만 담당.
- **ProfileView 제거**: 내부 record 대신 `ProfileResponse` 하나로 통일.

## 6. Profile 테이블 준비
- 기존 플레이스홀더에서 **실제 JPA Entity**로 전환. `userId` unique, `nickname`/`bio`/`imageUrl` 필드.
- 프로필 전용 데이터(닉네임, 소개, 이미지) 확장 시 이 엔티티와 Repository 활용 가능.
