// src/_store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;

  refreshToken: string | null;
  loadRefreshToken: () => Promise<void>;
  setRefreshToken: (token: string) => Promise<void>;
  clearRefreshToken: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      setAccessToken: (token) => {
        set({ accessToken: token });
      },
      clearAccessToken: () => {
        set({ accessToken: null });
        localStorage.removeItem("accessToken");
      },

      refreshToken: null,
      loadRefreshToken: async () => {
        try {
          const token = await window.ipc.invoke("getStore", "refreshToken");
          set({ refreshToken: token ?? null });
        } catch (err) {
          console.error("refreshToken 불러오기 실패:", err);
        }
      },
      setRefreshToken: async (token: string) => {
        try {
          await window.ipc.invoke("setStore", {
            key: "refreshToken",
            value: token,
          });
          set({ refreshToken: token });
        } catch (err) {
          console.error("refreshToken 저장 실패:", err);
        }
      },
      clearRefreshToken: async () => {
        try {
          await window.ipc.invoke("setStore", {
            key: "refreshToken",
            value: null,
          });
          set({ refreshToken: null });
        } catch (err) {
          console.error("refreshToken 삭제 실패:", err);
        }
      },
    }),
    {
      name: "auth", // localStorage에 저장될 이름
      partialize: (state) => ({ accessToken: state.accessToken }), // refreshToken은 localStorage에 저장하지 않음
    }
  )
);

export default useAuthStore;
