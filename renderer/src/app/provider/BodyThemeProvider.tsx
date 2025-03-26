// renderer/src/components/BodyThemeProvider.tsx
"use client";

import { useEffect } from "react";
import useThemeStore from "../store/themeStore";

export default function BodyThemeProvider() {
  const { theme } = useThemeStore();

  useEffect(() => {
    console.log(theme);
    document.body.className = theme;
  }, [theme]);

  return null;
}
