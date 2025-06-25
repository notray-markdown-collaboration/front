import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  initializeTheme: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  setThemeFromSystem: (theme: Theme) => void;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light', // 초기 기본값 설정

  initializeTheme: async () => {
    try {
      const initialTheme = await window.ipc.invoke("dark-mode:current");
      set({ theme: initialTheme === "dark" ? "dark" : "light" });
    } catch (error) {
      console.error("Failed to initialize theme from Electron:", error);
    }
  },

  toggleTheme: async () => {
    try {
      const result = await window.ipc.invoke("dark-mode:toggle");
      set({ theme: result === "dark" ? "dark" : "light" });
    } catch (error) {
      console.error("Failed to toggle theme via Electron:", error);
    }
  },

  setThemeFromSystem: (theme) => {
    set({ theme });
  },
}));

export default useThemeStore;