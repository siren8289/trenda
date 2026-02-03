/**
 * Spring Boot의 ApiResponse와 매칭되는 공통 응답 타입
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ErrorResponse | null;
  timestamp: string; // ISO 8601 format
}

/**
 * Spring Boot의 ErrorResponse와 매칭되는 에러 응답 타입
 */
export interface ErrorResponse {
  code: string;
  message: string;
}

