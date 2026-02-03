/**
 * API 모듈 통합 export
 */

// Client
export { default as apiClient } from './client';

// Types
export * from './types/common';
export * from './types/domain';

// Auth
export { authApi } from './auth';

// User
export { userApi } from './user';

// Play
export { gameApi } from './play/game';
export { questionApi } from './play/question';
export { recordApi } from './play/record';

// Build
export { roadmapApi } from './build/roadmap';
export { portfolioApi } from './build/portfolio';
export { skillApi } from './build/skill';

// Explore
export { resourceApi } from './explore/resource';
export { scrapApi } from './explore/scrap';

// Profile
export { profileApi } from './profile';

