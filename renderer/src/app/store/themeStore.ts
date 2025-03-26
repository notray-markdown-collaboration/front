// renderer/src/store/themeStore.ts
import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  setTheme: (theme) => {
    set({ theme })
  },
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light'
      return { theme: next }
    }),
}))

export default useThemeStore
