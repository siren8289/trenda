import client from '../client';
import { ApiResponse } from '../types/common';
import { ProfileView } from '../types/domain';

/**
 * Profile API (통합 조회 영역)
 */
export const profileApi = {
  /**
   * 사용자 프로필 조회 (사용자 정보 + 플레이 기록 + 포트폴리오 + 로드맵)
   */
  getProfile: async (userId: number): Promise<ApiResponse<ProfileView>> => {
    const response = await client.get<ApiResponse<ProfileView>>(`/api/profile/${userId}`);
    return response.data;
  },
};

