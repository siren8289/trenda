import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse } from './types/common';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Axios 인스턴스 생성
const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: 요청 전 토큰 추가 등
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: 응답 처리 및 에러 핸들링
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiResponse<null>>) => {
    // 401 Unauthorized: 토큰 만료 또는 인증 실패
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
      }
    }
    
    // 403 Forbidden: 권한 없음
    if (error.response?.status === 403) {
      console.error('Access denied');
    }
    
    // 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

export default client;

