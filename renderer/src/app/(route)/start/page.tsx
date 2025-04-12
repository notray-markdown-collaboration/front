"use client";
import useThemeStore from "app/_store/themeStore";
import styles from "./start.module.css";
import github from "../../../../public/images/githubWhite.svg";
import google from "../../../../public/images/google.svg";
import setting from "../../../../public/images/setting.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "app/_store/useAuthStore";
import { useEffect } from "react";
export default function Start() {
  const { theme, setTheme } = useThemeStore();
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
    const off = window.ipc.on("oauth-token", (payload: any) => {
      const { accessToken, refreshToken } = payload;

      console.log("✅ 토큰 수신:", accessToken, refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      window.ipc.send("switch-to-main");
    });

    return () => {
      off(); // removeListener
    };
  }, []);

  const handleToggle = async () => {
    const result = await window.ipc.invoke("dark-mode:toggle");
    setTheme(result === "dark" ? "dark" : "light");
  };

  const onSubmitGoogleLogin = () => {
    // window.ipc.invoke("setStore", {
    //   key: "refreshToken",
    //   value:
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiY2tzYWxzMTAxNEBnbWFpbC5jb20iLCJuYW1lIjoi7LSI7J207YyM7L2UIiwiaWF0IjoxNzQ0NDUyMDU3LCJleHAiOjE3NDU2NjE2NTd9.DLloSgS1Vpo3_gPr8x_rNxp7usNCMapUIISu2aqDJtY",
    // });
    // window.ipc.send("switch-to-main");
    window.ipc.send(
      "loadUrl",
      `${process.env.NEXT_PUBLIC_API_KEY}/api/auth/google`
    );
    // window.open(`${process.env.NEXT_PUBLIC_API_KEY}/auth/google`);
  };

  const onSubmitGithubLogin = () => {
    window.ipc.send(
      "loadUrl",
      `${process.env.NEXT_PUBLIC_API_KEY}/api/auth/github`
    );
    // window.open(`${process.env.NEXT_PUBLIC_API_KEY}/auth/github`);
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
              <Image src={github} alt="github" width={30} height={30} />
            </button>
            <button
              className={styles.googleButton}
              onClick={onSubmitGoogleLogin}
            >
              <Image src={google} alt="google" width={30} height={30} />
            </button>
          </div>
        </div>
        <button className={styles.settingButton} onClick={handleToggle}>
          <Image src={setting} alt="setting" width={30} height={30} />
        </button>
      </div>
    </div>
  );
}
