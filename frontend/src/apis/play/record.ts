import client from '../client';
import { ApiResponse } from '../types/common';
import { PlayRecord, PlayRecordRequest } from '../types/domain';

/**
 * PlayRecord API
 */
export const recordApi = {
  /**
   * 사용자 ID로 플레이 기록 조회
   */
  findByUserId: async (userId: number): Promise<ApiResponse<PlayRecord[]>> => {
    const response = await client.get<ApiResponse<PlayRecord[]>>(
      `/api/play/records?userId=${userId}`
    );
    return response.data;
  },

  /**
   * 게임 ID로 플레이 기록 조회
   */
  findByGameId: async (gameId: number): Promise<ApiResponse<PlayRecord[]>> => {
    const response = await client.get<ApiResponse<PlayRecord[]>>(
      `/api/play/records?gameId=${gameId}`
    );
    return response.data;
  },

  /**
   * 플레이 기록 ID로 조회
   */
  findById: async (id: number): Promise<ApiResponse<PlayRecord>> => {
    const response = await client.get<ApiResponse<PlayRecord>>(`/api/play/records/${id}`);
    return response.data;
  },

  /**
   * 플레이 기록 생성
   */
  create: async (request: PlayRecordRequest): Promise<ApiResponse<PlayRecord>> => {
    const response = await client.post<ApiResponse<PlayRecord>>('/api/play/records', request);
    return response.data;
  },

  /**
   * 플레이 기록 삭제
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await client.delete<ApiResponse<void>>(`/api/play/records/${id}`);
    return response.data;
  },
};

