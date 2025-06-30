import axios, { type InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from './tokenManager';
import { ApiError } from './apiError';
import type { ErrorResponse } from '@/_types/api';
import useAuthStore from '@/_store/useAuthStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터: 모든 요청에 accessToken 자동 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 모든 API 에러 일관화.
axiosInstance.interceptors.response.use(
  (response) => response.data, // 성공 시 response.data만 반환
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러가 발생했고, 아직 재시도하지 않았다면 토큰 갱신을 시도합니다.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 재시도 방지
      try {
        const newAccessToken = await tokenManager.refresh();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          // 원래 요청을 새 토큰으로 재시도
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(new ApiError(401, { message: '세션이 만료되었습니다. 다시 로그인해주세요.', code: 'SESSION_EXPIRED' }));
      }
    }
    
    // axios 에러 객체를 우리가 정의한 표준 ApiError 객체로 변환합니다.
    if (error.response) {
      const errorData: ErrorResponse = error.response.data || { message: '서버 응답 에러', code: 'SERVER_RESPONSE_ERROR' };
      return Promise.reject(new ApiError(error.response.status, errorData));
    }

    // 타임아웃 에러 처리
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new ApiError(408, { message: '요청 시간이 초과되었습니다.', code: 'TIMEOUT' }));
    }
    
    // 그 외 네트워크 에러 등
    return Promise.reject(error);
  }
);

export default axiosInstance;