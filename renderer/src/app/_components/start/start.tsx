import useThemeStore from "app/_store/themeStore";
import styles from "./start.module.css";

export default function Start() {
  const { theme, setTheme } = useThemeStore();
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
            <button className={styles.githubButton}>
              <i className="fab fa-github text-2xl" />
            </button>
            <button className={styles.googleButton}>
              <i className="fab fa-google text-2xl" />
            </button>
          </div>
        </div>
        <button className={styles.settingButton}>
          <i className="fas fa-cog text-2xl" />
        </button>
      </div>
    </div>
  );
}
