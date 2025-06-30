import useAuthStore from "@/_store/useAuthStore";
import { STORAGE_KEYS } from "@shared/constants/storageKeys";

// 토큰 갱신 요청이 중복되는 것을 방지하기 위한 변수
let refreshRequest: Promise<string> | null = null;

export const tokenManager = {
  getRefreshToken: async (): Promise<string | null> => {
    return window.electronAPI?.getStore<string>(STORAGE_KEYS.REFRESH_TOKEN) || null;
  },

  setRefreshToken: async (token: string): Promise<void> => {
    await window.electronAPI?.setStore(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  deleteRefreshToken: async (): Promise<void> => {
    await window.electronAPI?.deleteStore(STORAGE_KEYS.REFRESH_TOKEN);
  },

  refresh: async (): Promise<string> => {
    if (refreshRequest) {
      return refreshRequest;
    }

    try {
      // 1. 저장된 Refresh Token 조회
      const refreshToken = await tokenManager.getRefreshToken();

      console.log(refreshToken)
      if (!refreshToken) {
        throw new Error('Refresh Token이 존재하지 않습니다.');
      }

      const REFRESH_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;
      
      // 2. 토큰 갱신 API 호출
      console.log('토큰 갱신을 시도합니다...');
      refreshRequest = fetch(REFRESH_API_URL, {
        method: 'POST', // POST 메소드 명시
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }), 
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('토큰 갱신 API 요청 실패');
          }
          return res.json();
        })
        .then(data => data.accessToken);

      const newAccessToken = await refreshRequest;

      if (!newAccessToken) {
        throw new Error('새로운 토큰 발급에 실패했습니다.');
      }

      // 3. 새로운 Access Token 저장 및 반환
      useAuthStore.getState().setAccessToken(newAccessToken);
      console.log('토큰 갱신에 성공했습니다.');
      return newAccessToken;

    } catch (error) {
      // 갱신 실패 시 기존 토큰 삭제
      await tokenManager.deleteRefreshToken();
      console.error('토큰 갱신에 실패했습니다:', error);
      throw error;
    } finally {
      refreshRequest = null;
    }
  },
};