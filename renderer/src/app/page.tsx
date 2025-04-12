"use client";
import useAuthStore from "./_store/useAuthStore";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import useThemeStore from "./_store/themeStore";
import "./globals.css";
import Start from "./(route)/start/page";
import { useRouter } from "next/navigation";
interface keyvalue {
  key: string;
  value: any;
}
export default function HomePage() {
  const router = useRouter();
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    loadRefreshToken,
  } = useAuthStore();
  useEffect(() => {
    loadRefreshToken();
    if (refreshToken) {
      return router.push("/main");
    }
    router.push("/start");
  }, [refreshToken]);
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
