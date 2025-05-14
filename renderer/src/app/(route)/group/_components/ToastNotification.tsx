import styles from "./ToastNotification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

interface ToastNotificationProps {
  darkMode: boolean;
  message: string;
  onClose: () => void;
}

export default function ToastNotification({
  darkMode,
  message,
  onClose,
}: ToastNotificationProps) {
  return (
    <div
      className={`${styles.toast} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.iconWrapper}>
        <div
          className={`${styles.iconCircle} ${
            darkMode ? styles.iconCircleDark : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faCheck}
            className={`${styles.iconCheck} ${
              darkMode ? styles.iconCheckDark : ""
            }`}
          />
        </div>
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>파일이 업데이트되었습니다</h4>
        <p
          className={`${styles.message} ${
            darkMode ? styles.textGrayDark : styles.textGrayLight
          }`}
        >
          {message}
        </p>
        <p className={styles.time}>방금 전</p>
      </div>
      <button onClick={onClose} className={styles.closeButton}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}
