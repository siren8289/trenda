import client from '../client';
import { ApiResponse } from '../types/common';
import { Game } from '../types/domain';

/**
 * Game API
 */
export const gameApi = {
  /**
   * 모든 게임 조회
   */
  findAll: async (): Promise<ApiResponse<Game[]>> => {
    const response = await client.get<ApiResponse<Game[]>>('/api/play/games');
    return response.data;
  },

  /**
   * 게임 ID로 조회
   */
  findById: async (id: number): Promise<ApiResponse<Game>> => {
    const response = await client.get<ApiResponse<Game>>(`/api/play/games/${id}`);
    return response.data;
  },

  /**
   * 게임 생성
   */
  create: async (game: Omit<Game, 'id'>): Promise<ApiResponse<Game>> => {
    const response = await client.post<ApiResponse<Game>>('/api/play/games', game);
    return response.data;
  },

  /**
   * 게임 업데이트
   */
  update: async (id: number, game: Partial<Game>): Promise<ApiResponse<Game>> => {
    const response = await client.put<ApiResponse<Game>>(`/api/play/games/${id}`, game);
    return response.data;
  },

  /**
   * 게임 삭제
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await client.delete<ApiResponse<void>>(`/api/play/games/${id}`);
    return response.data;
  },
};

