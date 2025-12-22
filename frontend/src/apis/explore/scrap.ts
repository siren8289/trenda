import client from '../client';
import { ApiResponse } from '../types/common';
import { Scrap, ScrapCreateRequest } from '../types/domain';

/**
 * Scrap API
 */
export const scrapApi = {
  /**
   * 사용자 ID로 스크랩 목록 조회
   */
  findByUserId: async (userId: number): Promise<ApiResponse<Scrap[]>> => {
    const response = await client.get<ApiResponse<Scrap[]>>(
      `/api/explore/scraps?userId=${userId}`
    );
    return response.data;
  },

  /**
   * 스크랩 ID로 조회
   */
  findById: async (id: number): Promise<ApiResponse<Scrap>> => {
    const response = await client.get<ApiResponse<Scrap>>(`/api/explore/scraps/${id}`);
    return response.data;
  },

  /**
   * 스크랩 생성
   */
  create: async (request: ScrapCreateRequest): Promise<ApiResponse<Scrap>> => {
    const response = await client.post<ApiResponse<Scrap>>('/api/explore/scraps', request);
    return response.data;
  },

  /**
   * 스크랩 업데이트 (노트 수정)
   */
  update: async (id: number, note: string): Promise<ApiResponse<Scrap>> => {
    const response = await client.put<ApiResponse<Scrap>>(`/api/explore/scraps/${id}`, { note });
    return response.data;
  },

  /**
   * 스크랩 삭제
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await client.delete<ApiResponse<void>>(`/api/explore/scraps/${id}`);
    return response.data;
  },
};

