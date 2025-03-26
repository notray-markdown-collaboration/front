"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import useThemeStore from "./store/themeStore";
import "./globals.css";

export default function HomePage() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    window.ipc.invoke("dark-mode:current").then((sysTheme) => {
      setTheme(sysTheme === "dark" ? "dark" : "light");
    });

    window.ipc.onDarkModeChanged((t: string) => {
      setTheme(t === "dark" ? "dark" : "light");
    });
  }, [setTheme]);

  const handleToggle = async () => {
    const result = await window.ipc.invoke("dark-mode:toggle");
    setTheme(result === "dark" ? "dark" : "light");
  };

  return (
    <main>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ - <Link href="/next">Go to next page</Link>
        </p>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width={256}
          height={256}
        />
      </div>
      <div>
        <button onClick={handleToggle}>Toggle Dark Mode</button>
        <p>{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
      </div>
    </main>
  );
}
