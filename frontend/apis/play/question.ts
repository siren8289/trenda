import client from '../client';
import { ApiResponse } from '../types/common';
import { Question } from '../types/domain';

/**
 * Question API
 */
export const questionApi = {
  /**
   * 게임 ID로 질문 목록 조회
   */
  findByGameId: async (gameId: number): Promise<ApiResponse<Question[]>> => {
    const response = await client.get<ApiResponse<Question[]>>(
      `/api/play/questions?gameId=${gameId}`
    );
    return response.data;
  },

  /**
   * 질문 ID로 조회
   */
  findById: async (id: number): Promise<ApiResponse<Question>> => {
    const response = await client.get<ApiResponse<Question>>(`/api/play/questions/${id}`);
    return response.data;
  },

  /**
   * 질문 생성
   */
  create: async (question: Omit<Question, 'id'>): Promise<ApiResponse<Question>> => {
    const response = await client.post<ApiResponse<Question>>('/api/play/questions', question);
    return response.data;
  },

  /**
   * 질문 업데이트
   */
  update: async (id: number, question: Partial<Question>): Promise<ApiResponse<Question>> => {
    const response = await client.put<ApiResponse<Question>>(
      `/api/play/questions/${id}`,
      question
    );
    return response.data;
  },

  /**
   * 질문 삭제
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await client.delete<ApiResponse<void>>(`/api/play/questions/${id}`);
    return response.data;
  },
};

