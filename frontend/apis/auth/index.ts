import client from '../client';
import { ApiResponse } from '../types/common';
import { LoginRequest, SignupRequest, User } from '../types/domain';

/**
 * 인증 관련 API
 */
export const authApi = {
  /**
   * 로그인
   */
  login: async (request: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await client.post<ApiResponse<{ user: User; token: string }>>(
      '/api/auth/login',
      request
    );
    return response.data;
  },

  /**
   * 회원가입
   */
  signup: async (request: SignupRequest): Promise<ApiResponse<User>> => {
    const response = await client.post<ApiResponse<User>>('/api/auth/signup', request);
    return response.data;
  },

  /**
   * 로그아웃
   */
  logout: async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  /**
   * 현재 사용자 정보 조회
   */
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await client.get<ApiResponse<User>>('/api/auth/me');
    return response.data;
  },
};

