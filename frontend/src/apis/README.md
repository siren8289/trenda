# API 모듈

백엔드 Spring Boot API와 통신하기 위한 프론트엔드 API 클라이언트 모듈입니다.

## 구조

```
src/apis
├── client.ts              # Axios 인스턴스 설정 (Interceptors)
├── types                  # 공통 API 응답/에러 타입
│   ├── common.ts         # ApiResponse, ErrorResponse 정의
│   └── domain.ts         # 각 도메인별 Interface
├── auth                   # 인증 관련
│   └── index.ts
├── user                   # User 도메인
│   └── index.ts
├── play                   # Play 영역
│   ├── game.ts
│   ├── question.ts
│   └── record.ts
├── build                  # 결과 생성 영역
│   ├── roadmap.ts
│   ├── portfolio.ts
│   └── skill.ts
├── explore                # 외부 리소스
│   ├── resource.ts
│   └── scrap.ts
└── profile                # 통합 조회 영역
    └── index.ts
```

## 사용법

### 1. 기본 사용

```typescript
import { authApi, userApi, gameApi } from '@/apis';

// 로그인
const loginResponse = await authApi.login({
  email: 'user@example.com',
  password: 'password123'
});

if (loginResponse.success && loginResponse.data) {
  const { user, token } = loginResponse.data;
  localStorage.setItem('token', token);
}

// 사용자 조회
const userResponse = await userApi.findById(1);
if (userResponse.success && userResponse.data) {
  console.log(userResponse.data);
}

// 게임 목록 조회
const gamesResponse = await gameApi.findAll();
if (gamesResponse.success && gamesResponse.data) {
  console.log(gamesResponse.data);
}
```

### 2. 에러 처리

```typescript
import { authApi, ApiResponse } from '@/apis';

try {
  const response: ApiResponse<User> = await authApi.login({
    email: 'user@example.com',
    password: 'wrong'
  });
  
  if (!response.success && response.error) {
    console.error('Error:', response.error.code, response.error.message);
  }
} catch (error) {
  console.error('Network error:', error);
}
```

### 3. 환경 변수 설정

`.env.local` 파일에 API URL을 설정하세요:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## API 모듈 목록

- **authApi**: 로그인, 회원가입, 로그아웃, 현재 사용자 조회
- **userApi**: 사용자 CRUD
- **gameApi**: 게임 CRUD
- **questionApi**: 질문 CRUD
- **recordApi**: 플레이 기록 CRUD
- **roadmapApi**: 로드맵 CRUD
- **portfolioApi**: 포트폴리오 CRUD
- **skillApi**: 스킬 태그 및 사용자 점수 관리
- **resourceApi**: 리소스 CRUD
- **scrapApi**: 스크랩 CRUD
- **profileApi**: 통합 프로필 조회

## 인증

`client.ts`의 인터셉터가 자동으로:
- 요청 시 `localStorage`에서 토큰을 읽어 `Authorization` 헤더에 추가
- 401 응답 시 토큰 제거 및 로그인 페이지로 리다이렉트

## 타입 안정성

모든 API 함수는 TypeScript 타입을 지원하며, 백엔드의 `ApiResponse<T>` 구조와 완벽히 매칭됩니다.

