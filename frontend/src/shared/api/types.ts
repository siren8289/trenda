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

