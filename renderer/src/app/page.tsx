"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import useThemeStore from "./_store/themeStore";
import "./globals.css";
import Start from "./_components/start/start";

export default function HomePage() {
  const { theme, setTheme } = useThemeStore();

  const handleToggle = async () => {
    const result = await window.ipc.invoke("dark-mode:toggle");
    setTheme(result === "dark" ? "dark" : "light");
  };

  return (
    <main style={{ height: "100%" }}>
      <Start />
    </main>
  );
}

{
  /* <div>
        <button onClick={handleToggle}>Toggle Dark Mode</button>
        <p>{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
      </div> */
}
