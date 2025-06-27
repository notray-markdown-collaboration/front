"use client";
import useThemeStore from "@/_store/themeStore";
import styles from "./page.module.css";
import Image from "next/image";
import useAuthStore from "@/_store/useAuthStore";
import { useEffect } from "react";
import { SwitchWindow } from "@/_types/switch";
import { STORAGE_KEYS } from "@shared/constants/storageKeys";

export default function Start() {
  const { theme, toggleTheme } = useThemeStore();

  const {
    loadRefreshToken,
  } = useAuthStore();
  useEffect(() => {
    loadRefreshToken();
    // TODO
    // const off = window.ipc.on("oauth-token", (payload: any) => {
    //   const { accessToken, refreshToken } = payload;

    //   console.log("✅ 토큰 수신:", accessToken, refreshToken);
    //   setAccessToken(accessToken);
    //   setRefreshToken(refreshToken);
    //   const param: SwitchWindow = {
    //     width: 1280,
    //     height: 720,
    //     uri: "main",
    //     isFullScreen: true,
    //   };
    //   window.ipc.send("switch-window", param);
    // });

    return () => {
      // off(); // removeListener
    };
  }, []);
  
  const developLogin = () => {
    const param: SwitchWindow = {
      width: 1280,
      height: 720,
      uri: "main",
      isFullScreen: true,
    };
    
    window.electronAPI.setStore(STORAGE_KEYS.REFRESH_TOKEN, process.env.NEXT_PUBLIC_PERMANENT_TOKEN);
    window.electronAPI.switchWindow(param);
  }

  const onSubmitGoogleLogin = () => {
    developLogin();
    window.electronAPI.loadUrl(`${process.env.NEXT_PUBLIC_API_KEY}/api/auth/google`);
  };

  const onSubmitGithubLogin = () => {
    developLogin();
    window.electronAPI.loadUrl(`${process.env.NEXT_PUBLIC_API_KEY}/api/auth/github`);
  };

  return (
    <div
      className={`${styles.card} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.inner}>
        <img
          src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
          alt="로고"
          className={styles.logo}
        />
        <div className={styles.center}>
          <button className={styles.mainButton}>
            <div className={styles.plusIcon1} />
            <div className={styles.plusIcon2} />
          </button>
          <div className={styles.socialWrapper}>
            <button
              className={styles.githubButton}
              onClick={onSubmitGithubLogin}
            >
              <Image src={'/images/githubWhite.svg'} alt="github" width={30} height={30} />
            </button>
            <button
              className={styles.googleButton}
              onClick={onSubmitGoogleLogin}
            >
              <Image src={'/images/google.svg'} alt="google" width={30} height={30} />
            </button>
          </div>
        </div>
        <button className={styles.settingButton} onClick={toggleTheme}>
          <Image src={'/images/setting.svg'} alt="setting" width={30} height={30} />
        </button>
      </div>
    </div>
  );
}
