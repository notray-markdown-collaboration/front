'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import "./globals.css";
export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // 시스템 테마가 변경될 때마다 호출되는 함수
    const handleDarkModeChange = (theme: string) => {
      setIsDarkMode(theme === 'dark');
    };

    // 다크 모드 변경 이벤트를 리스닝
    window.ipc.onDarkModeChanged(handleDarkModeChange);

    // 초기 테마 상태를 확인
    window.ipc.onDarkModeChanged(handleDarkModeChange);

    return () => {
      // 컴포넌트가 unmount될 때 이벤트 리스너 제거
      window.ipc.onDarkModeChanged(() => {});
    };
  }, []);
  const toggleDarkMode = async () => {
    try {
      // 다크 모드 전환
      const theme = await window.ipc.invoke('dark-mode:toggle');
      console.log(theme)
      setIsDarkMode(theme === 'dark');
    } catch (error) {
      console.error('Failed to toggle dark mode:', error);
    }
  };
  return (
    <main >
      <div className={isDarkMode ? 'dark': 'light'}>
        <p>
          ⚡ Electron + Next.js ⚡ -<Link href="/next">Go to next page</Link>
        </p>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width={256}
          height={256}
        />
      </div>
      <div>
        <button
          onClick={()=>{toggleDarkMode()}}
        >
          Test IPC
        </button>
        <p>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
      </div>
    </main>
  )
}
