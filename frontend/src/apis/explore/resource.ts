import client from '../client';
import { ApiResponse } from '../types/common';
import { Resource } from '../types/domain';

/**
 * Resource API
 */
export const resourceApi = {
  /**
   * 모든 리소스 조회
   */
  findAll: async (): Promise<ApiResponse<Resource[]>> => {
    const response = await client.get<ApiResponse<Resource[]>>('/api/explore/resources');
    return response.data;
  },

  /**
   * 리소스 ID로 조회
   */
  findById: async (id: number): Promise<ApiResponse<Resource>> => {
    const response = await client.get<ApiResponse<Resource>>(`/api/explore/resources/${id}`);
    return response.data;
  },

  /**
   * 타입으로 리소스 조회
   */
  findByType: async (type: string): Promise<ApiResponse<Resource[]>> => {
    const response = await client.get<ApiResponse<Resource[]>>(
      `/api/explore/resources?type=${type}`
    );
    return response.data;
  },

  /**
   * 리소스 생성
   */
  create: async (resource: Omit<Resource, 'id'>): Promise<ApiResponse<Resource>> => {
    const response = await client.post<ApiResponse<Resource>>('/api/explore/resources', resource);
    return response.data;
  },

  /**
   * 리소스 업데이트
   */
  update: async (id: number, resource: Partial<Resource>): Promise<ApiResponse<Resource>> => {
    const response = await client.put<ApiResponse<Resource>>(
      `/api/explore/resources/${id}`,
      resource
    );
    return response.data;
  },

  /**
   * 리소스 삭제
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await client.delete<ApiResponse<void>>(`/api/explore/resources/${id}`);
    return response.data;
  },
};

