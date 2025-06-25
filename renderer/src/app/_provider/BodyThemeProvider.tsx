"use client"; 
import useThemeStore from 'app/_store/themeStore';
import { useEffect } from 'react';

interface ThemeClientProviderProps {
  children: React.ReactNode;
}

export default function ThemeClientProvider({ children }: ThemeClientProviderProps) {
  const { theme, initializeTheme, setThemeFromSystem } = useThemeStore();

  useEffect(() => {
    initializeTheme();

    const unsubscribe = () => { /* no-op for now */ }; // Clean up function placeholder
    if (window.ipc && typeof window.ipc.onDarkModeChanged === 'function') {
      window.ipc.onDarkModeChanged((sysTheme: string) => {
        setThemeFromSystem(sysTheme === "dark" ? "dark" : "light");
      });
    } else {
      console.warn("window.ipc or window.ipc.onDarkModeChanged is not available. System theme changes may not be detected.");
    }

    return () => {
      unsubscribe(); 
    };
  }, [initializeTheme, setThemeFromSystem]); // initializeTheme와 setThemeFromSystem은 안정적인 참조이므로 의존성 배열에 추가

  useEffect(() => {
    document.body.className = theme;
    document.documentElement.setAttribute('theme-data', theme);
  }, [theme]);

  return (
    <>
      {children}
    </>
  );
}