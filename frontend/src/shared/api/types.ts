export interface ErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ErrorResponse | null;
  timestamp: string;
}

export interface User {
  id: number;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface Roadmap {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface Portfolio {
  id: number;
  userId: number;
  title: string;
  summary: string;
  createdAt: string;
}

export interface PlayRecord {
  id: number;
  userId: number;
  gameId: number;
  score: number;
  playedAt: string;
}


