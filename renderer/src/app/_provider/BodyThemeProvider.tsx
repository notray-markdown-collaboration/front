"use client";

import { useEffect } from "react";
import useThemeStore from "../_store/themeStore";

export default function BodyThemeProvider() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    window.ipc.invoke("dark-mode:current").then((sysTheme) => {
      setTheme(sysTheme === "dark" ? "dark" : "light");
    });

    window.ipc.onDarkModeChanged((t: string) => {
      setTheme(t === "dark" ? "dark" : "light");
    });
  }, [setTheme]);
  useEffect(() => {
    console.log(theme);
    document.body.className = theme;
    document.documentElement.setAttribute('theme-data', theme)
  }, [theme]);

  return null;
}
