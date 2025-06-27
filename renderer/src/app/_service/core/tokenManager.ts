import { STORAGE_KEYS } from "@shared/constants/storageKeys";

// 토큰 갱신 요청이 중복되는 것을 방지하기 위한 변수
let refreshRequest: Promise<string> | null = null;

export const tokenManager = {
  get: async (): Promise<string | null> => {
    // window.electronAPI가 존재할 때만 실행
    return window.electronAPI?.getStore<string>('') || null;
  },

  set: async (token: string | null): Promise<void> => {
    if (token) {
      await window.electronAPI?.setStore(STORAGE_KEYS.ACCESS_TOKEN, token);
    } else {
      await window.electronAPI?.deleteStore(STORAGE_KEYS.ACCESS_TOKEN);
    }
  },

  refresh: async (): Promise<string> => {
    try {
      // 실제 토큰 갱신 API 엔드포인트
      const REFRESH_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;
      
      console.log('토큰 갱신을 시도합니다...');
      refreshRequest = fetch(REFRESH_API_URL, { method: 'POST' })
        .then(res => res.json())
        .then(data => data.accessToken);

      const newAccessToken = await refreshRequest;

      if (!newAccessToken) {
        throw new Error('새로운 토큰 발급에 실패했습니다.');
      }

      await tokenManager.set(newAccessToken);
      console.log('토큰 갱신에 성공했습니다.');
      return newAccessToken;

    } catch (error) {
      // 갱신 실패 시 기존 토큰을 삭제하고 로그인 페이지로 유도할 수 있습니다.
      await tokenManager.set(null);
      console.error('토큰 갱신에 실패했습니다:', error);
      throw error;
    } finally {
      // 완료 후에는 항상 갱신 요청 상태를 초기화합니다.
      refreshRequest = null;
    }
  },
};