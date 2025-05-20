import { create } from "zustand";

interface SettingsState {
  isOpen: boolean;
  isDarkMode: boolean;
  activeTab: string;
  shareLink: string;
  linkValidity: string;

  open: () => void;
  close: () => void;
  toggle: () => void;
  setTab: (tab: string) => void;
  setLinkValidity: (validity: string) => void;
  copyLink: () => void;
  resetLink: () => void;
  generateNewLink: () => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  isOpen: false,
  isDarkMode: false, // 보통 다크모드는 별도 store로 빼기도 함
  activeTab: "공유",
  shareLink: "https://notray.app/share/abc123",
  linkValidity: "무제한",

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
  setTab: (tab) => set({ activeTab: tab }),
  setLinkValidity: (validity) => set({ linkValidity: validity }),

  copyLink: () => {
    const link = get().shareLink;
    navigator.clipboard.writeText(link);
    alert("링크가 복사되었습니다!");
  },

  resetLink: () => set({ linkValidity: "무제한" }),

  generateNewLink: () =>
    set({
      shareLink: `https://notray.app/share/${Math.random()
        .toString(36)
        .slice(2, 8)}`,
    }),
}));
