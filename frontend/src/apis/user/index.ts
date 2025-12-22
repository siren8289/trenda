import client from '../client';
import { ApiResponse } from '../types/common';
import { User } from '../types/domain';

/**
 * User 도메인 API
 */
export const userApi = {
  /**
   * 모든 사용자 조회
   */
  findAll: async (): Promise<ApiResponse<User[]>> => {
    const response = await client.get<ApiResponse<User[]>>('/api/users');
    return response.data;
  },

  /**
   * 사용자 ID로 조회
   */
  findById: async (id: number): Promise<ApiResponse<User>> => {
    const response = await client.get<ApiResponse<User>>(`/api/users/${id}`);
    return response.data;
  },

  /**
   * 사용자 생성
   */
  create: async (user: Omit<User, 'id' | 'createdAt'>): Promise<ApiResponse<User>> => {
    const response = await client.post<ApiResponse<User>>('/api/users', user);
    return response.data;
  },

  /**
   * 사용자 업데이트
   */
  update: async (id: number, user: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await client.put<ApiResponse<User>>(`/api/users/${id}`, user);
    return response.data;
  },

  /**
   * 사용자 삭제
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await client.delete<ApiResponse<void>>(`/api/users/${id}`);
    return response.data;
  },
};

